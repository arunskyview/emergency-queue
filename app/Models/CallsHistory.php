<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallsHistory extends Model
{
    use HasFactory;
    protected $fillable = ['queue_id','service_id','counter_id','user_id','call_status_id','token_number','called_date','date_time',
    'waiting_time','served_time','turn_around_time','token_letter','category','status','started_at','ended_at','category_time','is_recall',
    're_call_status_id'];
}
