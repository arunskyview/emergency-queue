<?php

namespace App\Repositories;

use App\Consts\CallStatuses;
use App\Jobs\SendSmsJob;
use App\Models\Call;
use App\Models\CallsHistory;
use App\Models\Queue;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CallRepository
{

    public function callNext($service_id, $counter_id)
    {
        $already_called =  Call::where('created_at', '>=', Carbon::now()->startOfDay())
            ->where('created_at', '<=', Carbon::now())
            ->where('service_id', $service_id)
            ->where('counter_id', $counter_id)
            ->whereNull('call_status_id')
            ->first();

        if ($already_called) {
            return $already_called;
        } else {
            $queue = Queue::where('created_at', '>=', Carbon::now()->startOfDay())
                ->where('created_at', '<=', Carbon::now())
                ->where('called', false)
                ->orderBy('priority','ASC')
                ->orderBy('id','ASC')
                ->where('service_id', $service_id)
                ->first();

            if ($queue) {
                $called_position = $queue->position;
                $call = Call::create([
                    'queue_id' => $queue->id,
                    'service_id' => $queue->service_id,
                    'counter_id' => session()->get('counter')->id,
                    'user_id' => Auth::user()->id,
                    'token_letter' => $queue->letter,
                    'token_number' => $queue->number,
                    'called_date' => Carbon::now()->toDateString(),
                    'started_at' => Carbon::now(),
                    'waiting_time' => $queue->created_at->diff(Carbon::now())->format('%H:%I:%S'),
                    'no_of_call' => 1
                ]);
                /** Maintain history */
                $calls_history = CallsHistory::create([
                    'queue_id' => $queue->id,
                    'service_id' => $queue->service_id,
                    'counter_id' => session()->get('counter')->id,
                    'user_id' => Auth::user()->id,
                    'token_letter' => $queue->letter,
                    'token_number' => $queue->number,
                    'date_time' => Carbon::now(),
                    'called_date' => Carbon::now()->toDateString(),
                    'started_at' => Carbon::now(),
                    'waiting_time' => $queue->created_at->diff(Carbon::now())->format('%H:%I:%S')
                ]);
                /** end history */
                $queue->position = 0;
                $queue->called = true;
                $queue->save();

                $this->decrementPostion($queue->service_id, $called_position);

                return $call;
            } else return null;
        }
    }

    // public function callnextTokenById($id, $service_id)
    public function callnextTokenById($id)
    {
        $queue = Queue::where('created_at', '>=', Carbon::now()->startOfDay())
            ->where('created_at', '<=', Carbon::now())
            ->where('called', false)
            ->orderBy('priority','ASC')
            ->orderBy('id','ASC')
            ->where('id', $id)
           // ->where('service_id', $service_id)
            ->first();
        if ($queue) {
            $called_position = $queue->position;
            $call = Call::create([
                'queue_id' => $queue->id,
                'service_id' => $queue->service_id,
                'counter_id' => session()->get('counter')->id,
                'user_id' => Auth::user()->id,
                'token_letter' => $queue->letter,
                'token_number' => $queue->number,
                'called_date' => Carbon::now()->toDateString(),
                'started_at' => Carbon::now(),
                'waiting_time' => $queue->created_at->diff(Carbon::now())->format('%H:%I:%S'),
                'no_of_call' => 1
            ]);
            /** Maintain history */
            $calls_history = CallsHistory::create([
                'queue_id' => $queue->id,
                'service_id' => $queue->service_id,
                'counter_id' => session()->get('counter')->id,
                'user_id' => Auth::user()->id,
                'token_letter' => $queue->letter,
                'token_number' => $queue->number,
                'date_time' => Carbon::now(),
                'called_date' => Carbon::now()->toDateString(),
                'started_at' => Carbon::now(),
                'waiting_time' => $queue->created_at->diff(Carbon::now())->format('%H:%I:%S')
            ]);
            /** end history */
            $queue->called = true;
            $queue->position = 0;
            $queue->save();

            $this->decrementPostion($queue->service_id, $called_position);

            return $call;
        } else return null;
    }

    public function serveToken(Call $call)
    {
        $call->ended_at = Carbon::now();
        $call->served_time = Carbon::parse($call->started_at)->diff(Carbon::now())->format('%H:%I:%S');
        $call->turn_around_time = Carbon::parse($call->waiting_time)->add(Carbon::parse($call->started_at)->diff(Carbon::now()))->toTimeString();
        $call->call_status_id = CallStatuses::SERVED;
        $call->save();

        /** Maintain history */
        $calls_history = CallsHistory::create([
            'queue_id' => $call->queue_id,
            'service_id' => $call->service_id,
            'counter_id' => session()->get('counter')->id,
            'user_id' => Auth::user()->id,
            'token_letter' => $call->letter,
            'token_number' => $call->number,
            'date_time' => Carbon::now(),
            'called_date' => Carbon::now()->toDateString(),
            'started_at' => Carbon::now(),
            'waiting_time' => $call->created_at->diff(Carbon::now())->format('%H:%I:%S')
        ]);
        /** end history */
        return $call;
    }

    public function noShowToken(Call $call)
    {
        $call->ended_at = Carbon::now()->format('Y-m-d H:i:s');
        $call->call_status_id = CallStatuses::NOSHOW;
        $call->save();
        return $call;
    }

    public function recallToken(Call $call)
    {
        $copy = $call->replicate();
        $call->delete();
        $new_call = Call::create([
            'queue_id' => $copy->queue_id,
            'service_id' => $copy->service_id,
            'counter_id' => $copy->counter_id,
            'user_id' => $copy->user_id,
            'token_letter' => $copy->token_letter,
            'token_number' => $copy->token_number,
            'called_date' => $copy->called_date,
            'started_at' => $copy->started_at,
            'waiting_time' => $copy->waiting_time,
            'category' => $copy->category,
            'status' => $copy->status,
            'is_recall' => $copy->is_recall,
            'no_of_call' => ($copy->no_of_call)+1
        ]);
        /** Maintain history */
        $calls_history = CallsHistory::create([
            'queue_id' => $copy->queue_id,
            'service_id' => $copy->service_id,
            'counter_id' => $copy->counter_id,
            'user_id' => $copy->user_id,
            'token_letter' => $copy->token_letter,
            'token_number' => $copy->token_number,
            'date_time' => Carbon::now(),
            'called_date' => $copy->called_date,
            'started_at' => $copy->started_at,
            'waiting_time' => $copy->waiting_time,
            'category' => $copy->category,
            'status' => $copy->status,
            'is_recall' => $copy->is_recall,
        ]);
        /** end history */

        if($copy->is_recall==true)
        {
            $update_queue=Queue::where('id',$copy->queue_id)->first();
            $update_queue->is_recalled=true;
            $update_queue->save();
        }
        return $new_call;
    }

    public function setCallsForDisplay($service)
    {
        // $data = json_encode(Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())->orderByDesc('id')->with('counter')->limit(5)->get()->toArray());
        // Storage::put('public/tokens_for_display.json', $data);
        $data = json_encode(Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())->orderByDesc('id')->with('counter')->get()->toArray());
        Storage::put('public/tokens_for_display.json', $data);

        // $service_data = json_encode(Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())->where('service_id', $service->id)->where(function($query) {
        //     $query->where('re_call_status_id', '>=', 2)
        //           ->orWhereNull('re_call_status_id');
        // })->orderByDesc('id')->with('counter','service')->limit(5)->get()->toArray());
        $service_data = json_encode(Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())->where('service_id', $service->id)->orderByDesc('id')->with('counter','service')->limit(5)->get()->toArray());
        $recall_service_data = json_encode(Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())->where('service_id', $service->id)->where('is_recall',true)->orderByDesc('id')->with('counter','service')->limit(5)->get()->toArray());
        Storage::put('public/service_' . $service->id . '_display.json', $service_data);
        Storage::put('public/recall_service_' . $service->id . '_display.json', $recall_service_data);
    }

    public function getCallsForDisplay()
    {
        return Call::where('created_at', '>=', Carbon::now()->startOfDay())->where('created_at', '<=', Carbon::now())->orderByDesc('id')->with('counter')->limit(5)->get()->toArray();
    }

    public function getTokenForCallNext($service_id, $counter_id)
    {
        $already_called = Call::where('created_at', '>=', Carbon::now()->startOfDay())
            ->where('created_at', '<=', Carbon::now())
            ->where('service_id', $service_id)
            ->where('service_id', $$counter_id)
            ->whereNull('call_status_id')
            ->first();
        if ($already_called) {
            return $already_called;
        } else {
            $token = Queue::where('created_at', '>=', Carbon::now()->startOfDay())
                ->where('created_at', '<=', Carbon::now())
                ->where('called', false)
                ->where('service_id', $service_id)
                ->where('service_id', $$counter_id)
                ->first();

            return $token;
        }
    }

    public function decrementPostion($service_id, $called_position)
    {
        Queue::where('created_at', '>=', Carbon::now()->startOfDay())
            ->where('created_at', '<=', Carbon::now())
            ->where('position', '>', $called_position)
            ->where('service_id', $service_id)
            ->decrement('position');
    }

    public function sendStatusMessage($queue, $position, $settings)
    {
        $queue = Queue::where('created_at', '>=', Carbon::now()->startOfDay())
            ->where('created_at', '<=', Carbon::now())
            ->where('service_id', $queue->service_id)
            ->where('position', $position)
            ->first();
        if ($queue) SendSmsJob::dispatch($queue, $queue->service->status_message_format, $settings, 'status_message');
    }
    public function setCategory(Call $call,$request)
    {
        // if($request->status=='SEND & CHECK AFTER 30 MINS')
        // {
        //     //$call->delete();
        //     $queue=Queue::find($call->queue_id);
        //     $queue->called=0;
        //     $queue->save();
        //     return $call;
        // }
        // else{
        // }
            $new_call = Call::find($call->id);

            /** Maintain history */
            $calls_history = new CallsHistory;

            if($request->status=='SEND TO DOCTOR')
            {
                $status_id=1;
                $new_call->ended_at = Carbon::now();
                $new_call->served_time = Carbon::parse($call->started_at)->diff(Carbon::now())->format('%H:%I:%S');
                $new_call->turn_around_time = Carbon::parse($call->waiting_time)->add(Carbon::parse($call->started_at)->diff(Carbon::now()))->toTimeString();
                $new_call->call_status_id = CallStatuses::SERVED;
                $new_call->re_call_status_id = CallStatuses::SERVED;

                /** Maintain history */
                $calls_history->ended_at = Carbon::now();
                $calls_history->served_time = Carbon::parse($call->started_at)->diff(Carbon::now())->format('%H:%I:%S');
                $calls_history->turn_around_time = Carbon::parse($call->waiting_time)->add(Carbon::parse($call->started_at)->diff(Carbon::now()))->toTimeString();
                $calls_history->call_status_id = CallStatuses::SERVED;
                $calls_history->re_call_status_id = CallStatuses::SERVED;
            }
            if($request->status=='RECALL'){
                $new_call->ended_at = Carbon::now()->format('Y-m-d H:i:s');

                 /** Maintain history */
                 $calls_history->ended_at = Carbon::now()->format('Y-m-d H:i:s');

                // if(($new_call->is_recall==1) &&  ($request->status=='RECALL'))
                // {
                //     $new_call->re_call_status_id = CallStatuses::SERVED;
                //     //$new_call->call_status_id = CallStatuses::NOSHOW;
                // }
                // // else{
                // //     $new_call->call_status_id = CallStatuses::NOSHOW;
                // //     $new_call->re_call_status_id = CallStatuses::SERVED;
                // // }

                if(($new_call->is_recall==1) &&  ($request->status=='RECALL'))
                {
                    $new_call->re_call_status_id = CallStatuses::NOSHOW;
                    $new_call->call_status_id = CallStatuses::NOSHOW;
                    $new_call->is_recall=1;

                    /** Maintain history */
                    $calls_history->re_call_status_id = CallStatuses::NOSHOW;
                    $calls_history->call_status_id = CallStatuses::NOSHOW;
                    $calls_history->is_recall=1;

                    $update_queue=Queue::where('id',$call->queue_id)->first();
                    $update_queue->is_recalled=false;
                    $update_queue->save();
                }
                else{
                    $new_call->re_call_status_id = CallStatuses::NOSHOW;
                    $new_call->call_status_id = CallStatuses::NOSHOW;
                    $new_call->is_recall=1;

                    /** Maintain history */
                    $calls_history->re_call_status_id = CallStatuses::NOSHOW;
                    $calls_history->call_status_id = CallStatuses::NOSHOW;
                    $calls_history->is_recall=1;
                }

                // $new_call->re_call_status_id = CallStatuses::NOSHOW;
                // $new_call->call_status_id = CallStatuses::NOSHOW;

                $queue=Queue::find($call->queue_id);
                $queue->recall=true;
                $queue->save();
            }

            if(($request->status=='SEND TO DOCTOR') && ($new_call->is_recall==1))
            {
                $status_id=1;
                $new_call->ended_at = Carbon::now();
                $new_call->served_time = Carbon::parse($call->started_at)->diff(Carbon::now())->format('%H:%I:%S');
                $new_call->turn_around_time = Carbon::parse($call->waiting_time)->add(Carbon::parse($call->started_at)->diff(Carbon::now()))->toTimeString();
                $new_call->call_status_id = CallStatuses::SERVED;
                $new_call->re_call_status_id = CallStatuses::SERVED;

                /** Maintain history */
                $calls_history->ended_at = Carbon::now();
                $calls_history->served_time = Carbon::parse($call->started_at)->diff(Carbon::now())->format('%H:%I:%S');
                $calls_history->turn_around_time = Carbon::parse($call->waiting_time)->add(Carbon::parse($call->started_at)->diff(Carbon::now()))->toTimeString();
                $calls_history->call_status_id = CallStatuses::SERVED;
                $calls_history->re_call_status_id = CallStatuses::SERVED;

                $queue=Queue::find($call->queue_id);
                $queue->is_recalled=true;
                $queue->save();
            }
            $new_call->category=$request->category;
            $new_call->status=$request->status;
            $new_call->category_time=$request->category_time;
            $new_call->save();

            /** Maintain history */
            $calls_history->queue_id=$new_call->queue_id;
            $calls_history->service_id=$new_call->service_id;
            $calls_history->counter_id=$new_call->counter_id;
            $calls_history->user_id=$new_call->user_id;
            $calls_history->category=$request->category;
            $calls_history->status=$request->status;
            $calls_history->category_time=$request->category_time;
            $calls_history->date_time = Carbon::now();
            $calls_history->save();

            return $new_call;
    }

    public function setRecallTime($call)
    {
        $data=[];
        $current_date=date('Y-m-d H:i:s');
        $ended_at=$call->ended_at;
        $datetime1 = date_create($current_date);
        $datetime2 = date_create($ended_at);
        $interval = date_diff($datetime1, $datetime2);
        $time_diff=$interval->format('%h hours %i minutes %s seconds');

        $hour=$interval->format('%h');
        $minutes=$interval->format('%i');
        $second=$interval->format('%S');
        $total_mins=$hour*60 + $minutes;

        $remaining_time=$call->category_time - $total_mins;
        $update_recalling=Queue::where('id',$call->queue_id)->first();
        $update_recalling->recalling_time=$remaining_time;
        $update_recalling->save();
    }
}
