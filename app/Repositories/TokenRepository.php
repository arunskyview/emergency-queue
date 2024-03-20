<?php

namespace App\Repositories;

use App\Models\Call;
use App\Models\Queue;
use App\Models\Service;
use App\Models\MrnDetail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class TokenRepository
{
    public function createToken(Service $service, $data, $is_details)
    {
        $last_token = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<', Carbon::now()->endOfDay())->where('service_id', $service->id)->orderBy('created_at', 'desc')->first();
        $check_token = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<', Carbon::now()->endOfDay())->where('service_id', $service->id)->orderBy('created_at', 'desc')->pluck('id')->count();
        $queue=[];
        $queue['status']=true;
        if($service->number_of_token >0)
        {
            if($check_token==$service->number_of_token)
            {
                $queue['status']=false;
                $queue['data']=$last_token;
                return $queue;
            }
        }
        if ($last_token) $token_number = $last_token->number + 1;
        else $token_number = $service->start_number;
        $servicePriority=Service::where('id',$service->id)->first();
        $queue['data'] = Queue::create([
            'service_id' => $service->id,
            'priority' => $servicePriority->priority,
            'number' => $token_number,
            'called' => false,
            'reference_no' => Str::random(9),
            'letter' => $service->letter,
            'name' => ($is_details && $service->ask_name == 1) ? $data['name'] : null,
            'email' => ($is_details && $service->ask_email == 1) ? $data['email'] : null,
            'phone' => ($is_details && $service->ask_phone == 1) ? $data['phone'] : null,
            'position' => $this->customerWaiting($service) + 1,
            'recall' => false,
            'is_recalled' =>false,
        ]);
        return $queue;
    }

    public function customerWaiting(Service $service)
    {
        $count = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
            ->where('called', false)->where('service_id', $service->id)->count();
        return $count;
    }

    public function getTokensForCall($service)
    {
        // $tokens = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
        //     ->where('called', false)->where('service_id', $service->id)->get()->toArray();

        //get selected service token
        $tokens = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
            ->where('called', false)->whereIn('service_id', $service)->orderBy('id','DESC')->get()->toArray();
            
        // $tokens = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
        //     ->where('called', false)->orderBy('priority','ASC')->orderBy('id','ASC')->get()->toArray();
        return $tokens;
    }

    public function getCalledTokens($service, $counter)
    {
        // $tokens =  Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
        //     ->where('service_id', $service->id)->where('counter_id', $counter->id)->orderByDesc('created_at')->get()->toArray();
        $tokens =  Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
            ->whereIn('service_id', $service)->where('counter_id', $counter->id)->orderByDesc('created_at')->get()->toArray();
        return $tokens;
    }

    public function setTokensOnFile()
    {
        // $tokens_for_call = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
        //     ->where('called', false)->orderBy('priority','ASC')->orderBy('id','ASC')->get()->toArray();
        $tokens_for_call = Queue::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
            ->where('called', false)->get()->toArray();
        $called_tokens =  Call::with('service')->where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
            ->orderByDesc('created_at')->get()->toArray();

        $tokens_for_recall = Queue::with('call')->where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
            ->where('recall', true)->where('is_recalled',false)->orderBy('recalling_time','ASC')->get()->toArray();
        // $tokens_for_recall = Queue::with('call')->where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())
        //     ->where('recall', true)->orderBy('recalling_time','ASC')->get()->toArray();
        $data['tokens_for_call'] = $tokens_for_call;
        $data['called_tokens'] = $called_tokens;
        $data['recall_tokens'] = $tokens_for_recall;
        Storage::put('public/tokens_for_callpage.json', json_encode($data));
    }
    public function saveMrnDetail($data)
    {
        $check_mrn=MrnDetail::where('mrn_no',$data['mrn_no'])->first();
        if(!$check_mrn)
        {
            $addMrnDetail=new MrnDetail;
            $addMrnDetail->mrn_no=$data['mrn_no'];
            $addMrnDetail->first_name_en=$data['first_name_en'];
            $addMrnDetail->middle_name_en=$data['middle_name_en'];
            $addMrnDetail->last_name_en=$data['last_name_en'];
            $addMrnDetail->first_name_ar=$data['first_name_ar'];
            $addMrnDetail->middle_name_ar=$data['middle_name_ar'];
            $addMrnDetail->last_name_ar=$data['last_name_ar'];
            $addMrnDetail->gender=$data['gender'];
            $addMrnDetail->national_id=$data['national_id'];
            $addMrnDetail->dob=$data['dob'];
            $addMrnDetail->mobile_no=$data['mobile_no'];
            $addMrnDetail->save();
            return $addMrnDetail;
        }

    }
}
