<?php

namespace App\Http\Controllers;

use App\Jobs\SendSmsJob;
use App\Models\Call;
use App\Models\Queue;
use App\Models\Service;
use App\Models\Setting;
use App\Repositories\ServiceRepository;
use App\Repositories\TokenRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Models\AllotCounter;
use App\Models\MrnCheck;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TokenController extends Controller
{
    public $services, $tokenRepository;

    public function __construct(ServiceRepository $services, TokenRepository $tokenRepository)
    {
        $this->services = $services;
        $this->tokenRepository = $tokenRepository;
    }

    public function issueToken()
    {
        $user_id=Auth::user()->id;
        $alloted=AllotCounter::where('user_id',$user_id)->first();
        if($user_id !=1)
        {
            $show_service=$this->services->getEachActiveServices($alloted->service_id);
        }
        else{
            $show_service=$this->services->getAllActiveServices();
        }
        return view(
            'issue_token.index',
            ['services' => $show_service, 'settings' => Setting::first()]
        );
    }

    public function createToken(Request $request, Service $service)
    {
        DB::beginTransaction();
        try {
            $service = Service::findOrFail($request->service_id);
            $request->validate([
                'service_id' => 'required|exists:services,id',
                'with_details' => 'required',
                'name' => Rule::requiredIf(function () use ($request, $service) {
                    return $request->with_details && ($service->name_required == 1);
                }),
                'email' => [Rule::requiredIf(function () use ($request, $service) {
                    return $request->with_details && ($service->email_required == 1);
                })],
                'phone' => [Rule::requiredIf(function () use ($request, $service) {
                    return $request->with_details && ($service->email_required == 1);
                })],
            ]);
            $queue = $this->tokenRepository->createToken($service, $request->all(), $request->with_details ? true : false);
            $this->tokenRepository->saveMrnDetail($request->all());
            if($queue['status']==false)
            {
                $queue_page = $queue['data']->load('service');
                return response()->json(['status_code' => 401,'queue' => $queue_page->id, 'errors' => 'No token available!']);
            }
            $customer_waiting = $this->tokenRepository->customerWaiting($service);
            $customer_waiting = $customer_waiting > 0 ?  $customer_waiting - 1 : $customer_waiting;
            $settings = Setting::first();
            if ($service->sms_enabled && $service->optin_message_enabled && $queue->phone && $settings->sms_url) {
                SendSmsJob::dispatch($queue, $service->optin_message_format, $settings, 'issue_token');
            }
            $this->tokenRepository->setTokensOnFile();
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $errors = $e->errors();
                $message = $e->getMessage();
                return response()->json(['status_code' => 422, 'errors' => $message]);
            }
            DB::rollback();
            return response()->json(['status_code' => $e->getMessage()]);
        }
        DB::commit();

        $file_no=$queue['data']->name;
        $qr_path="";
        if(!empty($file_no))
        {
            $qr_code=QrCode::size(150)->generate($file_no);
            $qr_path="$qr_code";
        }
        $queue = $queue['data']->load('service');
        return response()->json(['status_code' => 200, 'queue' => $queue, 'customer_waiting' => $customer_waiting, 'settings' => $settings,'qr_code'=>$qr_path]);
    }
    public function checkMrn(Request $request)
    {
        $getAllMrn=$this->verifyMrn($request->mrn_no);
        $getMrn=$getAllMrn[0];
        //dd($getMrn[0]);
        //$mrn_check=MrnCheck::where('mrn_no',$request->mrn_no)->first();
        if($getMrn)
        {
            $getMrn['patient_name']=$getMrn['firstNameEn'].' '.$getMrn['middleNameEn'].' '.$getMrn['lastNameEn'];
            $current_date=date('Y-m-d');
            $ended_at=$getMrn['dob'];
            $datetime1 = date_create($current_date);
            $datetime2 = date_create($ended_at);
            $interval = date_diff($datetime1, $datetime2);
            $time_diff=$interval->format('%y years %m months %d days');
            $getMrn['age']=$time_diff;
            return $getMrn;
        }
        else{
            return false;
        }
    }
    public function loginPatient(){
        $data = array(
            'User_Name' => 'admin@dev.com',
            'User_Password' => '123456789',
        );
        $ch = curl_init('https://trakcaredevapi.kaauh.edu.sa/api/admin/login');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set SSL certificate verification options.
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

        $curl_scraped_page = curl_exec($ch);
        $authorize = json_decode($curl_scraped_page,true);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($authorize['status']==true)
        {
            $token =$authorize['authorization_Token'];
            return $token;
        }
        else{
            return false;
        }
    }
    public function verifyMrn($mrn){
        try{
            $loginPatient= $this->loginPatient();
            if($loginPatient==false)
            {
                return false;
            }
            $headers = [
                'Authorization: Bearer '.$loginPatient
            ];
            $data = array(
                'MRN_Number' => $mrn,
            );
            $ch = curl_init('https://trakcaredevapi.kaauh.edu.sa/api/patient/validate');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            // Set SSL certificate verification options.
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

            $curl_scraped_page = curl_exec($ch);
            $authorize = json_decode($curl_scraped_page,true);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            $response=json_decode($curl_scraped_page,true);
            if(collect($response)['status']==false)
            {
                return false;
            }
            else{
                return collect($response)['data'];
            }
            //dd(collect($response));
        }
        catch(\Exception $e){
            return false;
            //return redirect()->back()->with('error','Something went wrong!');
            //return redirect()->back()->with('error',$e->getMessage());
        }
    }
}
