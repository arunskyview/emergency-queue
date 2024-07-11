<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;

class Language extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'id','code','name','display','token_translation','please_proceed_to_translation'
    ];
    public function settings()
    {
        return $this->hasMany(Setting::class);
    }


}
