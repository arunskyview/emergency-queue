const { forEach } = require("lodash");

if (document.getElementById("call-page")) {
    var app = {
        data() {
            return {
                token: null,
                selectedMultiService: window.JLToken?.selectedMultiService,
                selected_service: window.JLToken?.selectedService,
                selected_counter: window.JLToken?.selectedCounter,
                selected_service_data: window.JLToken?.service_data,
                service_id: null,
                selectedServices: [],
                counter_id: null,
                dataLoaded: false,
                services: window.JLToken?.services,
                counters: window.JLToken?.counters,
                isCalled: false,
                callNextClicked: false,
                servedClicked: false,
                noshowClicked: false,
                recallClicked: false,
                openCategoryClicked: false,
                called_tokens: [],
                tokens_for_next_to_call: [],
                called_tokens_timer:[],
                count: '0',
                time_after_called: null,
                timer_interval: null,
                current_lang: window.JLToken?.current_lang,
                font_size_smaller: (window.JLToken?.current_lang == 'gb' || window.JLToken?.current_lang == 'sa') ? false : true,
                categories: {
                    '30': 'CAT 3',
                    '60': 'CAT 4',
                    '120': 'CAT 5'
                  },
                status: [
                    'SEND TO DOCTOR',
                    'RECALL'
                ],
                category_id: null,
                status_id: null,
                category_time:0,
                category_color:''
            }
        },
        methods: {
            setCategoryTime(category_button){
                // console.log()
                for (const duration in this.categories) {
                    if (this.categories.hasOwnProperty(duration)) {
                    //   if (this.categories[duration] === this.category_id) {
                        if (this.categories[duration] === category_button) {
                            this.category_id=category_button;
                            if(category_button=='CAT 3')
                            {
                                this.category_color='#ff0000';
                            }
                            if(category_button=='CAT 4')
                            {
                                this.category_color='#ff8100fa';
                            }
                            if(category_button=='CAT 5')
                            {
                                this.category_color='#fff705fa';
                            }
                        this.category_time=duration;
                        Swal.fire({
                            showConfirmButton: false,
                            timer: 600,
                            customClass: 'swal-wide',
                            html: '<h1 style="color:#000; font-size:70px">Time</h1><h3 style="font-size:40px">' + duration + ' minutes</h3>',
                        });
                      }
                    }
                  }
            },
            setStatus(status_button)
            {
                this.status_id=status_button;
            },
            setService() {
                this.closeSetServiceModal();
                this.enableLoader();
                this.checkSetServiceForm();
                if (this.setServiceFormValid) {
                    const data = {
                        service_id: this.service_id,
                        counter_id: this.counter_id,
                        all_selected_service:this.selectedServices,
                    }
                    axios.post(window.JLToken.set_service_counter_url, data).then(res => {

                        if (res.data && res.data.already_exists && res.data.already_exists == true) {
                            this.disableLoader();
                            this.openSetServiceModal();
                            M.toast({ html: window?.JLToken?.alredy_selected_lang, classes: "toast-error" });

                        }
                        else {
                            this.token = null;
                            this.selected_service_data = res.data.service_data;
                            this.selected_service = res.data.service;
                            this.selected_counter = res.data.counter;
                            window.JLToken.selectedService = res.data.service;
                            window.JLToken.selectedCounter = res.data.counter;
                            this.tokens_for_next_to_call = res.data.tokens_for_call;
                            this.called_tokens = res.data.called_tokens;
                            if (this.called_tokens.length && this.called_tokens[0] && this.called_tokens[0].ended_at == null) {
                                this.isCalled = true;
                                this.token = this.called_tokens[0];
                                this.setDataForTimer(this.token);
                            } else if (this.called_tokens && this.called_tokens.length) {
                                this.token = this.called_tokens[0];
                                this.isCalled = false;
                            }
                            else this.isCalled = false;
                            this.disableLoader();
                        }

                    })
                        .catch(err => {
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                        })
                }
            },
            checkSetServiceForm() {
                if (this.service_id && this.counter_id) {

                    this.setServiceFormValid = true;
                }
                this.setServiceFormValid = true;
            },
            openSetServiceModal() {
                $('.modal').modal({
                    dismissible: false
                });
                $('#select-service').modal('open');
            },
            closeSetServiceModal() {
                $('#select-service').modal('close');
            },
            openCategoryModal(id) {
                $('.modal').modal({
                    dismissible: false
                });
                const data = {
                    token_id: id,
                }
                this.enableLoader();
                axios.post(window.JLToken.get_token_category_status_url, data).then(res => {
                    this.category_id=res.data.category;
                    this.disableLoader();
                    if(res.data.category=='CAT 3')
                    {
                        this.category_time=30;
                        this.category_color='#ff0000';
                    }
                    if(res.data.category=='CAT 4')
                    {
                        this.category_time=60;
                        this.category_color='#ff8100fa';
                    }
                    if(res.data.category=='CAT 5')
                    {
                        this.category_time=120;
                        this.category_color='#fff705fa';
                    }
                    this.status_id=res.data.status;
                }).catch(err => {
                    this.isCalled = false;
                    this.openCategoryClicked= true;
                    this.disableLoader();
                    M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                })
                $('#select-category').modal('open');
            },
            closeCategoryModal() {
                $('#select-category').modal('close');
            },
            setCategory(id)
            {
                this.isCalled= false;
                this.openCategoryClicked= false;
                this.enableLoader();
                const data = {
                    token_id: id,
                    category:this.category_id,
                    status:this.status_id,
                    category_time:this.category_time
                }
console.log('tt'+this.category_time);
                if(this.category_id==null)
                {
                    M.toast({ html: 'Please select category.', classes: "toast-error"});
                    this.disableLoader();
                    this.isCalled = false;
                    this.openCategoryClicked= false;
                }
                else if(this.status_id ==null)
                {
                    M.toast({ html: 'Please select  status.', classes: "toast-error"});
                    this.disableLoader();
                    this.isCalled = false;
                    this.openCategoryClicked= false;
                }else if(this.category_time =='')
                {
                    M.toast({ html: 'Please select category for duration.', classes: "toast-error"});
                    this.disableLoader();
                    this.isCalled = false;
                    this.openCategoryClicked= false;
                }
                else{
                    this.enableLoader();
                    axios.post(window.JLToken.change_category_url, data).then(res => {
                        if (res.data && res.data.status_code && res.data.status_code == 500) {
                            this.openCategoryClicked= true;
                            this.disableLoader();
                            this.closeCategoryModal();
                            M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                        }
                        else if (res.data && res.data.already_executed && res.data.already_executed == true) {
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.alredy_used_lang, classes: "toast-error" });
                        } else {
                            this.called_tokens = this.called_tokens.filter(element => element.id != id);
                            this.token = res.data;
                            this.isCalled = false;
                            this.openCategoryClicked= false;
                            this.called_tokens.unshift(res.data);
                            this.disableLoader();
                            $('#select-category').modal('close');
                            M.toast({ html: 'Category set' });
                        }
                    }).catch(err => {
                        this.isCalled = false;
                        this.openCategoryClicked= true;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    })
                }

            },
            getTokenForCall() {

                axios.get(window.JLToken.get_token_for_call_url).then(res => {
                    this.token = null;
                    this.tokens_for_next_to_call = res.data.tokens_for_call;
                    this.called_tokens = res.data.called_tokens;

                    if (this.called_tokens.length && this.called_tokens[0] && this.called_tokens[0].ended_at == null) {
                        this.token = this.called_tokens[0];
                        this.setDataForTimer(this.token);
                        this.isCalled = true;
                    } else if (this.called_tokens && this.called_tokens.length && this.called_tokens[0]) {

                        this.token = this.called_tokens[0];
                        this.isCalled = false;
                    } else {
                        this.isCalled = false;
                    }
                    this.disableLoader();
                })
                    .catch(err => {
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    })
            },
            callNext(id) {
                // console.log('aa'+id);
                this.enableLoader();
                this.callNextClicked = true;
                this.openCategoryClicked=false;
                const data = {
                    //service_id: this.selected_service.id,
                    counter_id: this.selected_counter.id,
                    by_id: true,
                    queue_id: id,
                }
                axios.post(window.JLToken.call_next_url, data).then(res => {
                    if (res.data) {
                        if (res.data.no_token_found && res.data.no_token_found == true) {
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.no_ticket_lang, timeRemaining: 20 });
                        } else if (res.data && res.data.status_code && res.data.status_code == 500) {
                            this.isCalled = false;
                            this.callNextClicked = false;
                            this.openCategoryClicked=false;
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                        } else {
                            this.tokens_for_next_to_call = this.tokens_for_next_to_call.filter(element => element.id != this.tokens_for_next_to_call[0].id);
                            this.called_tokens.unshift(res.data);
                            this.token = res.data;
                            this.setDataForTimer(this.token);

                            this.isCalled = true;
                            this.openCategoryClicked=false;
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.called_lang });
                        }
                        this.callNextClicked = false;
                        this.openCategoryClicked=false;

                    }
                })
                    .catch(err => {
                        this.isCalled = false;
                        this.callNextClicked = false;
                        this.openCategoryClicked=false;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    })
            },
            serveToken(id) {
                this.enableLoader();
                this.servedClicked = true;
                const data = {
                    call_id: id
                }

                axios.post(window.JLToken.serve_token_url, data).then(res => {
                    if (res.data && res.data.status_code && res.data.status_code == 500) {
                        this.servedClicked = false;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    }
                    else if (res.data && res.data.already_executed && res.data.already_executed == true) {
                        this.servedClicked = false;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.alredy_used_lang, classes: "toast-error" });
                    } else {
                        this.called_tokens = this.called_tokens.filter(element => element.id != id);
                        this.token = res.data;
                        this.called_tokens.unshift(res.data);
                        this.isCalled = false;
                        this.servedClicked = false;
                        this.disableLoader();
                        M.toast({ html: 'Served' });
                    }

                }).catch(err => {
                    this.servedClicked = false;
                    this.disableLoader();
                    M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                })
            },
            noShowToken(id) {
                this.enableLoader();
                this.noshowClicked = true;
                const data = {
                    call_id: id
                }
                axios.post(window.JLToken.noshow_token_url, data).then(res => {
                    if (res.data && res.data.status_code && res.data.status_code == 500) {
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                        this.noshowClicked = false;
                    }
                    else if (res.data && res.data.already_executed && res.data.already_executed == true) {
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.alredy_used_lang, classes: "toast-error" });
                        this.noshowClicked = false;
                    }
                    else {
                        this.token = res.data;

                        this.called_tokens = this.called_tokens.filter(element => element.id != id);

                        this.called_tokens.unshift(res.data);

                        this.isCalled = false;
                        this.noshowClicked = false;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.noshow_lang });
                    }

                }).catch(err => {
                    this.disableLoader();
                    M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    this.noshowClicked = false;
                })
            },
            recallToken(id) {
                this.enableLoader();
                this.recallClicked = true;
                this.openCategoryClicked=false;
                const data = {
                    call_id: id
                }
                axios.post(window.JLToken.recall_token_url, data).then(res => {
                    if (res.data && res.data.status_code == 500) {
                        this.recallClicked = false;
                        this.isCalled = true;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    }
                    else {
                        this.called_tokens = this.called_tokens.filter(element => element.id != id);
                        this.called_tokens.unshift(res.data);
                        this.token = res.data;
                        this.setDataForTimer(this.token);
                        this.recallClicked = false;
                        this.openCategoryClicked=false;
                        this.isCalled = true;
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.recalled_lang });
                    }
                }).catch(err => {
                    this.recallClicked = false;
                    this.isCalled = true;
                    this.disableLoader();
                    M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                })
            },

            enableLoader() {
                $('body').removeClass('loaded');
            },

            disableLoader() {
                $('body').addClass('loaded');
            },
            timer() {
                this.timer_interval = setInterval(() => {
                    if (parseInt(this.count) <= 0) {
                        clearInterval();
                        return;
                    }
                    this.time_after_called = this.toHHMMSS(this.count);
                    this.count = (parseInt(this.count) + 1).toString();
                }, 1000)
            },

            toHHMMSS(count) {
                var sec_num = parseInt(count, 10);
                var hours = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                var time = hours + ':' + minutes + ':' + seconds;
                return time;
            },

            setDataForTimer(token) {
                if (this.timer_interval) clearInterval(this.timer_interval);
                this.time_after_called = null;
                this.count = token.counter_time;
                if (token.counter_time == 0 && token.started_at && token.ended_at == null) this.count = '1';
                this.timer();
            },


            hideMainMenu() {
                var openLength = $(".collapsible .open").children().length;
                $(".sidenav-main.nav-collapsible, .navbar .nav-collapsible")
                    .addClass("nav-collapsed")
                    .removeClass("nav-expanded");
                $("#slide-out > li.open > a")
                    .parent()
                    .addClass("close")
                    .removeClass("open");
                setTimeout(function () {
                    // Open only if collapsible have the children
                    if (openLength > 1) {
                        var collapseEl = $(".sidenav-main .collapsible");
                        var collapseInstance = M.Collapsible.getInstance(collapseEl);
                        collapseInstance.close($(".collapsible .close").index());
                    }
                }, 100);
                $(".sidenav-main").removeClass("nav-lock");
                $(".nav-collapsible .navbar-toggler i").text("radio_button_unchecked");
                $(".navbar .nav-collapsible").removeClass("sideNav-lock");
                $('#main').addClass('main-full');
            }
        },
        mounted() {
            this.hideMainMenu();
            //open right nav
            document.addEventListener('DOMContentLoaded', function () {
                var elems = document.querySelectorAll('.sidenav');
                var instance = M.Sidenav.init(elems[1], {
                    edge: "right",
                    draggable: false,
                    closeOnClick: true
                });
                instance.open();
            });

            //show menu on mouse enter
            $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").mouseenter(function () {
                $(".sidenav-main.nav-collapsible, .navbar .nav-collapsible")
                    .addClass("nav-expanded")
                    .removeClass("nav-collapsed");
                $("#slide-out > li.close > a")
                    .parent()
                    .addClass("open")
                    .removeClass("close");
                setTimeout(function () {
                    // Open only if collapsible have the children
                    if ($(".collapsible .open").children().length > 1) {
                        var collapseEl = $(".sidenav-main .collapsible");
                        var collapseInstance = M.Collapsible.getInstance(collapseEl);
                        collapseInstance.open($(".collapsible .open").index());
                    }
                }, 100);
            });
            if (this.selected_service && this.selected_counter) {
                // if (this.selected_counter) {
                this.service_id = this.selected_service.id;
                this.counter_id = this.selected_counter.id;
                this.getTokenForCall();
            }
            else {
                if(JSON.parse(this.selectedMultiService).length >0)
                {
                    this.getTokenForCall();
                }
                this.disableLoader();
                this.openSetServiceModal();
            }
        },
    };
    window.jlTokenCallPageApp = Vue.createApp(app).mount('#call-page')

}
