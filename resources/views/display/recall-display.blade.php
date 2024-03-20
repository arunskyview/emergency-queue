@extends('layout.call_page')
@section('content')
<!-- BEGIN: Page Main-->
<div id="loader-wrapper">
    <div id="loader"></div>

    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>

</div>
<div id="main" class="no-print" style="padding: 15px 15px 0px;">

    <div class="wrapper" style=" min-height: 557px;" id="recall-display-page">
        <section class="content-wrapper no-print">
            <div id="callarea" class="row" style="line-height:1.23;display:flex; flex-direction:row-reverse">




                <div class="col m8">
                    <div class="card-panel center-align" style="margin-bottom:0;height:85vh;display:flex;flex-direction: column-reverse;justify-content: flex-end;">
                        <div>
                            <div  :style="{'background-color':tokens1[0]?.service.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{tokens1[0]?.service.name}}</div>
                            <div class="bolder-color" style="font-size:25px; margin:0px">{{__('messages.display.token number')}}</div>
                            <span v-if="tokens1[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">@{{tokens1[0]?.token_letter}}-@{{tokens1[0]?.token_number}}</span>
                            <span v-if="!tokens1[0]" style="font-size:130px;color:black;font-weight:bold;line-height:1.2">{{__('messages.display.nil')}}</span>
                            <div v-if="tokens1[0]?.call_status_id == {{CallStatuses::SERVED}}" style="font-size:40px; color:black">{{__('messages.display.served')}}</div>
                            <div v-if="tokens1[0]?.call_status_id == {{CallStatuses::NOSHOW}}" style="font-size:40px; color:black">{{__('messages.display.noshow')}}</div>
                            <div v-if="tokens1[0] && tokens1[0]?.call_status_id == null" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.serving')}}</div>
                            <div v-if="!tokens1[0]" style="font-size:40px; color:black; font-weight: bold">{{__('messages.display.nil')}}</div>

                            <hr style="margin: 0;">
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
                    <div class="card-panel center-align" style="margin-bottom:0;height:85vh;display:flex;flex-direction: column-reverse;justify-content: flex-end;">
                        <div>
                            <div  :style="{'background-color':tokens2[0]?.service.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{tokens2[0]?.service.name}}</div>
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
                                {{-- <div v-for="(next_tokens2,index) in tokens_for_next_to_call2" style="padding: 10px;">
                                    <h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens2.letter}}-@{{next_tokens2.number}} <span :style="{'display': 'flex','flex-direction': 'row-reverse','padding': '6px','font-weight':'600','border-radius': '8px','background-color':called_tokens_timer_second[next_tokens2.id] >= next_tokens2.call.category_time? '#f99999':'','color':'#000'}"> @{{called_tokens_timer_second[next_tokens2.id]}} / @{{next_tokens2.call.category_time}} </span></h6>

                                    <hr style="margin: 0;">
                                </div> --}}
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:0; margin-top: 15px;">
                        <marquee><span style="font-size:{{$settings->display_font_size}}px;color:{{$settings->display_font_color}}">{{$settings->display_notification ? $settings->display_notification : 'Hello' }}<span></span></span></marquee>
                    </div>
                </div>

                <div class="col m8">
                    <div class="card-panel center-align" style="margin-bottom:0;height:85vh;display:flex;flex-direction: column-reverse;justify-content: flex-end;">
                        <div>
                            <div  :style="{'background-color':tokens3[0]?.service.color,'font-size':'50px','color':'black', 'margin':'0px'}">@{{tokens3[0]?.service.name}}</div>
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
                                {{-- <div v-for="(next_tokens3, index) in tokens_for_next_to_call3" style="padding: 10px;">
                                    <h6 style="margin: 0px; font-size:50px; font-weight:600;">@{{next_tokens3.letter}}-@{{next_tokens3.number}} <span :style="{'display': 'flex','flex-direction': 'row-reverse','padding': '6px','font-weight':'600','border-radius': '8px','background-color':called_tokens_timer_second[next_tokens3.id] >= next_tokens3.call.category_time? '#f99999':'','color':'#000'}"> @{{called_tokens_timer_second[next_tokens3.id]}} / @{{next_tokens3.call.category_time}} </span></h6>

                                    <hr style="margin: 0;">
                                </div> --}}

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
        get_server_timer:"{{route('get-server-time')}}",
        get_tokens_from_file1: "{{ asset('storage/tokens_for_callpage.json') }}",
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
