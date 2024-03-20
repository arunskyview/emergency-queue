const { forEach } = require("lodash");

if (document.getElementById("call-page-sidebar")) {
    var app = {
        data() {
            return {
                tokens_for_next_to_call: [],
                called_tokens: [],
                called_tokens_timer: [],
                called_tokens_timer_second: [],
                isCalled: false,
                show_next_to_call: false,
                show_called: false,
                loader: false,
                call_page: window.JLToken?.call_page_loaded ?? false,
                date: window.JLToken?.date ?? null,
                menu: false,
                category_times: 0,
                timer:null,
                globalVar: 0,
                timer_interval: 0,
                time_after_called:0,
            }
        },
        methods: {

            callNext(id,service_id) {
                this.enableLoader();

                if (this.tokens_for_next_to_call.length) {
                    const data = {
                        queue_id: id,
                        service_id: service_id,
                        by_id: true,
                    }
                    axios.post(window?.JLToken.call_next_url, data).then(res => {
                        if (res.data && res.data.status_code && res.data.status_code == 500) {
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                        }
                        else if (res.data && res.data?.no_token_found && res.data.no_token_found == true) {
                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.alredy_called_lang, timeRemaining: 20, classes: "toast-error" });
                        }
                        else if (res.data) {
                            this.tokens_for_next_to_call = this.tokens_for_next_to_call.filter(element => element.id != id);
                            this.called_tokens.unshift(res.data);
                            window.jlTokenCallPageApp.getTokenForCall();
                            this.isCalled = true;
                            M.toast({ html: window?.JLToken?.called_lang });
                        }
                    })
                        .catch(err => {

                            this.disableLoader();
                            M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                        })
                } else {
                    this.disableLoader();
                    M.toast({ html: window?.JLToken?.no_ticket_lang });
                }
            },

            recallToken(id) {
                this.enableLoader();
                const data = {
                    call_id: id
                }
                axios.post(window.JLToken.recall_token_url, data).then(res => {
                    if (res.data && res.data.status_code && res.data.status_code == 500) {
                        this.disableLoader();
                        M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                    }
                    else {
                        this.called_tokens = this.called_tokens.filter(element => element.id != id);
                        this.called_tokens.unshift(res.data);
                        this.isCalled = true;
                        window.jlTokenCallPageApp.getTokenForCall();
                        M.toast({ html: window?.JLToken?.recalled_lang });
                    }
                }).catch(err => {
                    this.disableLoader();
                    M.toast({ html: window?.JLToken?.error_lang, classes: "toast-error" });
                })
            },
            getTokensFromFile() {

                axios.get(`${window?.JLToken.get_tokens_from_file}?time=${new Date().getTime()}`).then(res => {
                    if (res.data && res.data.called_tokens && res.data.tokens_for_call && this.date && window.JLToken.selectedService && window.JLToken.selectedCounter) {
                        if ((res.data.called_tokens.length && moment(res.data.called_tokens[0].started_at).format('YYYY-MM-DD') == this.date) || (res.data.tokens_for_call.length && moment(res.data.tokens_for_call[0].created_at).format('YYYY-MM-DD') == this.date)) {
                            // this.called_tokens = res.data.called_tokens.filter(val => val.service_id == window.JLToken.selectedService.id && val.counter_id == window.JLToken.selectedCounter.id);

                            this.called_tokens = res.data.called_tokens.filter(val =>{ return window.JLToken.selectedService.includes(val.service_id);});

                            // this.tokens_for_next_to_call = res.data.tokens_for_call.filter(val => val.service_id == window.JLToken.selectedService.id);
                            this.tokens_for_next_to_call = res.data.tokens_for_call.filter(val => {
                                return window.JLToken.selectedService.includes(val.service_id);
                            });
                            // this.tokens_for_next_to_call = res.data.tokens_for_call
                            this.updateValues();
                            // this.showCategoryTimer();
                            //this.setDataForTimers(this.called_tokens);
                        }

                    }
                    setTimeout(() => {
                        this.getTokensFromFile();
                    }, 1000)

                })
                    .catch(err => {
                    })
            },

            updateValues() {
                if (this.called_tokens.length && this.called_tokens[0] && this.called_tokens[0].ended_at == null) {
                    this.isCalled = true;
                } else if (this.called_tokens && this.called_tokens.length && this.called_tokens[0]) {

                    this.isCalled = false;
                } else {
                    this.isCalled = false;
                }

            },

            showNextToCall() {
                this.show_next_to_call = !this.show_next_to_call;
                if (this.show_called && this.show_next_to_call) this.show_called = false;
            },

            showCalled() {
                this.show_called = !this.show_called;
                if (this.show_called && this.show_next_to_call) this.show_next_to_call = false;
            },
            disableLoader() {
                $('body').addClass('loaded');
            },
            enableLoader() {
                $('body').removeClass('loaded');
            },
            closeRightMenu() {
                let edge = (window.JLToken.current_lang == 'sa') ? 'left' : 'right';
                var elems = document.querySelectorAll('.sidenav');
                var instance = M.Sidenav.init(elems[1], { dismissible: true, edge: edge });
                instance.close();
            },
            showCategoryTimer() {
                    // var old_token=this.called_tokens;
                    // this.time_after_called = 0;
                    // $.each(old_token,function(key,value){
                    //     if(value.status=='RECALL')
                    //     {
                    //         const postdata = {
                    //             ended_at: value.ended_at,
                    //             category_time:value.category_time
                    //         }
                    //         axios.post(window?.JLToken.get_server_timer,postdata).then(res => {
                    //             console.log(res.data)
                    //             this.timer=res.data
                    //         })
                    //     }
                    // })
                    const oldTokens = this.called_tokens;
                        this.time_after_called = 0;

                        oldTokens.forEach((value, index) => {
                            if (value.status === 'RECALL') {
                            const postdata = {
                                ended_at: value.ended_at,
                                category_time: value.category_time,
                                id: value.queue_id
                            };
                            const ids=value.id;
                            axios.post(window?.JLToken.get_server_timer, postdata)
                                .then(res => {
                                // console.log(res.data.with_second);
                                this.timer = res.data;
                                const new_id=res.data.id;
                                // this.called_tokens_timer.push(res.data);

                                // this.called_tokens_timer.splice(index,1, res.data.without_second);
                                // this.called_tokens_timer_second.splice(index,1, res.data.with_second);

                                this.called_tokens_timer[new_id]= res.data.without_second;
                                this.called_tokens_timer_second[new_id]= res.data.with_second;

                                //console.log(this.called_tokens_timer_second);
                                })
                                .catch(error => {
                                console.error("Error:", error);
                                });
                            }
                        });

                    setTimeout(() => {
                        this.showCategoryTimer();
                    }, 1000)
            },
        },
        mounted() {

            this.showCategoryTimer();
            if (this.call_page) {
                this.menu = true;
                this.getTokensFromFile()
                this.showNextToCall();
            } else {
                $('#side-menu-icon').css('display', 'none');
                $('#side-menu-icon-attachment').css('display', 'none');
            }

        },
    };
    window.jlTokenCallLayoutApp = Vue.createApp(app).mount('#mount')

}
