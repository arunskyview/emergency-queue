<?php

namespace App\Http\Controllers;

use App\Jobs\SendSmsJob;
use App\Models\Call;
use App\Models\AllotCounter;
use App\Models\Counter;
use App\Models\Queue;
use App\Models\Service;
use App\Models\Session as ModelsSession;
use App\Models\Setting;
use App\Repositories\CallRepository;
use App\Repositories\CounterRepository;
use App\Repositories\ServiceRepository;
use App\Repositories\TokenRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CallController extends Controller
{
    protected $counterRepository, $serviceRepository, $tokenRepository, $callRepository;

    public function __construct(CounterRepository $counterRepository, ServiceRepository $serviceRepository, TokenRepository $tokenRepository, CallRepository $callRepository)
    {
        $this->counterRepository = $counterRepository;
        $this->serviceRepository = $serviceRepository;
        $this->tokenRepository = $tokenRepository;
        $this->callRepository = $callRepository;
    }

    public function showCallPage(Request $request)
    {
        $user_id=Auth::user()->id;
        $alloted=AllotCounter::where('user_id',$user_id)->first();
        if($user_id !=1)
        {
            if($alloted)
            {
                $show_counter=$this->counterRepository->getEachActiveCounters($alloted->counter_id);
                $show_service=$this->serviceRepository->getEachActiveServices($alloted->service_id);
            }else{
                $show_counter=$this->counterRepository->getAllActiveCounters();
                $show_service=$this->serviceRepository->getAllActiveServices();
            }
        }
        else{
            $show_counter=$this->counterRepository->getAllActiveCounters();
            $show_service=$this->serviceRepository->getAllActiveServices();
        }

        return view('call.call', ['counters' => $show_counter, 'services' => $show_service, 'date' => Carbon::now()->toDateString(), 'show_menu' => true, 'settings' => Setting::first()]);
        // return view('call.call', ['alloted'=>$alloted,'counters' => $this->counterRepository->getAllActiveCounters(), 'services' => $this->serviceRepository->getAllActiveServices(), 'date' => Carbon::now()->toDateString(), 'show_menu' => true, 'settings' => Setting::first()]);
    }

    public function getAllServicesAndCounters()
    {
        $counters = $this->counterRepository->getAllActiveCounters();
        $services = $this->serviceRepository->getAllActiveServices();
        return response()->json(['services' => $services, 'counters' => $counters]);
    }

    public function setServiceAndCounter(Request $request)
    {
        // $request->validate([
        //     'service_id' => 'required|exists:services,id',
        //     'counter_id' => 'required|exists:counters,id',
        // ]);
        DB::beginTransaction();
        try {
            // if (!(ModelsSession::active()->where('id', '!=', session()->getId())->where('service_id', $request->service_id)->where('counter_id', $request->counter_id)->get()->isEmpty())) {
            //     return response()->json(['already_exists' => true]);
            // }
            //$service = Service::find($request->service_id);
            $counter = Counter::find($request->counter_id);
            //$session = ModelsSession::find(session()->getId());
            //$session->service_id = $service->id;
            // $session->service_id = $request->all_selected_service;

            //$session->counter_id = $counter->id;
            // $session->save();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json($e);
        }
        DB::commit();
        $service_name = Service::whereIn('id',$request->all_selected_service)->get();
        $service_data=[];
        foreach($service_name as $key=>$value)
        {
            $service_data[$value->id]=$value->name;
        }
        // dd($service_data);
        if(count($request->all_selected_service)>0){
            $selected_service=$request->all_selected_service;
        }else{
            $selected_service=[];
        }
        // session(['selected_service'=>$selected_service, 'service' => $service, 'counter' => $counter]);
        session(['selected_service'=>json_encode($selected_service),'service' => $selected_service,'service_data'=>json_encode($service_data), 'counter' => $counter]);
        $tokens_for_call = [];
        $called_tokens = [];
        // $tokens_for_call = $this->tokenRepository->getTokensForCall($service);
        $tokens_for_call = $this->tokenRepository->getTokensForCall($selected_service);
        // $called_tokens = $this->tokenRepository->getCalledTokens($service, $counter);
        $called_tokens = $this->tokenRepository->getCalledTokens($selected_service, $counter);
        // return  response()->json(['service' => $service, 'counter' => $counter, 'tokens_for_call' => $tokens_for_call, 'called_tokens' => $called_tokens]);
        return  response()->json(['service' => $selected_service,'service_data'=>json_encode($service_data),'counter' => $counter, 'tokens_for_call' => $tokens_for_call, 'called_tokens' => $called_tokens]);
    }

    public function getTokensForCall()
    {

        $service = session()->get('service');
        $counter = session()->get('counter');
        $tokens_for_call = [];
        $called_tokens = [];
        if ($service && $counter) {
            $tokens_for_call = $this->tokenRepository->getTokensForCall($service);
            $called_tokens = $this->tokenRepository->getCalledTokens($service, $counter);
        }
        return  response()->json(['service' => $service, 'counter' => $counter, 'tokens_for_call' => $tokens_for_call, 'called_tokens' => $called_tokens]);
    }

    public function callNext(Request $request)
    {
        $request->validate([
            //'service_id' => 'required|exists:services,id',
            'counter_id' => 'required_if:by_id,==,false|exists:counters,id',
            'by_id' => 'required',
            'queue_id' => 'required_if:by_id,==,true|exists:queues,id',
        ]);
        DB::beginTransaction();
        try {
            // if ($request->by_id) $called = $this->callRepository->callnextTokenById($request->queue_id, $request->service_id);
            if ($request->by_id) $called = $this->callRepository->callnextTokenById($request->queue_id);
            else $called = $this->callRepository->callNext($request->service_id, $request->counter_id);

            if (!$called) return response()->json(['no_token_found' => true]);
            $settings = Setting::first();
            if ($called->queue->service->sms_enabled && $called->queue->service->call_message_enabled && $called->queue->phone && $settings->sms_url) {
                SendSmsJob::dispatch($called->queue, $called->queue->service->call_message_format, $settings, 'call_next');
            }
            if ($called->queue->service->sms_enabled && $called->queue->service->status_message_enabled && $called->queue->phone && $settings->sms_url) {
                foreach ($called->queue->service->status_message_positions as $position) {
                    $this->callRepository->sendStatusMessage($called->queue, $position, $settings);
                }
            }

            $this->callRepository->setCallsForDisplay($called->service);
            $this->tokenRepository->setTokensOnFile();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['status_code' => 500]);
        }

        DB::commit();
        return response()->json($called);
    }
/** call next by id */
    // public function callNextById(Request $request)
    // {
    //     $request->validate([
    //         'service_id' => 'required|exists:services,id',
    //         'queue_id' => 'required|exists:queues,id',
    //     ]);
    //     DB::beginTransaction();
    //     try {
    //         // $token = $this->tokenRepository->getTokenForCallNext($request->service_id,$request->counter_id);
    //         // $queue = Queue::find($request->queue_id);
    //         $called = $this->callRepository->callnextTokenById($request->queue_id, $request->service_id);
    //         if (!$called) return response()->json(['no_token_found' => true]);
    //         $settings = Setting::first();
    //         if ($called->queue->service->sms_enabled && $called->queue->service->call_message_enabled && $called->queue->phone && $settings->sms_url) {
    //             SendSmsJob::dispatch($called->queue, $called->queue->service->call_message_format, $settings, 'call_next');
    //         }
    //         if ($called->queue->service->sms_enabled && $called->queue->service->status_message_enabled && $called->queue->phone && $settings->sms_url) {
    //             foreach ($called->queue->service->status_message_positions as $position) {
    //                 $this->callRepository->sendStatusMessage($called->queue, $position, $settings);
    //             }
    //         }
    //         $this->callRepository->setCallsForDisplay($called->service);
    //         $this->tokenRepository->setTokensOnFile();
    //     } catch (\Exception $e) {
    //         DB::rollback();
    //         return response()->json(['status_code' => 500]);
    //     }
    //     // session()->push('called', $called);
    //     DB::commit();
    //     return response()->json($called);
    // }

    /** end call next */

    public function serveToken(Request $request)
    {
        $request->validate([
            'call_id' => 'required|exists:calls,id',
        ]);
        DB::beginTransaction();
        try {
            $call = Call::where('id', $request->call_id)->whereNull('call_status_id')->first();
            if ($call) {
                $call = $this->callRepository->serveToken($call);
                $settings = Setting::first();
                if ($call->queue->service->sms_enabled && $call->queue->service->completed_message_enabled && $call->queue->phone && $settings->sms_url) {
                    SendSmsJob::dispatch($call->queue, $call->queue->service->call_message_format, $settings, 'served');
                }
                $this->callRepository->setCallsForDisplay($call->service);
                $this->tokenRepository->setTokensOnFile();
            } else {
                return response()->json(['already_executed' => true]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status_code' => 500]);
        }
        DB::commit();
        return response()->json($call);
    }

    public function noShowToken(Request $request)
    {
        $request->validate([
            'call_id' => 'required|exists:calls,id',
        ]);
        DB::beginTransaction();
        try {
            $call = Call::where('id', $request->call_id)->whereNull('call_status_id')->first();
            if ($call) {
                $call = $this->callRepository->noShowToken($call);
                $settings = Setting::first();
                if ($call->queue->service->sms_enabled && $call->queue->service->noshow_message_enabled && $call->queue->phone && $settings->sms_url) {
                    SendSmsJob::dispatch($call->queue, $call->queue->service->call_message_format, $settings, 'noshow');
                }
                $this->callRepository->setCallsForDisplay($call->service);
                $this->tokenRepository->setTokensOnFile();
            } else {
                return response()->json(['already_executed' => true]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status_code' => 500]);
        }
        db::commit();
        return response()->json($call);
    }

    public function recallToken(Request $request)
    {
        $request->validate([
            'call_id' => 'required|exists:calls,id',
        ]);
        DB::beginTransaction();
        try {
            $call = Call::find($request->call_id);
            $call = $this->callRepository->recallToken($call);
            $this->callRepository->setCallsForDisplay($call->service);
            $this->tokenRepository->setTokensOnFile();
        } catch (\Exception $e) {
            DB::rollBack();
            // return response()->json(['status_code' => 500]);
            return response()->json(['status_code' => $e->getMessage()]);
        }

        DB::commit();

        session()->push('called', $call);
        return response()->json($call);
    }

    public function getNowDate()
    {
        return response()->json(Carbon::now()->toDateString());
    }

    public function getTokensForDisplay()
    {
        return response()->json($this->callRepository->getCallsForDisplay());
    }
    public function changeCategory(Request $request)
    {
        $request->validate([
            'token_id' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $call = Call::find($request->token_id);
            $call = $this->callRepository->setCategory($call,$request);
            $this->callRepository->setRecallTime($call);
            $this->callRepository->setCallsForDisplay($call->service);
            $this->tokenRepository->setTokensOnFile();
        } catch (\Exception $e) {
            DB::rollBack();
            // return response()->json(['status_code' => 500]);
            return response()->json(['status_code' => $e->getMessage()]);
        }
        DB::commit();

        session()->push('category', $call);
        return response()->json($call);
    }
    public function serverTime(Request $request)
    {
        // dd($request);
        $data=[];
        $current_date=date('Y-m-d H:i:s');
        $ended_at=$request->ended_at;
        $datetime1 = date_create($current_date);
        $datetime2 = date_create($ended_at);
        $interval = date_diff($datetime1, $datetime2);
        $time_diff=$interval->format('%h hours %i minutes %s seconds');

        $hour=$interval->format('%h');
        $minutes=$interval->format('%i');
        $second=$interval->format('%S');
        $total_mins=$hour*60 + $minutes;

        $with_second=$total_mins.':'.$second;
        $data['id']=$request->id;
        $data['without_second']=$total_mins;
        $data['with_second']=$with_second;
        // return $total_mins;

        $remaining_time=$request->category_time - $total_mins;
        $update_recalling=Queue::where('id',$request->id)->first();
        $update_recalling->recalling_time=$remaining_time;
        $update_recalling->save();

        return $data;
        // return $total_mins.':'.$second;
        //echo $total_mins.':'.$second;
    }
    public function tokenTime(Request $request)
    {
        // dd($request);
        $data=[];
        $current_date=date('Y-m-d H:i:s');
        $ended_at=$request->created_at;
        $datetime1 = date_create($current_date);
        $datetime2 = date_create($ended_at);
        $interval = date_diff($datetime1, $datetime2);
        $time_diff=$interval->format('%h hours %i minutes %s seconds');

        $hour=$interval->format('%h');
        $minutes=$interval->format('%i');
        $second=$interval->format('%S');
        $total_mins=$hour*60 + $minutes;

        $with_second=$total_mins.':'.$second;
        $data['id']=$request->id;
        $data['without_second']=$total_mins;
        $data['with_second']=$with_second;
        // return $total_mins;

        return $data;
    }
    public function categoryStatus(Request $request)
    {
        $calledToken=Call::where('id',$request->token_id)->first();
        return $calledToken;
    }
}
