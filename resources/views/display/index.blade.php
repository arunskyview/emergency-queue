@extends('layout.call_page')
@section('content')
<!-- BEGIN: Page Main-->
<div id="loader-wrapper">
    <div id="loader"></div>

    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>

</div>
<div id="main" class="no-print" style="padding: 15px 15px 0px;">

    <div class="wrapper" style=" min-height: 557px;" id="display-page">
        <section class="content-wrapper no-print">
            <div id="callarea" class="row" style="line-height:1.23;display:flex; flex-direction:row-reverse">
                {{-- <div class="col m4">
                    <div class="card-panel center-align p-0" style="margin-bottom:0;height:74vh" id="side-token-display">
                        <div style="border-bottom:1px solid #ddd;height:25%;display:flex;flex-direction:row;justify-content:center;align-items:center">
                            <div>
                                <span v-if="tokens[1]" class="bolder-color" style="font-size:45px;font-weight:bold;line-height:1.2">@{{tokens[1]?.token_letter}}-@{{tokens[1]?.token_number}}</span>
                                <span v-if="!tokens[1]" class="bolder-color" style="font-size:45px;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span><br>
                                <small v-if="tokens[1]" class="bolder-color" id="counter1" style="font-size:25px; font-weight:bold;">@{{tokens[1]?.counter.name}}</small>
                                <small v-if="!tokens[1]" class="bolder-color" id="counter1" style="font-size:25px; font-weight:bold;">{{__('messages.display.nil')}}</small><br>
                                <small v-if="tokens[1]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:20px; color:#009688; font-weight:bold;">{{__('messages.display.served')}}</small>
                                <small v-if="tokens[1]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:20px;font-weight:bold;color:red">{{__('messages.display.noshow')}}</small>
                                <small v-if="tokens[1] && tokens[1]?.call_status_id == null" style="font-size:20px; color:orange; font-weight:bold;">{{__('messages.display.serving')}}</small>
                                <small v-if="!tokens[1]" style="font-size:20px;">{{__('messages.display.nil')}}</small>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid #ddd;height:25%;display:flex;flex-direction:row;justify-content:center;align-items:center">
                            <div>
                                <span v-if="tokens[2]" class="bolder-color" style="font-size:45px; font-weight:bold;line-height:1.2">@{{tokens[2]?.token_letter}}-@{{tokens[2]?.token_number}}</span>
                                <span v-if="!tokens[2]" class="bolder-color" style="font-size:45px; font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span><br>
                                <small v-if="tokens[2]" class="bolder-color" id="counter2" style="font-size:25px;font-weight:bold;">@{{tokens[2]?.counter.name}}</small>
                                <small v-if="!tokens[2]" class="bolder-color" id="counter2" style="font-size:25px;font-weight:bold;">{{__('messages.display.nil')}}</small><br>
                                <small v-if="tokens[2]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:20px; color:#009688; font-weight:bold;">{{__('messages.display.served')}}</small>
                                <small v-if="tokens[2]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:20px; font-weight:bold; color:red">{{__('messages.display.noshow')}}</small>
                                <small v-if="tokens[2] && tokens[2]?.call_status_id == null" style="font-size:20px;color:orange;font-weight:bold;">{{__('messages.display.serving')}}</small>
                                <small v-if="!tokens[2]" style="font-size:20px; font-weight:bold;">{{__('messages.display.nil')}}</small>
                            </div>
                        </div>
                        <div style="height:25%;border-bottom:1px solid #ddd;display:flex;flex-direction:row;justify-content:center;align-items:center">
                            <div>
                                <span v-if="tokens[3]" class="bolder-color" style="font-size:45px;font-weight:bold;line-height:1.2">@{{tokens[3]?.token_letter}}-@{{tokens[3]?.token_number}}</span>
                                <span v-if="!tokens[3]" class="bolder-color" style="font-size:45px;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span><br>
                                <small v-if="tokens[3]" class="bolder-color" id="counter3" style="font-size:25px; font-weight:bold;">@{{tokens[3]?.counter.name}}</small>
                                <small v-if="!tokens[3]" class="bolder-color" id="counter3" style="font-size:25px; font-weight:bold;">{{__('messages.display.nil')}}</small><br>
                                <small v-if="tokens[3]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:20px; color:#009688; font-weight:bold;">{{__('messages.display.served')}}</small>
                                <small v-if="tokens[3]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:20px; font-weight:bold; color:red">{{__('messages.display.noshow')}}</small>
                                <small v-if="tokens[3] && tokens[3]?.call_status_id == null" style="font-size:20px; color:orange; font-weight:bold;">{{__('messages.display.serving')}}</small>
                                <small v-if="!tokens[3]" style="font-size:20px; font-weight:bold;">{{__('messages.display.nil')}}</small>
                            </div>
                        </div>
                        <div style="height:25%;display:flex;flex-direction:row;justify-content:center;align-items:center">
                            <div>
                                <span v-if="tokens[4]" class="bolder-color" style="font-size:45px;font-weight:bold;line-height:1.2">@{{tokens[4]?.token_letter}}-@{{tokens[4]?.token_number}}</span>
                                <span v-if="!tokens[4]" class="bolder-color" style="font-size:45px;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span><br>
                                <small v-if="tokens[4]" class="bolder-color" id="counter4" style="font-size:25px; font-weight:bold;">@{{tokens[4]?.counter.name}}</small>
                                <small v-if="!tokens[4]" class="bolder-color" id="counter4" style="font-size:25px; font-weight:bold;">{{__('messages.display.nil')}}</small><br>
                                <small v-if="tokens[4]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:20px; color:#009688; font-weight:bold;">{{__('messages.display.served')}}</small>
                                <small v-if="tokens[4]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:20px; font-weight:bold; color:red">{{__('messages.display.noshow')}}</small>
                                <small v-if="tokens[4] &&tokens[4]?.call_status_id == null" style="font-size:20px; color:orange; font-weight:bold;">{{__('messages.display.serving')}}</small>
                                <small v-if="!tokens[4]" style="font-size:20px; font-weight:bold;">{{__('messages.display.nil')}}</small>
                            </div>
                        </div>
                    </div>
                </div> --}}

                {{-- <div class="col m8">
                    <div class="card-panel center-align" style="margin-bottom:0;height:74vh;display:flex;flex-direction:row;justify-content:center;align-items:center">
                        <div>
                            <div class="bolder-color" style="font-size:50px; margin:0px">{{__('messages.display.token number')}}</div>
                            <span v-if="tokens[0]" style="font-size:130px;color:red;font-weight:bold;line-height:1.2">@{{tokens[0]?.token_letter}}-@{{tokens[0]?.token_number}}</span>
                            <span v-if="!tokens[0]" style="font-size:130px;color:red;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span>
                            <div v-if="tokens[0]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:40px; color:#009688">{{__('messages.display.served')}}</div>
                            <div v-if="tokens[0]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:40px; color:red">{{__('messages.display.noshow')}}</div>
                            <div v-if="tokens[0] && tokens[0]?.call_status_id == null" style="font-size:40px; color:orange; font-weight: bold">{{__('messages.display.serving')}}</div>
                            <div v-if="!tokens[0]" style="font-size:40px; color:orange; font-weight: bold">{{__('messages.display.nil')}}</div>
                            <div class="bolder-color" style="font-size:40px; line-height:1.4">{{__('messages.display.please proceed to')}}</div>
                            <div v-if="tokens[0]" id="counter0" style="font-size:70px; color:red;line-height:1.5">@{{tokens[0]?.counter.name}}</div>
                            <div v-if="!tokens[0]" style="font-size:70px; color:red;line-height:1.5">{{__('messages.display.nil')}}</div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:0; margin-top: 15px;">
                        <marquee><span style="font-size:{{$settings->display_font_size}}px;color:{{$settings->display_font_color}}">{{$settings->display_notification ? $settings->display_notification : 'Hello' }}<span></span></span></marquee>
                    </div>
                </div> --}}

                <div class="col m8">
                    <div class="card-panel center-align" style="margin-bottom:0;height:74vh;display:flex;flex-direction: column-reverse;justify-content: flex-end;">
                        <div>
                            {{-- <div  :style="{'background-color':tokens1[0]?.service.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{tokens1[0]?.service.name}}</div> --}}
                            <div  :style="{'background-color':token_label_1?.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{token_label_1?.name}}</div>
                            <div class="bolder-color" style="font-size:25px; margin:0px">{{__('messages.display.token number')}}</div>
                            <span v-if="tokens1[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">@{{tokens1[0]?.token_letter}}-@{{tokens1[0]?.token_number}}</span>
                            <span v-if="!tokens1[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span>
                            <div v-if="tokens1[0]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:40px; color:black">{{__('messages.display.served')}}</div>
                            <div v-if="tokens1[0]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:40px; color:black">{{__('messages.display.noshow')}}</div>
                            <div v-if="tokens1[0] && tokens1[0]?.call_status_id == null" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.serving')}}</div>
                            <div v-if="!tokens1[0]" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.nil')}}</div>
                            {{-- <div class="bolder-color" style="font-size:40px; line-height:1.4">{{__('messages.display.please proceed to')}}</div> --}}
                            {{-- <div v-if="tokens1[0]" id="counter0" style="font-size:70px; color:red;line-height:1.5">@{{tokens1[0]?.counter.name}}</div> --}}
                            {{-- <div v-if="!tokens1[0]" style="font-size:70px; color:red;line-height:1.5">{{__('messages.display.nil')}}</div> --}}
                            <hr style="margin: 0;">
                            {{-- <div style="max-height: 477px;overflow: auto !important;">
                                <div v-for="next_tokens1 in tokens_for_next_to_call1" style="padding: 10px;">
                                    <h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens1.letter}}-@{{next_tokens1.number}}</h6>
                                    <hr style="margin: 0;">
                                </div>
                            </div> --}}
                            <div style="max-height: 565px;overflow: auto !important;">
                                <table class="recall_table display dataTable" id="page-length-option">
                                    <thead>
                                        <tr>
                                            <th>Token number</th>
                                            <th>Counter (mins)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(next_tokens1,index) in tokens_for_next_to_call1">
                                            <td><h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens1.letter}}-@{{next_tokens1.number}}</h6> </td>
                                            <td><h1><span :style="{'display': 'flex','flex-direction': 'row-reverse','padding': '6px','font-weight':'600','border-radius': '8px','color':'#000'}"> @{{called_tokens_timer_second[next_tokens1.id]}} </span></h1></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:0; margin-top: 15px;">
                        <marquee><span style="font-size:{{$settings->display_font_size}}px;color:{{$settings->display_font_color}}">{{$settings->display_notification ? $settings->display_notification : 'Hello' }}<span></span></span></marquee>
                    </div>
                </div>

                <div class="col m8">
                    <div class="card-panel center-align" style="margin-bottom:0;height:74vh;display:flex;flex-direction: column-reverse;justify-content: flex-end;">
                        <div>
                            {{-- <div  :style="{'background-color':tokens2[0]?.service.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{tokens2[0]?.service.name}}</div> --}}
                            <div  :style="{'background-color':token_label_2?.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{token_label_2?.name}}</div>
                            <div class="bolder-color" style="font-size:25px; margin:0px">{{__('messages.display.token number')}}</div>
                            <span v-if="tokens2[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">@{{tokens2[0]?.token_letter}}-@{{tokens2[0]?.token_number}}</span>
                            <span v-if="!tokens2[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span>
                            <div v-if="tokens2[0]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:40px; color:black">{{__('messages.display.served')}}</div>
                            <div v-if="tokens2[0]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:40px; color:black">{{__('messages.display.noshow')}}</div>
                            <div v-if="tokens2[0] && tokens2[0]?.call_status_id == null" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.serving')}}</div>
                            <div v-if="!tokens2[0]" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.nil')}}</div>
                            {{-- <div class="bolder-color" style="font-size:40px; line-height:1.4">{{__('messages.display.please proceed to')}}</div> --}}
                            {{-- <div v-if="tokens2[0]" id="counter0" style="font-size:70px; color:red;line-height:1.5">@{{tokens2[0]?.counter.name}}</div> --}}
                            {{-- <div v-if="!tokens2[0]" style="font-size:70px; color:red;line-height:1.5">{{__('messages.display.nil')}}</div> --}}
                            <hr style="margin: 0;">
                            {{-- <div style="max-height: 477px;overflow: auto !important;">
                                <div v-for="next_tokens2 in tokens_for_next_to_call2" style="padding: 10px;">
                                    <h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens2.letter}}-@{{next_tokens2.number}}</h6>
                                    <hr style="margin: 0;">
                                </div>
                            </div> --}}
                            <div style="max-height: 565px;overflow: auto !important;">
                                <table class="recall_table display dataTable" id="page-length-option">
                                    <thead>
                                        <tr>
                                            <th>Token number</th>
                                            <th>Counter (mins)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(next_tokens2,index) in tokens_for_next_to_call2">
                                            <td><h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens2.letter}}-@{{next_tokens2.number}}</h6> </td>
                                            <td><h1><span :style="{'display': 'flex','flex-direction': 'row-reverse','padding': '6px','font-weight':'600','border-radius': '8px','color':'#000'}"> @{{called_tokens_timer_second[next_tokens2.id]}}</h1> </span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:0; margin-top: 15px;">
                        <marquee><span style="font-size:{{$settings->display_font_size}}px;color:{{$settings->display_font_color}}">{{$settings->display_notification ? $settings->display_notification : 'Hello' }}<span></span></span></marquee>
                    </div>
                </div>

                <div class="col m8">
                    <div class="card-panel center-align" style="margin-bottom:0;height:74vh;display:flex;flex-direction: column-reverse;justify-content: flex-end;">
                        <div>
                            {{-- <div  :style="{'background-color':tokens3[0]?.service.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{tokens3[0]?.service.name}}</div> --}}
                            <div  :style="{'background-color':token_label_3?.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{token_label_3?.name}}</div>
                            <div class="bolder-color" style="font-size:25px; margin:0px">{{__('messages.display.token number')}}</div>
                            <span v-if="tokens3[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">@{{tokens3[0]?.token_letter}}-@{{tokens3[0]?.token_number}}</span>
                            <span v-if="!tokens3[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span>
                            <div v-if="tokens3[0]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:40px; color:black">{{__('messages.display.served')}}</div>
                            <div v-if="tokens3[0]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:40px; color:black">{{__('messages.display.noshow')}}</div>
                            <div v-if="tokens3[0] && tokens3[0]?.call_status_id == null" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.serving')}}</div>
                            <div v-if="!tokens3[0]" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.nil')}}</div>
                            {{-- <div class="bolder-color" style="font-size:40px; line-height:1.4">{{__('messages.display.please proceed to')}}</div> --}}
                            {{-- <div v-if="tokens3[0]" id="counter0" style="font-size:70px; color:red;line-height:1.5">@{{tokens3[0]?.counter.name}}</div> --}}
                            {{-- <div v-if="!tokens3[0]" style="font-size:70px; color:red;line-height:1.5">{{__('messages.display.nil')}}</div> --}}
                            <hr style="margin: 0;">
                            {{-- <div style="max-height: 477px;overflow: auto !important;">
                                <div v-for="next_tokens3 in tokens_for_next_to_call3" style="padding: 10px;">
                                    <h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens3.letter}}-@{{next_tokens3.number}}</h6>
                                    <hr style="margin: 0;">
                                </div>

                            </div> --}}
                            <div style="max-height: 565px;overflow: auto !important;">
                                <table class="recall_table display dataTable" id="page-length-option">
                                    <thead>
                                        <tr>
                                            <th>Token number</th>
                                            <th>Counter (mins)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(next_tokens3,index) in tokens_for_next_to_call3">
                                            <td><h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens3.letter}}-@{{next_tokens3.number}}</h6> </td>
                                            <td><h1><span :style="{'display': 'flex','flex-direction': 'row-reverse','padding': '6px','font-weight':'600','border-radius': '8px','color':'#000'}"> @{{called_tokens_timer_second[next_tokens3.id]}}</h1> </span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:0; margin-top: 15px;">
                        <marquee><span style="font-size:{{$settings->display_font_size}}px;color:{{$settings->display_font_color}}">{{$settings->display_notification ? $settings->display_notification : 'Hello' }}<span></span></span></marquee>
                    </div>
                </div>
            </div>

            <audio id="called_sound">
                <source src="{{asset('app-assets/audio/sound.mp3')}}" type="audio/mpeg">
            </audio>
        </section>
    </div>
</div>
@endsection
@section('b-js')
<script>
    window.JLToken = {
        get_tokens_for_display_url: "{{ asset($file) }}",
        get_tokens_for_display_first_url: "{{ asset($file1) }}",
        get_tokens_for_display_second_url: "{{ asset($file2) }}",
        get_tokens_for_display_third_url: "{{ asset($file3) }}",
        selectedService1:"{{$service_1}}",
        selectedService2:"{{$service_2}}",
        selectedService3:"{{$service_3}}",
        selectedServiceLabel1:JSON.parse('{!!$service_label_1->toJson()!!}'),
        selectedServiceLabel2:JSON.parse('{!!$service_label_2->toJson()!!}'),
        selectedServiceLabel3:JSON.parse('{!!$service_label_3->toJson()!!}'),
        get_tokens_from_file1: "{{ asset('storage/tokens_for_callpage.json') }}",
        get_token_timer:"{{route('get-token-time')}}",
        get_initial_tokens: "{{ route('get-tokens-for-display') }}",
        date_for_display: "{{$date}}",
        voice_type: "{{$settings->language->display}}",
        voice_content_one: "{{$settings->language->token_translation}}",
        voice_content_two: "{{$settings->language->please_proceed_to_translation}}",
        date_for_display: "{{$date}}",
        audioEl: document.getElementById('called_sound'),
    }
</script>
@endsection
