<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Candidate;
use App\Models\Otp;
use Illuminate\Support\Facades\Validator;;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;



class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $users = Candidate::orderBy('candidate_id', 'desc')->take(10)->get();
       
       foreach($users as $u){
           $u->resume = Storage::url($u->resume);
       }

       if($users->count() > 0){
            return response()->json([
                    'status' =>200,
                    'response' => $users,
                ]);
       }else {
            return response()->json([
                    'status' =>404,
                    'response' => $users,
                ]);
       }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:candidate,email1',
            'mobile' => 'required|unique:candidate,phone_cell|digits:10',
            'work_experience' => 'required',
            'notice_period' => 'required',
            'resume' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'status' =>400,
                'msg' => $validator->errors()->first(),
            ]);
        }
        $isExists = Otp::where('mobile',request()->mobile)->first();
        $otp = rand(1000, 9999);
        if(!empty($isExists)){
            if($isExists->otp_valid_till >= Carbon::now()->timestamp){
                $otp_valid_till  = Carbon::createFromTimestamp($isExists->otp_valid_till);
                $diff_time = Carbon::now()->diffInMinutes($otp_valid_till).' minutes';
                if($diff_time == 0){
                    $diff_time = Carbon::now()->diffInSeconds($otp_valid_till).' seconds';
                }
                return response()->json([
                    'status' =>401,
                    'msg' => 'OTP already has been sent to given mobile number, you can resend after '.$diff_time.'',
                ]);
            }else{
                $isExists->otp = $otp;
                $isExists->otp_valid_till = Carbon::now()->addMinutes(3)->timestamp;
                $isExists->save();
                $this->sendOtp(request()->mobile,$otp);
                return response()->json([
                    'status' =>200,
                    'msg' => 'OTP Sent to given mobile number valid for 10 minutes.',
                ]);
            }
        }else{
            $data = array(
                'mobile'=>request()->mobile,
                'otp' => $otp,
                'otp_valid_till' => Carbon::now()->addMinutes(10)->timestamp,
            );
            $sendOtp = Otp::create($data);
            if($sendOtp){
                $this->sendOtp(request()->mobile,$otp);
                return response()->json([
                    'status' =>200,
                    'msg' => 'OTP Sent to given mobile number valid for 10 minutes.',
                ]);
            }else{
                return response()->json([
                    'status' =>100,
                    'msg' => 'Something went wrong, please try again.',
                ]);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:candidate,email1',
            'mobile' => 'required|unique:candidate,phone_cell|digits:10',
            'work_experience' => 'required',
            'notice_period' => 'required',
            'resume' => 'required|mimes:pdf,doc,docx|max:2048',
            'otp' => 'required|digits:4',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'status' =>400,
                'msg' => $validator->errors()->first(),
            ]);
        }

        if($this->verifyOtp(request()->mobile,request()->otp)){
            $file = $request->file('resume');
            $name = time().$file->getClientOriginalName();
            $path = $file->storeAs('public/resumes',$name);
            $data = array(
                'first_name'=>request()->first_name,
                'last_name'=>request()->last_name,
                'email1'=>request()->email,
                'phone_cell'=>request()->mobile,
                'experience'=>request()->work_experience,
                'resume'=> $path,
                'enteredbycompanyid' => 0,
            );
            $candidate = Candidate::create($data);
            if($candidate){
                return response()->json([
                    'status' =>200,
                    'msg' => 'We got your application, someone from the team will get contact you.',
                ]);
            }else{
                return response()->json([
                    'status' =>100,
                    'msg' => 'Something went wrong, please try again.',
                ]);
            }
        }else{
            return response()->json([
                'status' =>400,
                'msg' => 'Otp verification failed, please try again.',
            ]);
        }
    }

    public function sendOtp($mobile,$otp){
        return true;
    } 

    public function verifyOtp($mobile,$otp){
        $isExists = Otp::where('mobile',$mobile)->first();
        if($isExists->otp == $otp){
            $isExists->delete();
            return true;
        }else{
            return false;
        }
    } 
}
