<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;
    protected $fillable = [
        'service_id','priority','number','called','letter','reference_no','phone','email','name','position','recall','is_recalled'
    ];

    protected $appends = ['formated_date','token_number'];

    public function service(){
        return $this->belongsTo(Service::class);
    }

    public function getFormatedDateAttribute($value){
        $date = Carbon::parse($this->created_at)->format('F-j-Y H:i A');
        return $date;
    }
    public function call(){
        return $this->hasOne(Call::class);
    }
    public function mrn()
    {
        return $this->belongsTo(MrnDetail::class,'name','mrn_no');
    }

    public function getTokenNumberAttribute(){
        return $this->letter.'-'.$this->number;
    }
}
