@extends('layout.call_page')
@section('call','active')
@section('content')
<div id="loader-wrapper">
    <div id="loader"></div>

    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>

</div>
<div id="main" style="width:99%">
    <div class="wrapper no-print" id="call-page">
        <section id="content" class="content-wrapper no-print" v-cloak>
            <div class="container" style="background:#f9f9f9 !important;">
                <div id="card-reveal" class="section" style="padding:0px !important;">
                    <div class="col s12">
                        <div class="row">
                            <div class="col s12" style="padding:0px !important;">
                                <div class="card" style=" margin:0px !important; box-shadow: none; background:#f9f9f9 !important;">
                                    <div class="card-content" v-if="selected_counter && selected_service">
                                        <div class="col  m12 s12" style="min-height: 500px;">
                                            <div class="row" style="min-width: 800px;">
                                                <div class="col s12 center" v-if="token">
                                                    <span style="font-size: 115px;" class="truncate">
                                                        <a class="waves-effect waves-light  modal-trigger" href="#modal5" dismissible="false" style="color: #000;">
                                                            <input type="hidden" name="transfer_queue" id="transfer_queue" value="1989">
                                                            <input type="hidden" name="last_call" id="last_call" value="queue" v-cloak>
                                                            @{{token.letter?token.letter : token.token_letter }}-@{{token.number? token.number : token.token_number}}
                                                        </a>
                                                    </span>
                                                </div>
                                                <div class="col s12 center" v-if="!token">
                                                    <span style="font-size: 115px; color:black" class="truncate">
                                                        {{__('messages.call_page.nil')}}
                                                    </span><br>
                                                </div>
                                                <div class="col s12 center">
                                                    <div style="font-size:25px;" v-if="token?.call_status_id == {{CallStatuses::SERVED}}">{{__('messages.call_page.served')}}</div>
                                                    <div style="font-size:25px;" v-if="token?.call_status_id == {{CallStatuses::NOSHOW}}">{{__('messages.call_page.noshow')}}</div>
                                                    <div style="font-size:30px;" v-if="token && isCalled && this.token.ended_at == null">@{{time_after_called}}</div>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top:50px; min-width:800px">
                                                <div class=" col m6 offset-m3 col s12 center">
                                                    <div class="input-field col s6">
                                                        <button id="next_call" class="btn waves-effect waves-light center call-bt submit " :style="[font_size_smaller  ? { 'font-size' : '14px', 'padding' : '0 4px' } : '']" type="submit" style="min-width:165px;" @click="callNext(tokens_for_next_to_call[0].id)" :disabled="isCalled || callNextClicked">{{__('messages.call_page.call next')}}
                                                            <i class="material-icons right" :style="[font_size_smaller ? { 'margin-left' : '0px' } : '']">send</i>
                                                        </button>
                                                    </div>
                                                    <div class="input-field col s6">
                                                        <button class="btn waves-effect waves-light center call-bt submit " :style="[font_size_smaller  ? { 'font-size' : '14px', 'padding' : '0 4px' } : '']" @click="openCategoryModal(token.id)" type="button" style="min-width:165px;" :disabled="!isCalled || openCategoryClicked">{{__('messages.call_page.category')}}
                                                            <i class="material-icons right" :style="[font_size_smaller ? { 'margin-left' : '0px' } : '']">list</i>
                                                        </button>
                                                    </div>
                                                    {{-- <div class="input-field col s6">
                                                        <button class="btn waves-effect waves-light center submit call-bt" type="submit" @click="recallToken(token.id)" name="action" style="min-width:165px" :disabled="!isCalled || recallClicked">{{__('messages.call_page.recall')}}
                                                            <i class="material-icons right">send</i>
                                                        </button>
                                                    </div> --}}
                                                </div>
                                                <div class="col m6 offset-m3 col s12 center">
                                                    {{-- <div class="input-field col s6">
                                                        <button class="btn waves-effect waves-light center submit call-bt" type="submit" name="action" @click="noShowToken(token.id)" :disabled="!isCalled || noshowClicked" :style="[font_size_smaller  ? { 'font-size' : '14px', 'padding' : '0 4px' } : '']" style="min-width:165px;">{{__('messages.call_page.noshow')}}
                                                            <i class="material-icons right" :style="[font_size_smaller ? { 'margin-left' : '0px' } : '']">send</i>
                                                        </button>
                                                    </div> --}}
                                                    <div class="input-field col s6">
                                                        {{-- <button class="btn waves-effect waves-light center call-bt submit " :style="[font_size_smaller  ? { 'font-size' : '14px', 'padding' : '0 4px' } : '']" @click="openCategoryModal(token.id)" type="button" style="min-width:165px;" :disabled="!isCalled || openCategoryClicked">{{__('messages.call_page.category')}}
                                                            <i class="material-icons right" :style="[font_size_smaller ? { 'margin-left' : '0px' } : '']">send</i>
                                                        </button> --}}
                                                        {{-- <a class="btn waves-effect center call-bt waves-light tooltipped" @click="openCategoryModal(token.id)" :disabled="openCategoryClicked"  data-position="top" data-tooltip="Category">{{__('messages.call_page.category')}}<i class="material-icons right" :style="[font_size_smaller ? { 'margin-left' : '0px' } : '']">send</i></a> --}}
                                                    </div>
                                                </div>
                                                <div class="col m6 offset-m3 col s12 center">
                                                    {{-- <div class="input-field col s6">
                                                        <button class="btn waves-effect waves-light center call-bt submit" type="submit" @click="serveToken(token.id)" style="min-width:165px" :disabled="!isCalled || servedClicked">{{__('messages.call_page.served')}}
                                                            <i class="material-icons right">send</i>
                                                        </button>
                                                    </div> --}}
                                                </div>
                                                <div class="col s12 center-align mt-2 h1" v-if="selected_service && selected_counter">
                                                    {{-- <h2><b>{{__('messages.call_page.service')}}:</b> @{{ selected_service.name }}|</h2> --}}
                                                    <h2><b>{{__('messages.call_page.service')}}:</b>
                                                        <span v-for="serviceData in JSON.parse(selected_service_data)">
                                                            @{{ serviceData }} |
                                                        </span>
                                                    </h2>
                                                    <h2><b>{{__('messages.call_page.room')}}: </b>@{{selected_counter.name}} |</h2>
                                                    <a class="btn-floating btn-action waves-effect waves-light orange tooltipped" @click="openSetServiceModal()" data-position="top" data-tooltip="Change"><i class="material-icons">edit</i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="select-service" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <div class="offset-s1"></div>

                    <form action="" method="" class="form-horizontal">
                        <h4 class="header center" style="font-size:34px;text-transform:none;">
                            {{__('messages.call_page.set service and counter')}}
                        </h4>
                        <div class="divider col s12"></div>
                        <div class="row" style="padding-top: 7px;">
                            <div class="row">
                                <div class="col s10 offset-s1">
                                    <div class="input-field col s12">
                                        {{-- <select v-model="service_id" multiple>
                                            <option value="" disabled selected>{{__('messages.call_page.choose your service')}}</option>
                                            <option v-for="service in services" :value="service.id">@{{service.name}}</option>
                                        </select> --}}

                                        <select v-model="selectedServices" multiple>
                                            <option disabled selected>{{__('messages.call_page.choose your service')}}</option>
                                            <option v-for="service in services" :value="service.id">@{{ service.name }}</option>
                                        </select>

                                        <label>{{__('messages.call_page.service')}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s10 offset-s1">
                                    <div class="input-field col s12">
                                        <select v-model="counter_id">
                                            <option value="" disabled selected>{{__('messages.call_page.choose your counter')}}</option>
                                            <option v-for="counter in counters" :value="counter.id">@{{counter.name}}</option>
                                        </select>
                                        <label>{{__('messages.call_page.counter')}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">

                    <a v-if="!selected_service && !selected_counter" href="{{route('dashboard')}}"><button class="btn waves-effect waves-light red" style="margin-right: 20px ; margin-left: 20px" type="button">{{__('messages.common.go back')}}
                            <i class="material-icons right">close</i>
                        </button></a>
                    <button v-if="selected_service && selected_counter" class="modal-close btn waves-effect waves-light red" style="margin-right: 20px ; margin-left: 20px" type="button">{{__('messages.common.close')}}
                        <i class="material-icons right">close</i>
                    </button>
                    <button class="btn waves-effect waves-light submit" type="submit" name="action" :disabled="!counter_id" @click="setService()">{{__('messages.common.submit')}}
                        <i class="material-icons right">send</i>
                    </button>
                </div>

            </div>

            {{-- Category --}}
            <div id="select-category" class="modal modal-fixed-footer">
                <div class="modal-content">
                    <div class="offset-s1"></div>

                    <form action="" method="" class="form-horizontal">
                        <h4 class="header center" style="font-size:34px;text-transform:none;">
                            {{__('messages.call_page.set category and status')}}
                        </h4>
                        <div class="divider col s12"></div>
                        <div class="row" style="padding-top: 7px;">
                            <div class="row">
                                <div class="col-sm-6" style="margin-left:130px;">
                                    <label>{{__('messages.call_page.category')}}</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s10 offset-s1">
                                    {{-- <select v-model="category_ids" @change="setCategoryTime()" style="display: none;">
                                        <option value="" disabled selected>{{__('messages.call_page.choose your category')}}</option>
                                        <option v-for="category in categories" :value="category">@{{category}}</option>
                                    </select>
                                    <label>{{__('messages.call_page.category')}}</label> --}}

                                    <div class="input-field col s2" v-for="(category,index) in categories" :key="index">
                                        <button :style="{'background-color':category_id === category ? category_color :''}" class="btn waves-effect waves-light" type="button" @click="setCategoryTime(category)" >@{{category}} </button><i class="material-icons" v-if="category_id == category">check</i>
                                    </div>
                                    <div class="input-field col s6">
                                        <input type="number" v-model="category_time" name="category_time" oninput="this.value = Math.abs(this.value)">
                                        <label>{{__('messages.call_page.time')}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6" style="margin-left:130px;padding-bottom:10px;">
                                    <label>{{__('messages.call_page.status')}}</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s10 offset-s1">
                                    <div class="col s3.5" v-for="stat in status" >
                                        {{-- <select v-model="status_id">
                                            <option value="" disabled selected>{{__('messages.call_page.choose your status')}}</option>
                                            <option v-for="stat in status" :value="stat">@{{stat}}</option>
                                        </select>
                                        <label>{{__('messages.call_page.status')}}</label> --}}

                                        {{-- <button class="btn waves-effect waves-light" type="button" @click="setStatus(stat)"><span v-if="stat == 'RECALL'">Waiting Area</span><span v-if="stat != 'RECALL'">@{{stat}}</span></button> --}}
                                        <button :style="{'background-color': stat === status_id ? 'brown' :''}" class="btn waves-effect waves-light" type="button" @click="setStatus(stat)"><span v-if="stat == 'RECALL'">WAITING AREA  </span><span v-if="stat != 'RECALL'">@{{stat}} </span></button><i class="material-icons" v-if="stat == status_id">check</i>
                                    </div>
                                    {{-- <div class="input-field col s2" v-for="stat in status">
                                        <button class="btn waves-effect waves-light" type="button" @click="setStatus(stat)"><span v-if="stat == 'RECALL'">Waiting Area</span><span v-if="stat != 'RECALL'">@{{stat}}</span></button>
                                    </div> --}}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button  class="modal-close btn waves-effect waves-light red" style="margin-right: 20px ; margin-left: 20px" type="button">{{__('messages.common.close')}}
                        <i class="material-icons right">close</i>
                    </button>

                    <button class="btn waves-effect waves-light submit" type="submit" name="actions" @click="setCategory(token.id)">{{__('messages.common.submit')}}
                        <i class="material-icons right">send</i>
                    </button>
                </div>

            </div>
            {{-- End Category --}}
        </section>

    </div>
</div>

<?php
?>
@endsection

@section('b-js')
<script>
    window.JLToken = {
        current_lang: '{{\App::currentLocale()}}',
        call_page_loaded: true,
        get_token_category_status_url: "{{ route('get-token-category-and-status') }}",
        set_service_counter_url: "{{ route('set-service-and-counter') }}",
        get_token_for_call_url: "{{ route('get-token-for-call') }}",
        get_services_url: "{{ route('get-token-for-call') }}",
        change_category_url:"{{ route('change-category')}}",
        isServiceSelected: "{{session()->has('service')}}",
        get_services_and_counters_url: "{{route('get-services-counters')}}",
        get_called_tokens_url: "{{route('get-called-tokens')}}",
        get_server_timer:"{{route('get-server-time')}}",
        call_next_url: "{{route('call_next')}}",
        serve_token_url: "{{route('serve_token')}}",
        noshow_token_url: "{{route('noshow-token')}}",
        noshow_token_url: "{{route('noshow-token')}}",
        recall_token_url: "{{route('recall_token')}}",
        services: JSON.parse('{!!$services->toJson()!!}'),
        counters: JSON.parse('{!!$counters->toJson()!!}'),
        selectedCounter: "{{session()->has('counter')}}" ? JSON.parse('{!!session()->get("counter")!!}') : null,
        selectedService: {!! session()->has('service') ? json_encode(session()->get('service')) : 'null' !!},
        selectedMultiService: {!! session()->has('selected_service') ? json_encode(session()->get('selected_service')): json_encode([0]) !!},
        service_data: {!! session()->has('service_data') ? json_encode(session()->get('service_data')) : 'null' !!},

        get_tokens_from_file: "{{ asset('storage/tokens_for_callpage.json') }}",
        date: "{{ $date }}",
        served_lang: "{{__('messages.call_page.served')}}",
        noshow_lang: "{{__('messages.call_page.noshow')}}",
        called_lang: "{{__('messages.call_page.called')}}",
        recalled_lang: "{{__('messages.call_page.recalled')}}",
        no_ticket_lang: "{{__('messages.call_page.no ticket available')}}",
        alredy_used_lang: "{{__('messages.call_page.already used')}}",
        alredy_selected_lang: "{{__('messages.call_page.already selected')}}",
        error_lang: "{{__('messages.call_page.something went wrong')}}",
        alredy_called_lang: "{{__('messages.call_page.already called')}}",

    }
</script>
@endsection
