@extends('layout.call_page')
@section('content')
<!-- BEGIN: Page Main-->
<style>
/* loader */
div#mrnpageLoader {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    background: #00000061;
    height: 100%;
    top: 0;
    min-height: 100vh;
    z-index:999999;
}
div#mrnpageLoader img {
    max-width: 142px;
    margin: 0px auto;
}
div#mrnpageLoader {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
}
/* end loader */
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

button {
    padding: 10px;
    font-size: 16px;
    margin: 5px;
}

#virtual-keypad {
    margin-top: 20px;
}

.keypad-row {
    display: flex;
    justify-content: center;
}

.key {
    width: 40px;
    height: 40px;
    margin: 5px;
    font-size: 16px;
}
    /* keypad */
    @font-face {
        font-family: arabic;
        src: url({{asset('app-assets/fonts/regular.ttf')}});
    }
    .card {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    .token_list div#service-btn-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
    }
    div#service-btn-container {
        padding: 15px 0px;
    }
    .token_list .card-header {
        background: #e4e4e4;
        padding: 15px 20px;
    }
    .token_list .card-header span.card-title {
        color: #333;
    }
    .navbar .navbar-main {
        padding: 0 8px 0 20px;
    }
    .token_list span.btn {
        font-size: 24px;
        min-height: 125px;
        line-height: 1.2;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }
</style>

<div id="loader-wrapper">
    <div id="loader"></div>

    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>

</div>
<div id="main" class="noprint" style="padding: 15px 15px 0px;">
    <div class="wrapper">
        <section class="content-wrapper no-print token_list">
            <div class="container no-print">
                <div class="card" style="background:#f9f9f9;">
                    <div class="card-header">
                        <span class="card-title" style="line-height:1;font-size:22px"> {{__('messages.issue_token.click one service to issue token')}}</span>
                    </div>
                    <div class="card-body">
                         <div class="row">
                            <div class="col s12">
                                <div id="service-btn-container">


                                    @foreach($services as $service)
                                    <span class="btn btn-large btn-queue waves-effect waves-light mb-1" id="service_id_24" style="background: {{$service->color}};" onclick="queueDept({{$service}})">
                                        <div class="aa" >
                                            <div>{{$service->name}}</div>
                                            {{-- <div style="font-family: arabic; padding-top: 10px;">{{$service->name_ar}}</div> --}}
                                        </div>
                                    </span>
                                    @endforeach
                                </div>
                            </div>
                            <form action="{{route('create-token')}}" method="post" id="my-form-two" style="display: none;">
                                {{csrf_field()}}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- Modal Structure -->
    <div id="modal1" class="modal modal-fixed-footer" style="max-height: 80%; width:80%">
        <form id="details_form">
            <div class="modal-content" style="padding-bottom:0">
                <div id="inline-form">
                    <div class="card-content">
                        <div class="row">
                            <input type="hidden" name="first_name_en" id="first_name_en">
                            <input type="hidden" name="middle_name_en" id="middle_name_en">
                            <input type="hidden" name="last_name_en" id="last_name_en">
                            <input type="hidden" name="first_name_ar" id="first_name_ar">
                            <input type="hidden" name="middle_name_ar" id="middle_name_ar">
                            <input type="hidden" name="last_name_ar" id="last_name_ar">
                            <input type="hidden" name="gender" id="gender">
                            <input type="hidden" name="national_id" id="national_id">
                            <input type="hidden" name="dob" id="dob">
                            <input type="hidden" name="mobile_no" id="mobile_no">
                            <input type="hidden" name="mrn_no" id="mrn_no">

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="input-field col s4" id="name_tab">
                                            <input id="name" name="name" type="text" value="" data-error=".name">
                                            {{-- <label for="name">{{__('messages.settings.name')}}</label> --}}
                                            <label id="name_label" for="name">{{__('messages.settings.patient_file')}}</label>
                                            <div class="name">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <button id="mrn_search_btn" type="button" class="modal-action waves-effect waves-green btn-flat" style="float:left; background: #009688; color:#fff" onclick="checkMrn()">Search</button>
                                    </div>
                                </div>

                            <div class="input-field col s4" id="phone_tab">
                                <input id="phone" name="phone" type="text" value="" data-error=".phone">
                                <label for="phone">{{__('messages.settings.phone')}}</label>
                                <div class="phone">

                                </div>
                            </div>
                            <div class="input-field col s4" id="email_tab">
                                <input id="email" name="email" type="email" value="" data-error=".email">
                                <label for="email">{{__('messages.settings.email')}}</label>
                                <div class="email">

                                </div>
                            </div>
                        </div>
                        <div class="row" id="mrn_data" style="display: none;">
                            <div id="valid_mrn" class="col-md-6" style="text-align: left" style="display: none;">
                                <table style="width: 33%;">
                                    <tbody>
                                        <tr>
                                            <td>Name:</td>
                                            <td id="mrn_name"></td>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td id="mrn_gender"></td>
                                        </tr>
                                        <tr>
                                            <td>National Id:</td>
                                            <td id="mrn_national_id"></td>
                                        </tr>
                                        <tr>
                                            <td>Age:</td>
                                            <td id="mrn_age"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="invalid_mrn" class="col-md-6" style="text-align: left" style="display: none;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button  id="modal_button" type="submit" class=" modal-action waves-effect waves-green btn-flat" style="background: #009688; color:#fff" onclick="issueToken()">{{__('messages.common.submit')}}</button>
            </div>
        </form>

    </div>

</div>
{{-- without dialog print --}}



{{-- End dialog --}}

@endsection
<div id="printarea" class="printarea" style="text-align:center;margin-top: 20px; display:none">
</div>
<div id="mrn_loader" style="text-align:center;">
</div>
@section('js')

<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
{{-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script> --}}


<script>

    $(document).ready(function() {
        $('body').addClass('loaded');
        $('.modal').modal();
    })
    var service;

    function queueDept(value) {
        $('#mrn_data').attr('style','display:none;');

        if (value.ask_email == 1 || value.ask_name == 1 || value.ask_phone == 1) {
            if (value.ask_email == 1) $('#email_tab').show();
            else $('#email_tab').hide();
            if (value.ask_name == 1)
            {
                $('#mrn_search_btn').attr('style','float:left; background: #009688; color:#fff;');
                $('#modal_button').addClass('disabled');
                $('#name_tab').show();
            }
            else{
                $('#mrn_search_btn').attr('style','float:left; background: #009688; color:#fff;display:none;');
                $('#modal_button').removeClass('disabled');
                $('#name_tab').hide();
            }
            if (value.ask_phone == 1) $('#phone_tab').show();
            else $('#phone_tab').hide()
            service = value;
            $('#modal_button').removeAttr('disabled');
            $('#modal1').modal('open');
        } else {
            $('body').removeClass('loaded');
            let data = {
                service_id: value.id,
                with_details: false
            }
            createToken(data);
        }
    }

    function issueToken() {
        $('#details_form').validate({
            rules: {
                name: {
                    required: function(element) {
                        return service.name_required == "1";
                    },
                },
                email: {
                    required: function(element) {
                        return service.email_required == "1";
                    },
                    email: true
                },
                phone: {
                    required: function(element) {
                        return service.phone_required == "1";
                    },
                    number: true
                },
            },
            errorElement: 'div',
            errorPlacement: function(error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                $('#modal_button').attr('disabled', 'disabled');
                $('body').removeClass('loaded');
                let data = {
                    service_id: service.id,

                    mrn_no:$('#mrn_no').val(),
                    first_name_en:$('#first_name_en').val(),
                    middle_name_en:$('#middle_name_en').val(),
                    last_name_en:$('#last_name_en').val(),
                    first_name_ar:$('#first_name_ar').val(),
                    middle_name_ar:$('#middle_name_ar').val(),
                    last_name_ar:$('#last_name_ar').val(),
                    gender:$('#gender').val(),
                    national_id:$('#national_id').val(),
                    dob:$('#dob').val(),
                    mobile_no:$('#mobile_no').val(),

                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    with_details: true
                }
                createToken(data);
            }
        });
    }

    function createToken(data) {
        $.ajax({
            type: "POST",
            url: "{{route('create-token')}}",
            data: data,
            cache: false,
            success: function(response) {
                if (response.status_code == 200) {
                    $('#modal1').modal('close');
                    $('#phone').val(null);
                    $('#email').val(null);
                    $('#name').val(null);

                    var qrData='';
                    if(response.qr_code !='')
                    {
                        qrData=`<p style="font-size: 17px; margin-top: -16px;margin-bottom: 27px;">` + response.queue.name + `</p>
                        <div style="margin-top:-20px; margin-bottom:15px; padding:20px;" align="center">
                                `+response.qr_code+`
                            </div>`;
                    }
                    var ar_service="";
                    if(response.queue.service.name_ar)
                    {
                        ar_service=`<p style="font-size: 15px; margin-top:-5px;">(  ` + response.queue.service.name_ar + `  )</p>`;
                    }
                    //<p style="font-size: 10px; margin-top:-12px;">{{__('messages.issue_token.please wait for your turn')}}</p>
                    //<p style="font-size: 10px; margin-top:-12px;">{{__('messages.issue_token.customer waiting')}}:` + response.customer_waiting + `</p>
                    let html = `
                            <p style="margin-top:-15px;"><img src="{{session()->get('settings')->logo_url}}" style="width:270px;"></p>
                            <p style="font-size: 20px; font-weight: bold; margin-top:-15px;">` + response.settings.name + `,` + response.settings.location + `
                            </p>
                            <p style="font-size: 15px; margin-top:-15px;">` + response.queue.service.name + `</p>
                            `+ar_service+`
                            <h3 style="font-size: 25px; margin-bottom: 5px; font-weight: bold; margin-top:-12px; margin-bottom:16px;">` + response.queue.letter + ` - ` + response.queue.number + `</h3>
                            <p style="font-size: 15px; margin-top: -16px;margin-bottom: 27px;">` + response.queue.formated_date + `</p>
                            `+qrData+`
                            <div style="margin-top:-20px; margin-bottom:15px;" align="center">
                            </div>
                            <p style="font-size: 10px; margin-top:-12px;">{{__('messages.issue_token.please wait for your turn')}}</p>
                            <p style="text-align:left !important;font-size:8px;"></p>
                            <p style="text-align:right !important; margin-top:-23px;font-size:8px;"></p>`;
                    $('#printarea').html(html);

                    // document.getElementById("openDepartment").click();
                    $('body').addClass('loaded');

                    window.addEventListener('beforeprint', function () {
                        // Perform any necessary actions before printing (optional)
                        console.log('Preparing to print...');
                    });

                    // Trigger the print dialog
                    //window.print();
                    // print();

                    // dPrinting();                    //window.print();
                } else if (response.status_code == 422 && response.errors && (response.errors['name'] || response.errors['email'] || response.errors['phone'])) {
                    $('#modal_button').removeAttr('disabled');
                    if (response.errors['name'] && response.errors['name'][0]) {
                        $('.name').html('<span class="text-danger errbk">' + response.errors['name'][0] + '</span>')
                    }
                    if (response.errors['email'] && response.errors['email'][0]) {
                        $('.email').html('<span class="text-danger errbk">' + response.errors['email'][0] + '</span>')
                    }
                    if (response.errors['phone'] && response.errors['phone'][0]) {
                        $('.phone').html('<span class="text-danger errbk">' + response.errors['phone'][0] + '</span>')
                    }
                    $('body').addClass('loaded');
                }
                else if (response.status_code == 401)
                {
                    $('body').addClass('loaded');
                    M.toast({
                        html: 'No token available!',
                        classes: "toast-error"
                    });
                }
                else {
                    $('#modal1').modal('close');
                    $('#phone').val(null);
                    $('#email').val(null);
                    $('#name').val(null);
                    $('body').addClass('loaded');
                    M.toast({
                        html: 'something went wrong',
                        classes: "toast-error"
                    });
                }
            },
            error: function() {
                $('body').addClass('loaded');
                $('#modal1').modal('close');
                M.toast({
                    html: 'something went wrong',
                    classes: "toast-error"
                });
            }
        });
    }
    function checkMrn()
    {
        $('#mrn_loader').html('');
        $('#invalid_mrn').html('');
        var loaderGif='<div id="mrnpageLoader" style="text-align:center;"><img src="{{ asset('storage/page_loader.gif')}}"></div>';
        var mrn_no=$('#name').val();
        $('#mrn_loader').html(loaderGif);
        $.ajax({
            type:'POST',
            url:'{{route('check-patient-mrn')}}',
            data:{'mrn_no':mrn_no,"_token": "{{ csrf_token() }}"},
            success:function(response){
                $('#mrn_loader').html('');
                $('#mrn_data').attr('style','display:block;text-align:left;');
                console.log(response);
                if(response==false)
                {
                    $('#modal_button').addClass('disabled');
                    $('#invalid_mrn').attr('style','display:block;text-align:left;');
                    $('#valid_mrn').attr('style','display:none');
                    $('#invalid_mrn').html('<h2 style="color: red;">Invalid MRN Number.</h2>');
                }else{
                    $('#valid_mrn').attr('style','display:block;text-align:left;');
                    $('#invalid_mrn').attr('style','display:none');

                    $('#modal_button').removeClass('disabled');

                    $('#mrn_name').html(response.patient_name);
                    $('#mrn_gender').html(response.gender);
                    $('#mrn_national_id').html(response.nationalID);
                    $('#mrn_age').html(response.age);

                    $('#first_name_en').val(response.firstNameEn);
                    $('#middle_name_en').val(response.middleNameEn);
                    $('#last_name_en').val(response.lastNameEn);
                    $('#first_name_ar').val(response.firstNameAr);
                    $('#middle_name_ar').val(response.middleNameAr);
                    $('#last_name_ar').val(response.lastNameAr);
                    $('#gender').val(response.gender);
                    $('#national_id').val(response.nationalID);
                    $('#dob').val(response.dob);
                    $('#mobile_no').val(response.mobile);
                    $('#mrn_no').val(response.mrN_Number);
                }
            }
        });
    }
</script>
@endsection()
