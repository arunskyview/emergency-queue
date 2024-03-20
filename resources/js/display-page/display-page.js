const { forEach } = require("lodash");

if (document.getElementById("display-page")) {
    var app = {
        data() {
            return {
                time_out: null,
                tokens: [],
                tokens1: [],
                tokens2: [],
                tokens3: [],
                today: window?.JLToken.date_for_display ?? null,
                queue: [],
                queue1: [],
                queue2: [],
                queue3: [],
                isProcessing: false,
                isPlaying: false,
                from_first: true,
                previous_data: [],
                response_data: [],
                previous_data1: [],
                response_data1: [],
                previous_data2: [],
                response_data2: [],
                previous_data3: [],
                response_data3: [],

                called_tokens: [],
                tokens_for_next_to_call1: [],
                tokens_for_next_to_call2: [],
                tokens_for_next_to_call3: [],
                date: window.JLToken?.date_for_display ?? null,
                audio: window?.JLToken.audioEl,
                token_for_sound: null
            }
        },
        methods: {
            getTokens() {
                axios.get(`${window?.JLToken.get_tokens_for_display_url}?time=${new Date().getTime()}`).then(res => {

                    if (!this.from_first && res.data && res.data.length && res.data[0].called_date == this.today) {
                        this.response_data = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        if (JSON.stringify(this.previous_data) == JSON.stringify(this.response_data)) {
                            this.previous_data = this.response_data;
                            this.time_out = setTimeout(() => {
                                this.processQueue();
                                this.getTokens();
                            }, 1000)
                        } else {
                            this.previous_data = this.response_data;
                            this.queue.push(res.data);
                            this.processQueue();
                            this.time_out = setTimeout(() => {
                                this.getTokens();
                            }, 1000)
                        }
                    }
                    else if (this.from_first && res.data && res.data.length && res.data[0].called_date == this.today) {

                        this.tokens = res.data;
                        this.disableLoader();
                        this.previous_data = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokens();
                        }, 1000)
                    }
                    else {

                        this.disableLoader();
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokens();
                        }, 1000)
                    }

                })
                    .catch(err => {
                        this.disableLoader();
                        this.time_out = setTimeout(() => {
                            this.getTokens();
                        }, 1000)
                    })
            },

            processQueue() {

                if (!this.isProcessing && !this.isPlaying && this.queue.length) {
                    this.isProcessing = true;
                    if (this.queue.length && (this.queue[0][0]?.id != this.tokens[0]?.id && this.tokens[0]?.token_letter == this.queue[0][0]?.token_letter && this.tokens[0]?.token_number == this.queue[0][0]?.token_number)) {
                        this.tokens = this.queue[0];

                        this.queue.shift();
                        if (this.tokens[0].call_status_id == null) {
                            this.playAudio(this.tokens[0]);
                            this.popup(this.tokens[0])
                        }
                    }
                    else if (this.queue.length && ((this.queue[0][0].id != this.tokens[0]?.id) || (this.tokens == null && this.queue[0][0].call_status_id == null))) {

                        this.tokens = this.queue[0];
                        this.queue.shift();

                        if (this.tokens[0].call_status_id == null) {
                            this.playAudio(this.tokens[0]);
                            this.popup(this.tokens[0])
                        }
                    }
                    else {

                        this.tokens = this.queue[0];
                        this.queue.shift();
                    }
                    this.isProcessing = false;
                }

            },
            //// first
            getTokensFirst() {
                axios.get(`${window?.JLToken.get_tokens_for_display_first_url}?time=${new Date().getTime()}`).then(res => {

                    if (!this.from_first && res.data && res.data.length && res.data[0].called_date == this.today && ((res.data[0].status != 'RECALL' && res.data[0].is_recall != 1) || ((res.data[0].re_call_status_id==2 && res.data[0].ended_at !=null ) && res.data[0].is_recall==1))) {
                        this.response_data1 = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        if (JSON.stringify(this.previous_data1) == JSON.stringify(this.response_data1)) {
                            this.previous_data1 = this.response_data1;
                            this.time_out = setTimeout(() => {
                                this.processQueue1();
                                this.getTokensFirst();
                            }, 1000)
                        } else {
                            this.previous_data1 = this.response_data1;
                            this.queue1.push(res.data);
                            this.processQueue1();
                            this.time_out = setTimeout(() => {
                                this.getTokensFirst();
                            }, 1000)
                        }
                    }
                    else if (this.from_first && res.data && res.data.length && res.data[0].called_date == this.today && ((res.data[0].status != 'RECALL' && res.data[0].is_recall != 1) || ((res.data[0].re_call_status_id==2 && res.data[0].ended_at !=null ) && res.data[0].is_recall==1))) {

                        this.tokens1 = res.data;
                        this.disableLoader();
                        this.previous_data1 = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokensFirst();
                        }, 1000)
                    }
                    else {

                        this.disableLoader();
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokensFirst();
                        }, 1000)
                    }

                })
                    .catch(err => {
                        this.disableLoader();
                        this.time_out = setTimeout(() => {
                            this.getTokensFirst();
                        }, 1000)
                    })
            },

            processQueue1() {

                if (!this.isProcessing && !this.isPlaying && this.queue1.length) {
                    this.isProcessing = true;
                    if (this.queue1.length && (this.queue1[0][0]?.id != this.tokens1[0]?.id && this.tokens1[0]?.token_letter == this.queue1[0][0]?.token_letter && this.tokens1[0]?.token_number == this.queue1[0][0]?.token_number)) {
                        this.tokens1 = this.queue1[0];

                        this.queue1.shift();
                        if (this.tokens1[0].call_status_id == null) {
                            this.playAudio(this.tokens1[0]);
                            this.popup(this.tokens1[0])
                        }
                    }
                    else if (this.queue1.length && ((this.queue1[0][0].id != this.tokens1[0]?.id) || (this.tokens1 == null && this.queue1[0][0].call_status_id == null) || ((this.tokens1 == null && this.queue1[0][0].re_call_status_id < 1) || ((this.queue1[0][0].re_call_status_id==2 && this.queue1[0][0].ended_at !=null ) && this.queue1[0][0].is_recall==1)))) {

                        this.tokens1 = this.queue1[0];
                        this.queue1.shift();

                        if (this.tokens1[0].call_status_id == null) {
                            this.playAudio(this.tokens1[0]);
                            this.popup(this.tokens1[0])
                        }
                    }
                    else {

                        this.tokens1 = this.queue1[0];
                        this.queue1.shift();
                    }
                    this.isProcessing = false;
                }
            },
            //// end first
            /// second
            getTokensSecond() {
                axios.get(`${window?.JLToken.get_tokens_for_display_second_url}?time=${new Date().getTime()}`).then(res => {

                    if (!this.from_first && res.data && res.data.length && res.data[0].called_date == this.today && ((res.data[0].status != 'RECALL' && res.data[0].is_recall != 1) || ((res.data[0].re_call_status_id==2 && res.data[0].ended_at !=null ) && res.data[0].is_recall==1))) {
                        this.response_data2 = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        if (JSON.stringify(this.previous_data2) == JSON.stringify(this.response_data2)) {
                            this.previous_data2 = this.response_data2;
                            this.time_out = setTimeout(() => {
                                this.processQueue2();
                                this.getTokensSecond();
                            }, 1000)
                        } else {
                            this.previous_data2 = this.response_data2;
                            this.queue2.push(res.data);
                            this.processQueue2();
                            this.time_out = setTimeout(() => {
                                this.getTokensSecond();
                            }, 1000)
                        }
                    }
                    else if (this.from_first && res.data && res.data.length && res.data[0].called_date == this.today && ((res.data[0].status != 'RECALL' && res.data[0].is_recall != 1) || ((res.data[0].re_call_status_id==2 && res.data[0].ended_at !=null ) && res.data[0].is_recall==1))) {

                        this.tokens2 = res.data;
                        this.disableLoader();
                        this.previous_data2 = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokensSecond();
                        }, 1000)
                    }
                    else {

                        this.disableLoader();
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokensSecond();
                        }, 1000)
                    }

                })
                    .catch(err => {
                        this.disableLoader();
                        this.time_out = setTimeout(() => {
                            this.getTokensSecond();
                        }, 1000)
                    })
            },

            processQueue2() {

                if (!this.isProcessing && !this.isPlaying && this.queue2.length) {
                    this.isProcessing = true;
                    if (this.queue2.length && (this.queue2[0][0]?.id != this.tokens2[0]?.id && this.tokens2[0]?.token_letter == this.queue2[0][0]?.token_letter && this.tokens2[0]?.token_number == this.queue2[0][0]?.token_number)) {
                        this.tokens2 = this.queue2[0];

                        this.queue2.shift();
                        if (this.tokens2[0].call_status_id == null) {
                            this.playAudio(this.tokens2[0]);
                            this.popup(this.tokens2[0])
                        }
                    }
                    else if (this.queue2.length && ((this.queue2[0][0].id != this.tokens2[0]?.id) || (this.tokens2 == null && this.queue2[0][0].call_status_id == null) || ((this.tokens2 == null && this.queue2[0][0].re_call_status_id < 1) || ((this.queue2[0][0].re_call_status_id==2 && this.queue2[0][0].ended_at !=null ) && this.queue2[0][0].is_recall==1)))) {

                        this.tokens2 = this.queue2[0];
                        this.queue2.shift();

                        if (this.tokens2[0].call_status_id == null) {
                            this.playAudio(this.tokens2[0]);
                            this.popup(this.tokens2[0])
                        }
                    }
                    else {

                        this.tokens2 = this.queue2[0];
                        this.queue2.shift();
                    }
                    this.isProcessing = false;
                }

            },
            //// end second

            /// third
            getTokensThird() {
                axios.get(`${window?.JLToken.get_tokens_for_display_third_url}?time=${new Date().getTime()}`).then(res => {

                    if (!this.from_first && res.data && res.data.length && res.data[0].called_date == this.today && ((res.data[0].status != 'RECALL' && res.data[0].is_recall != 1) || ((res.data[0].re_call_status_id==2 && res.data[0].ended_at !=null ) && res.data[0].is_recall==1))) {
                        this.response_data3 = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        if (JSON.stringify(this.previous_data3) == JSON.stringify(this.response_data3)) {
                            this.previous_data3 = this.response_data3;
                            this.time_out = setTimeout(() => {
                                this.processQueue3();
                                this.getTokensThird();
                            }, 1000)
                        } else {
                            this.previous_data3 = this.response_data3;
                            this.queue3.push(res.data);
                            this.processQueue3();
                            this.time_out = setTimeout(() => {
                                this.getTokensThird();
                            }, 1000)
                        }
                    }
                    else if (this.from_first && res.data && res.data.length && res.data[0].called_date == this.today && ((res.data[0].status != 'RECALL' && res.data[0].is_recall != 1) || ((res.data[0].re_call_status_id==2 && res.data[0].ended_at !=null ) && res.data[0].is_recall==1))) {

                        this.tokens3 = res.data;
                        this.disableLoader();
                        this.previous_data3 = res.data.map(res => {
                            delete res.counter_time;
                            return res;
                        });
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokensThird();
                        }, 1000)
                    }
                    else {

                        this.disableLoader();
                        this.from_first = false;
                        this.time_out = setTimeout(() => {
                            this.getTokensThird();
                        }, 1000)
                    }

                })
                    .catch(err => {
                        this.disableLoader();
                        this.time_out = setTimeout(() => {
                            this.getTokensThird();
                        }, 1000)
                    })
            },

            processQueue3() {

                if (!this.isProcessing && !this.isPlaying && this.queue3.length) {
                    this.isProcessing = true;
                    if (this.queue3.length && (this.queue3[0][0]?.id != this.tokens3[0]?.id && this.tokens3[0]?.token_letter == this.queue3[0][0]?.token_letter && this.tokens3[0]?.token_number == this.queue3[0][0]?.token_number)) {
                        this.tokens3 = this.queue3[0];

                        this.queue3.shift();
                        if (this.tokens2[0].call_status_id == null) {
                            this.playAudio(this.tokens3[0]);
                            this.popup(this.tokens3[0])
                        }
                    }
                    else if (this.queue3.length && ((this.queue3[0][0].id != this.tokens3[0]?.id) || (this.tokens3 == null && this.queue3[0][0].call_status_id == null) || ((this.tokens3 == null && this.queue3[0][0].re_call_status_id < 1) || ((this.queue3[0][0].re_call_status_id==2 && this.queue3[0][0].ended_at !=null ) && this.queue3[0][0].is_recall==1)))) {

                        this.tokens3 = this.queue3[0];
                        this.queue3.shift();

                        if (this.tokens3[0].call_status_id == null) {
                            this.playAudio(this.tokens3[0]);
                            this.popup(this.tokens3[0])
                        }
                    }
                    else {

                        this.tokens3 = this.queue3[0];
                        this.queue3.shift();
                    }
                    this.isProcessing = false;
                }
            },
            //// end third

            //// first token list
            getTokensFromFile1() {
                axios.get(`${window?.JLToken.get_tokens_from_file1}?time=${new Date().getTime()}`).then(res => {
                    if (res.data && res.data.called_tokens && res.data.tokens_for_call && this.date && window.JLToken.selectedService1) {
                        if ((res.data.called_tokens.length && moment(res.data.called_tokens[0].started_at).format('YYYY-MM-DD') == this.date) || (res.data.tokens_for_call.length && moment(res.data.tokens_for_call[0].created_at).format('YYYY-MM-DD') == this.date)) {
                            this.called_tokens = res.data.called_tokens.filter(val => val.service_id == window.JLToken.selectedService1);
                            this.tokens_for_next_to_call1 = res.data.tokens_for_call.filter(val => val.service_id == window.JLToken.selectedService1);
                            // this.tokens_for_next_to_call1 = res.data.tokens_for_call
                            this.updateValues1();
                        }
                    }
                    setTimeout(() => {
                        this.getTokensFromFile1();
                    }, 1000)

                })
                    .catch(err => {
                    })
            },
            //// end first token list
            //// second token list
            getTokensFromFile2() {
                axios.get(`${window?.JLToken.get_tokens_from_file1}?time=${new Date().getTime()}`).then(res => {
                    if (res.data && res.data.called_tokens && res.data.tokens_for_call && this.date && window.JLToken.selectedService2) {
                        if ((res.data.called_tokens.length && moment(res.data.called_tokens[0].started_at).format('YYYY-MM-DD') == this.date) || (res.data.tokens_for_call.length && moment(res.data.tokens_for_call[0].created_at).format('YYYY-MM-DD') == this.date)) {
                            this.called_tokens = res.data.called_tokens.filter(val => val.service_id == window.JLToken.selectedService2);
                            this.tokens_for_next_to_call2 = res.data.tokens_for_call.filter(val => val.service_id == window.JLToken.selectedService2);
                            // this.tokens_for_next_to_call2 = res.data.tokens_for_call
                            this.updateValues1();
                        }
                    }
                    setTimeout(() => {
                        this.getTokensFromFile2();
                    }, 1000)

                })
                    .catch(err => {
                    })
            },
            //// end second token list
            //// third token list
            getTokensFromFile3() {
                axios.get(`${window?.JLToken.get_tokens_from_file1}?time=${new Date().getTime()}`).then(res => {
                    if (res.data && res.data.called_tokens && res.data.tokens_for_call && this.date && window.JLToken.selectedService3) {
                        if ((res.data.called_tokens.length && moment(res.data.called_tokens[0].started_at).format('YYYY-MM-DD') == this.date) || (res.data.tokens_for_call.length && moment(res.data.tokens_for_call[0].created_at).format('YYYY-MM-DD') == this.date)) {
                            this.called_tokens = res.data.called_tokens.filter(val => val.service_id == window.JLToken.selectedService3);
                            this.tokens_for_next_to_call3 = res.data.tokens_for_call.filter(val => val.service_id == window.JLToken.selectedService3);
                            // this.tokens_for_next_to_call3 = res.data.tokens_for_call
                            this.updateValues1();
                        }
                    }
                    setTimeout(() => {
                        this.getTokensFromFile3();
                    }, 1000)

                })
                    .catch(err => {
                    })
            },
            //// end third token list
            updateValues1() {
                if (this.called_tokens.length && this.called_tokens[0] && this.called_tokens[0].ended_at == null) {
                    this.isCalled = true;
                } else if (this.called_tokens && this.called_tokens.length && this.called_tokens[0]) {

                    this.isCalled = false;
                } else {
                    this.isCalled = false;
                }
            },


            disableLoader() {
                $('body').addClass('loaded');
            },

            popup(token) {
                if(token.status==null)
                {
                    Swal.fire({
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: 'swal-wide',
                        html: '<h1 style="color:#000; font-size:70px">' + token.token_letter + '-' + token.token_number + '</h1><h3 style="font-size:40px">' + token.counter.name + '</h3>',
                    });
                }
            },
            playAudio(token) {
                if(token.status==null)
                {
                    let promise = this.audio.play();


                    if (promise !== undefined) {
                        promise.then(_ => {
                            this.isPlaying = true;
                            this.token_for_sound = token
                        }).catch(error => {
                            this.processQueue();
                        });
                    }
                }

            }
        },
        mounted() {
            this.audio.addEventListener("ended", () => {
                if (this.token_for_sound) {
                    let voice = `${window?.JLToken?.voice_content_one} ${this.token_for_sound.token_letter.toString().split('').join(' ')} ${this.token_for_sound.token_number.toString().split('').join(' ')} ${window?.JLToken?.voice_content_two} ${this.token_for_sound.counter.name}`;
                    responsiveVoice.speak(voice, window?.JLToken?.voice_type, {
                        rate: 0.75,
                        onend: () => {
                            this.token_for_sound = null;
                            this.isPlaying = false;
                            this.processQueue()
                        }
                    });
                }
            });
            //this.getTokens();
            this.getTokensFirst();
            this.getTokensSecond();
            this.getTokensThird();
            this.getTokensFromFile1();
            this.getTokensFromFile2();
            this.getTokensFromFile3();
        },

        unmounted() {
            clearInterval(this.time_out);
        }
    };
    Vue.createApp(app).mount('#display-page')

}
