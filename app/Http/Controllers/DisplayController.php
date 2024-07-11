<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DisplayController extends Controller
{
    public function showDisplayUrl()
    {
        // return view('display.index', ['date' => Carbon::now()->toDateString(), 'settings' => Setting::first(),'file'=>'storage/app/public/tokens_for_display.json']);
        $service=Service::get()->pluck('id');
        $i=0;
        $file1=$file2=$file3='';
        $service_1=$service_2=$service_3=0;
        $service_label_1=$service_label_2=$service_label_3='';
        foreach($service as $key=>$value)
        {
            $i++;
            ${'file'.$i} = 'storage/service_' . $value . '_display.json';
            ${'service_'.$i}=$value;
        }
        $j=0;
        $service_label=Service::get();
        foreach($service_label as $label_key=>$label_value)
        {
            $j++;
            ${'service_label_'.$j}=$label_value;
        }
        // return view('display.index', ['service'=>$service,'date' => Carbon::now()->toDateString(), 'settings' => Setting::first(),'file'=>'storage/tokens_for_display.json']);
        return view('display.index', ['service'=>$service,'date' => Carbon::now()->toDateString(), 'settings' => Setting::first(),'file'=>'storage/tokens_for_display.json','file1'=>$file1,'file2'=>$file2,'file3'=>$file3,'service_1'=>$service_1,'service_2'=>$service_2,'service_3'=>$service_3,'service_label_1'=>$service_label_1,'service_label_2'=>$service_label_2,'service_label_3'=>$service_label_3]);
    }
    public function showRecallDisplayUrl()
    {
        // return view('display.index', ['date' => Carbon::now()->toDateString(), 'settings' => Setting::first(),'file'=>'storage/app/public/tokens_for_display.json']);
        $service=Service::get()->pluck('id');
        $i=0;
        $file1=$file2=$file3='';
        $service_1=$service_2=$service_3=0;
        $service_label_1=$service_label_2=$service_label_3='';
        foreach($service as $key=>$value)
        {
            $i++;
            ${'file'.$i} = 'storage/recall_service_' . $value . '_display.json';
            ${'service_'.$i}=$value;
        }
        $j=0;
        $service_label=Service::get();
        foreach($service_label as $label_key=>$label_value)
        {
            $j++;
            ${'service_label_'.$j}=$label_value;
        }
        // return view('display.index', ['service'=>$service,'date' => Carbon::now()->toDateString(), 'settings' => Setting::first(),'file'=>'storage/tokens_for_display.json']);
        return view('display.recall-display', ['service'=>$service,'date' => Carbon::now()->toDateString(), 'settings' => Setting::first(),'file'=>'storage/tokens_for_display.json','file1'=>$file1,'file2'=>$file2,'file3'=>$file3,'service_1'=>$service_1,'service_2'=>$service_2,'service_3'=>$service_3,'service_label_1'=>$service_label_1,'service_label_2'=>$service_label_2,'service_label_3'=>$service_label_3]);
    }
}
