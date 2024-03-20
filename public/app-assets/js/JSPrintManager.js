/*! JSPrintManager v6.0.3 (https://neodynamic.com/products/printing/js-print-manager) | Requires JSPrintManager Client App (https://neodynamic.com/downloads/jspm) | (c) Neodynamic (https://neodynamic.com) */ ! function(e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSPM = e()
}(function() {
    return function n(i, o, a) {
        function s(t, e) {
            if (!o[t]) {
                if (!i[t]) {
                    var r = "function" == typeof require && require;
                    if (!e && r) return r(t, !0);
                    if (u) return u(t, !0);
                    throw (r = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", r
                }
                r = o[t] = {
                    exports: {}
                }, i[t][0].call(r.exports, function(e) {
                    return s(i[t][1][e] || e)
                }, r, r.exports, n, i, o, a)
            }
            return o[t].exports
        }
        for (var u = "function" == typeof require && require, e = 0; e < a.length; e++) s(a[e]);
        return s
    }({
        1: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.BTComm = void 0;
            var a = e("./JSPrintManager"),
                e = (Object.defineProperty(n.prototype, "timeout", {
                    get: function() {
                        return this._timeout
                    },
                    set: function(e) {
                        this._timeout = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "receiveBufferSize", {
                    get: function() {
                        return this._receiveBufferSize
                    },
                    set: function(e) {
                        this._receiveBufferSize = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), n.prototype.onError = function(e, t) {}, n.prototype.onDataReceived = function(e) {}, n.prototype._onDataReceived = function(e) {
                    this.onDataReceived(e.data)
                }, n.prototype.onClose = function(e) {}, n.prototype.connect = function() {
                    var o = this;
                    return new Promise(function(n, i) {
                        var e = o.propertiesJSON();
                        e.on_update = function(e, t, r) {
                            t ? n(e) : r ? (o.onClose(e), o._id = "") : o._onDataReceived(e)
                        }, e.on_error = function(e, t, r) {
                            o.onError(e, r), t && i(e)
                        }, o._id = a.JSPrintManager.WS.send(JSON.stringify({
                            channel: o._channel,
                            address: o._address,
                            timeout: o._timeout,
                            receive_buffer_size: o._receiveBufferSize
                        }), e)
                    })
                }, n.prototype.send = function(e) {
                    var t = this.propertiesJSON();
                    a.JSPrintManager.WS.send(JSON.stringify({
                        data: e
                    }), t)
                }, n.prototype.close = function() {
                    a.JSPrintManager.WS.send(JSON.stringify({
                        close: !0
                    }), this.propertiesJSON())
                }, n.prototype.propertiesJSON = function() {
                    if (!this._address) throw "The specified address is null or empty.";
                    var e = {
                        type: "bt"
                    };
                    return this._id && (e.id = this._id), e
                }, n);

            function n(e, t) {
                if (this._id = "", this._address = "", this._channel = 1, this._timeout = 1e3, this._receiveBufferSize = 1024, !e) throw "The specified address is null or empty.";
                this._address = e, this._channel = t
            }
            r.BTComm = e
        }, {
            "./JSPrintManager": 9
        }],
        2: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.ClientJob = void 0;
            var a = e("./JSPrintManager"),
                e = (n.prototype._generateDataAsync = function() {
                    return new Promise(function(e) {})
                }, n.prototype.onUpdate = function(e, t) {}, n.prototype.onError = function(e, t) {}, n.prototype.sendToClient = function() {
                    var o = this;
                    return new Promise(function(n, i) {
                        o._generateDataAsync().then(function(e) {
                            var t = {
                                type: o._type,
                                on_update: function(e, t, r) {
                                    t ? n(e) : o.onUpdate(e, r)
                                },
                                on_error: function(e, t, r) {
                                    o.onError(e, r), t && i(e)
                                }
                            };
                            a.JSPrintManager.WS.send(e, t)
                        }).catch(function(e) {
                            return i(e)
                        })
                    })
                }, n);

            function n() {
                this._type = ""
            }
            r.ClientJob = e
        }, {
            "./JSPrintManager": 9
        }],
        3: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                    return (n = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                        })(e, t)
                }, function(e, t) {
                    function r() {
                        this.constructor = e
                    }
                    n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
                }),
                s = this && this.__awaiter || function(e, a, s, u) {
                    return new(s = s || Promise)(function(r, t) {
                        function n(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
                                e(t)
                            })).then(n, i)
                        }
                        o((u = u.apply(e, a || [])).next())
                    })
                },
                u = this && this.__generator || function(r, n) {
                    var i, o, a, s = {
                            label: 0,
                            sent: function() {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (i) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (i = 1, o && (a = 2 & t[0] ? o.return : t[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, t[1])).done) return a;
                                    switch (o = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                                        case 0:
                                        case 1:
                                            a = t;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                                s.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && s.label < a[1]) {
                                                s.label = a[1], a = t;
                                                break
                                            }
                                            if (a && s.label < a[2]) {
                                                s.label = a[2], s.ops.push(t);
                                                break
                                            }
                                            a[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    t = n.call(r, s)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    i = a = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.ClientPrintJob = void 0;
            var o, a = e("./ClientJob"),
                l = e("./ClientPrinter"),
                c = e("./Enums"),
                f = e("./Utils"),
                h = e("jszip"),
                i = (o = a.ClientJob, i(d, o), Object.defineProperty(d.prototype, "clientPrinter", {
                    get: function() {
                        return this._clientPrinter
                    },
                    set: function(e) {
                        this._clientPrinter = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(d.prototype, "printerCommandsCopies", {
                    get: function() {
                        return this._printerCommandsCopies
                    },
                    set: function(e) {
                        if (e < 1) throw "Copies must be greater than or equal to 1.";
                        this._printerCommandsCopies = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(d.prototype, "printerCommands", {
                    get: function() {
                        return this._printerCommands
                    },
                    set: function(e) {
                        this._printerCommands = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(d.prototype, "printerCommandsCodePage", {
                    get: function() {
                        return this._printerCommandsCodePage
                    },
                    set: function(e) {
                        this._printerCommandsCodePage = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(d.prototype, "binaryPrinterCommands", {
                    get: function() {
                        return this._binaryPrinterCommands
                    },
                    set: function(e) {
                        this._binaryPrinterCommands = e, this._printerCommands = ""
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(d.prototype, "files", {
                    get: function() {
                        return this._printFileGroup
                    },
                    enumerable: !1,
                    configurable: !0
                }), d.prototype.onUpdated = function(e) {}, d.prototype.onFinished = function(e) {}, d.prototype.onError = function(e, t) {}, d.prototype.onUpdate = function(e, t) {
                    t ? this.onFinished(e) : this.onUpdated(e)
                }, d.prototype._genPFGArrayAsync = function(a) {
                    var t = this;
                    return new Promise(function(n, i) {
                        var o, e;
                        0 != a.length && (o = new h, e = a.map(function(i) {
                            return s(t, void 0, void 0, function() {
                                var t, r, n;
                                return u(this, function(e) {
                                    switch (e.label) {
                                        case 0:
                                            return r = (t = o).file, n = [i.fileName], [4, i.getContent()];
                                        case 1:
                                            return r.apply(t, n.concat([e.sent()])), [2]
                                    }
                                })
                            })
                        }), Promise.all(e).then(function(e) {
                            return s(t, void 0, void 0, function() {
                                var t, r;
                                return u(this, function(e) {
                                    switch (e.label) {
                                        case 0:
                                            return e.trys.push([0, 2, , 3]), o.file("metadata.json", JSON.stringify(a.map(function(e) {
                                                return e.getProperties()
                                            }))), t = n, [4, o.generateAsync({
                                                type: "blob"
                                            })];
                                        case 1:
                                            return t.apply(void 0, [e.sent()]), [3, 3];
                                        case 2:
                                            return r = e.sent(), i(r), [3, 3];
                                        case 3:
                                            return [2]
                                    }
                                })
                            })
                        }).catch(function(e) {
                            return i(e)
                        }))
                    })
                }, d.prototype._genPCArrayAsync = function(i, o) {
                    return new Promise(function(e, t) {
                        try {
                            var r = f.Utils._str2UTF8Array(o.toString()),
                                n = new Uint8Array(0);
                            1 < o && ((n = new Uint8Array(5 + r.length)).set([80, 67, 67, 61]), n.set(r, 4), n.set([124], 4 + r.length)), null != i && 0 < i.length && e(new Blob([n, i]))
                        } catch (e) {
                            t(e)
                        }
                    })
                }, d.prototype._genPrinterArrayAsync = function(r) {
                    return new Promise(function(e, t) {
                        try {
                            r = r || new l.UserSelectedPrinter, e(new Uint8Array(f.Utils._str2UTF8Array(r.serialize())))
                        } catch (e) {
                            t(e)
                        }
                    })
                }, d.prototype._cmd2bin = function() {
                    if (this._printerCommands && 0 < this._printerCommands.length) try {
                        if (this._printerCommandsCodePage == c.Encoding.Default) this._binaryPrinterCommands = new Uint8Array(f.Utils._str2UTF8Array(this._printerCommands));
                        else {
                            if (!("cptable" in window)) throw "cptable.js and cputils.js files from https://github.com/SheetJS/js-codepage project are missing";
                            if (!("utils" in window.cptable)) throw "cptable.js and cputils.js files from https://github.com/SheetJS/js-codepage project are missing";
                            if (!(this._printerCommandsCodePage in window.cptable)) throw "Encoding " + this._printerCommandsCodePage.toString() + " is missing. Add it fromhttps://github.com/SheetJS/js-codepage/tree/master/bits";
                            this._binaryPrinterCommands = new Uint8Array(window.cptable.utils.encode(this._printerCommandsCodePage, this._printerCommands))
                        }
                    } catch (e) {
                        throw e
                    }
                }, d.prototype._generateDataAsync = function() {
                    var e = this;
                    return new Promise(function(n, t) {
                        e._cmd2bin();
                        var i = new Uint8Array([99, 112, 106, 2]);
                        Promise.race([e._genPCArrayAsync(e.binaryPrinterCommands, e._printerCommandsCopies), e._genPFGArrayAsync(e._printFileGroup)]).then(function(r) {
                            e._genPrinterArrayAsync(e._clientPrinter).then(function(e) {
                                var t = f.Utils._intToByteArray(r.size);
                                n(new Blob([i, t, r, e]))
                            }).catch(function(e) {
                                t(e)
                            })
                        }).catch(function(e) {
                            t(e)
                        })
                    })
                }, d);

            function d() {
                var e = null !== o && o.apply(this, arguments) || this;
                return e._clientPrinter = null, e._printerCommandsCopies = 1, e._printerCommands = "", e._printerCommandsCodePage = c.Encoding.Default, e._binaryPrinterCommands = null, e._printFileGroup = [], e
            }
            r.ClientPrintJob = i
        }, {
            "./ClientJob": 2,
            "./ClientPrinter": 5,
            "./Enums": 7,
            "./Utils": 20,
            jszip: 24
        }],
        4: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    })(e, t)
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.ClientPrintJobGroup = void 0;
            var o, a = e("./ClientJob"),
                u = e("./Utils"),
                i = (o = a.ClientJob, i(s, o), Object.defineProperty(s.prototype, "jobs", {
                    get: function() {
                        return this._jobs
                    },
                    enumerable: !1,
                    configurable: !0
                }), s.prototype._generateMiniJob = function(e) {
                    return new Promise(function(n, t) {
                        e._cmd2bin(), Promise.race([e._genPCArrayAsync(e.binaryPrinterCommands, e.printerCommandsCopies), e._genPFGArrayAsync(e.files)]).then(function(r) {
                            e._genPrinterArrayAsync(e.clientPrinter).then(function(e) {
                                var t = u.Utils._intToByteArray(r.size);
                                n(new Blob([t, r, e]))
                            }).catch(function(e) {
                                t(e)
                            })
                        }).catch(function(e) {
                            t(e)
                        })
                    })
                }, s.prototype._generateDataAsync = function() {
                    var n = this;
                    return new Promise(function(o, t) {
                        for (var a = new Uint8Array([99, 112, 106, 103, 2]), s = new Uint8Array(u.Utils._intToByteArray(n.jobs.length)), e = [], r = 0; r < n.jobs.length; r++) e.push(n._generateMiniJob(n.jobs[r]));
                        Promise.all(e).then(function(e) {
                            for (var t = e.map(function(e) {
                                    return {
                                        startIndex: 0,
                                        endIndex: e.size - 1
                                    }
                                }), r = 1; r < t.length; r++) t[r].startIndex = t[r - 1].endIndex + 1, t[r].endIndex += t[r].startIndex;
                            var n = JSON.stringify(t),
                                i = e.reduce(function(e, t) {
                                    return new Blob([e, t])
                                }),
                                e = new Uint8Array(u.Utils._intToByteArray(i.size));
                            o(new Blob([a, s, e, i, n]))
                        }).catch(function(e) {
                            t(e)
                        })
                    })
                }, s);

            function s() {
                var e = null !== o && o.apply(this, arguments) || this;
                return e._jobs = [], e
            }
            r.ClientPrintJobGroup = i
        }, {
            "./ClientJob": 2,
            "./Utils": 20
        }],
        5: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.BluetoothPrinter = r.UserSelectedPrinter = r.NetworkPrinter = r.SerialPortPrinter = r.ParallelPortPrinter = r.InstalledPrinter = r.DefaultPrinter = void 0;
            var u = e("./Enums"),
                e = (n.prototype.serialize = function() {
                    return JSON.stringify({
                        type: this.Id
                    })
                }, n);

            function n() {
                this.Id = 0
            }
            r.DefaultPrinter = e;
            i.prototype.bool2str = function(e, t, r) {
                return void 0 === t && (t = "1"), void 0 === r && (r = "0"), e ? t : r
            }, Object.defineProperty(i.prototype, "printerName", {
                get: function() {
                    return this._name
                },
                set: function(e) {
                    this._name = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "printToDefaultIfNotFound", {
                get: function() {
                    return this._printDefault
                },
                set: function(e) {
                    this._printDefault = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "trayName", {
                get: function() {
                    return this._tray
                },
                set: function(e) {
                    this._tray = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "paperName", {
                get: function() {
                    return this._paper
                },
                set: function(e) {
                    this._paper = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "duplex", {
                get: function() {
                    return this._duplex
                },
                set: function(e) {
                    this._duplex = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "autoDetectRawModeDataType", {
                get: function() {
                    return this._autoDetectRawModeDataType
                },
                set: function(e) {
                    this._autoDetectRawModeDataType = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "driverModel", {
                get: function() {
                    return this._driverModel
                },
                set: function(e) {
                    this._driverModel = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(i.prototype, "mediaType", {
                get: function() {
                    return this._mediaType
                },
                set: function(e) {
                    this._mediaType = e
                },
                enumerable: !1,
                configurable: !0
            }), i.prototype.serialize = function() {
                if (!this._name) throw "The specified printer name is null or empty.";
                return JSON.stringify({
                    type: this.Id,
                    name: this._name,
                    duplex: this._duplex,
                    paper: this._paper,
                    tray: this._tray,
                    use_default: this._printDefault,
                    auto_detect_raw_mode_data_type: this._autoDetectRawModeDataType,
                    driver_model: this._driverModel,
                    media_type: this._mediaType
                })
            }, e = i;

            function i(e, t, r, n, i, o, a, s) {
                if (void 0 === t && (t = !1), void 0 === r && (r = ""), void 0 === n && (n = ""), void 0 === i && (i = u.DuplexMode.Default), void 0 === o && (o = !1), void 0 === a && (a = 0), void 0 === s && (s = ""), this.Id = 1, this._name = "", this._printDefault = !1, this._tray = "", this._paper = "", this._duplex = u.DuplexMode.Default, this._autoDetectRawModeDataType = !1, this._driverModel = 0, this._mediaType = "", !e) throw "The specified printer name is null or empty.";
                this._name = e, this._printDefault = t, this._paper = n, this._tray = r, this._duplex = i, this._autoDetectRawModeDataType = o, this._driverModel = a, this._mediaType = s
            }
            r.InstalledPrinter = e;
            Object.defineProperty(o.prototype, "portName", {
                get: function() {
                    return this._parallelPortName
                },
                set: function(e) {
                    this._parallelPortName = e
                },
                enumerable: !1,
                configurable: !0
            }), o.prototype.serialize = function() {
                if (!this.portName) throw "The specified parallel port name is null or empty.";
                return JSON.stringify({
                    type: this.Id,
                    port: this._parallelPortName
                })
            }, e = o;

            function o(e) {
                if (this.Id = 2, this._parallelPortName = "LPT1", !e) throw "The specified parallel port name is null or empty.";
                this._parallelPortName = e
            }
            r.ParallelPortPrinter = e;
            Object.defineProperty(a.prototype, "portName", {
                get: function() {
                    return this._port
                },
                set: function(e) {
                    this._port = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(a.prototype, "baudRate", {
                get: function() {
                    return this._baud_rate
                },
                set: function(e) {
                    this._baud_rate = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(a.prototype, "parity", {
                get: function() {
                    return this._parity
                },
                set: function(e) {
                    this._parity = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(a.prototype, "stopBits", {
                get: function() {
                    return this._stop_bits
                },
                set: function(e) {
                    this._stop_bits = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(a.prototype, "dataBits", {
                get: function() {
                    return this._data_bits
                },
                set: function(e) {
                    this._data_bits = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(a.prototype, "flowControl", {
                get: function() {
                    return this._flow_control
                },
                set: function(e) {
                    this._flow_control = e
                },
                enumerable: !1,
                configurable: !0
            }), a.prototype.serialize = function() {
                if (!this.portName) throw "The specified serial port name is null or empty.";
                return JSON.stringify({
                    type: this.Id,
                    port: this._port,
                    baud_rate: this._baud_rate,
                    data_bits: this._data_bits,
                    flow_control: this._flow_control,
                    parity: this._parity,
                    stop_bits: this._stop_bits
                })
            }, e = a;

            function a(e, t, r, n, i, o) {
                if (this.Id = 3, this._port = "COM1", this._baud_rate = 9600, this._parity = u.Serial.Parity.None, this._stop_bits = u.Serial.StopBits.One, this._data_bits = u.Serial.DataBits.Eight, this._flow_control = u.Serial.Handshake.XOnXOff, !e) throw "The specified serial port name is null or empty.";
                this._port = e, this._baud_rate = t, this._parity = r, this._stop_bits = n, this._data_bits = i, this._flow_control = o
            }
            r.SerialPortPrinter = e;
            Object.defineProperty(s.prototype, "dnsName", {
                get: function() {
                    return this._dnsName
                },
                set: function(e) {
                    this._dnsName = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(s.prototype, "ipAddress", {
                get: function() {
                    return this._ip
                },
                set: function(e) {
                    this._ip = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(s.prototype, "port", {
                get: function() {
                    return this._port
                },
                set: function(e) {
                    if (!(0 <= e && e <= 65535)) throw "Invalid Port Number";
                    this._port = Math.floor(e)
                },
                enumerable: !1,
                configurable: !0
            }), s.prototype.serialize = function() {
                if (!this.dnsName && !this.ipAddress) throw "You have to specify an IP address or a DNS name";
                return JSON.stringify({
                    type: this.Id,
                    ip: this._ip,
                    dns: this._dnsName,
                    port: this._port
                })
            }, e = s;

            function s(e, t, r) {
                if (this.Id = 4, this._ip = "0.0.0.0", this._port = 0, this._dnsName = "", !t && !r) throw "You have to specify an IP address or a DNS name";
                t && (this._ip = t), r && (this._dnsName = r), this._port = e
            }
            r.NetworkPrinter = e;
            l.prototype.serialize = function() {
                return JSON.stringify({
                    type: this.Id
                })
            }, e = l;

            function l() {
                this.Id = 5
            }
            r.UserSelectedPrinter = e;
            Object.defineProperty(c.prototype, "address", {
                get: function() {
                    return this._address
                },
                set: function(e) {
                    this._address = e
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(c.prototype, "channel", {
                get: function() {
                    return this._channel
                },
                set: function(e) {
                    if (!(0 <= e && e <= 65535)) throw "Invalid Channel Number";
                    this._channel = Math.floor(e)
                },
                enumerable: !1,
                configurable: !0
            }), c.prototype.serialize = function() {
                if (!this.address) throw "You have to specify an address";
                return JSON.stringify({
                    type: this.Id,
                    address: this._address,
                    channel: this._channel
                })
            }, e = c;

            function c(e, t) {
                if (this.Id = 6, this._address = "00.00.00.00.00.00", this._channel = 0, !e) throw "You have to specify an address";
                e && (this._address = e), this._channel = t
            }
            r.BluetoothPrinter = e
        }, {
            "./Enums": 7
        }],
        6: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    })(e, t)
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.ClientScanJob = void 0;
            var o, a = e("./ClientJob"),
                s = e("./Enums"),
                i = (o = a.ClientJob, i(u, o), Object.defineProperty(u.prototype, "scannerName", {
                    get: function() {
                        return this._scannerName
                    },
                    set: function(e) {
                        this._scannerName = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "pixelMode", {
                    get: function() {
                        return this._pixelMode
                    },
                    set: function(e) {
                        this._pixelMode = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "resolution", {
                    get: function() {
                        return this._resolution
                    },
                    set: function(e) {
                        this._resolution = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "imageFormat", {
                    get: function() {
                        return this._imageFormat
                    },
                    set: function(e) {
                        this._imageFormat = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "enableDuplex", {
                    get: function() {
                        return this._enableDuplex
                    },
                    set: function(e) {
                        this._enableDuplex = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "enableFeeder", {
                    get: function() {
                        return this._enableFeeder
                    },
                    set: function(e) {
                        this._enableFeeder = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "feederCount", {
                    get: function() {
                        return this._feederCount
                    },
                    set: function(e) {
                        this._feederCount = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "jpgCompressionQuality", {
                    get: function() {
                        return this._jpgCompressionQuality
                    },
                    set: function(e) {
                        this._jpgCompressionQuality = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "threshold", {
                    get: function() {
                        return this._threshold
                    },
                    set: function(e) {
                        this._threshold = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "dither", {
                    get: function() {
                        return this._dither
                    },
                    set: function(e) {
                        this._dither = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "pdfTitle", {
                    get: function() {
                        return this._pdfTitle
                    },
                    set: function(e) {
                        this._pdfTitle = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "showUI", {
                    get: function() {
                        return this._showUI
                    },
                    set: function(e) {
                        this._showUI = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(u.prototype, "showProgressUI", {
                    get: function() {
                        return this._showProgressUI
                    },
                    set: function(e) {
                        this._showProgressUI = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), u.prototype.onFinished = function(e) {}, u.prototype.onError = function(e, t) {}, u.prototype.onUpdate = function(e, t) {
                    e.result && this.onFinished(e)
                }, u.prototype._generateDataAsync = function() {
                    var r = this;
                    return new Promise(function(e, t) {
                        r._resolution || t("Scan resolution is required"), r._scannerName || t("Scanner name is required");
                        t = {
                            output_image_format: r._imageFormat,
                            pixel_mode: r._pixelMode,
                            scanner_name: r._scannerName,
                            resolution: r._resolution,
                            enable_duplex: r._enableDuplex,
                            enable_feeder: r._enableFeeder,
                            feeder_count: r._feederCount,
                            jpg_compression_quality: r._jpgCompressionQuality,
                            threshold: r._threshold,
                            dither: r._dither,
                            pdf_title: r._pdfTitle,
                            show_UI: r._showUI,
                            show_progress_UI: r._showProgressUI
                        };
                        e(JSON.stringify(t))
                    })
                }, u);

            function u() {
                var e = null !== o && o.apply(this, arguments) || this;
                return e._type = "scan_job", e._scannerName = "", e._pixelMode = s.PixelMode.Color, e._resolution = 200, e._imageFormat = s.ScannerImageFormatOutput.JPG, e._enableDuplex = !1, e._enableFeeder = !1, e._feederCount = 1, e._jpgCompressionQuality = 100, e._threshold = 128, e._dither = s.Dither.Threshold, e._pdfTitle = "", e._showUI = !1, e._showProgressUI = !0, e
            }
            r.ClientScanJob = i
        }, {
            "./ClientJob": 2,
            "./Enums": 7
        }],
        7: [function(e, t, r) {
            "use strict";
            var n, i;
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.Dither = r.PrinterIcon = r.Serial = r.PrintOrientation = r.TextAlignment = r.PrintRotation = r.WSStatus = r.FileSourceType = r.PixelMode = r.ScannerImageFormatOutput = r.Sizing = r.DuplexMode = r.Encoding = r.PrintersInfoLevel = r.PrintFileType = void 0, (i = r.PrintFileType || (r.PrintFileType = {}))[i.Image = 0] = "Image", i[i.Generic = 1] = "Generic", i[i.Document = 2] = "Document", i[i.WDOC = 3] = "WDOC", i[i.WXLS = 4] = "WXLS", i[i.WPDF = 5] = "WPDF", i[i.WTXT = 6] = "WTXT", i[i.Group = 7] = "Group", i[i.WTIF = 8] = "WTIF", (n = r.PrintersInfoLevel || (r.PrintersInfoLevel = {}))[n.Basic = 0] = "Basic", n[n.Extended = 1] = "Extended", (i = r.Encoding || (r.Encoding = {}))[i.Default = -1] = "Default", i[i.IBM_EBCDIC_US_Canada = 37] = "IBM_EBCDIC_US_Canada", i[i.OEM_United_States = 437] = "OEM_United_States", i[i.IBM_EBCDIC_International = 500] = "IBM_EBCDIC_International", i[i.Polish_MS_DOS = 620] = "Polish_MS_DOS", i[i.Arabic_ASMO_708 = 708] = "Arabic_ASMO_708", i[i.Arabic_Transparent_ASMO_Arabic_DOS = 720] = "Arabic_Transparent_ASMO_Arabic_DOS", i[i.OEM_Greek_formerly_437G_Greek_DOS = 737] = "OEM_Greek_formerly_437G_Greek_DOS", i[i.OEM_Baltic_Baltic_DOS = 775] = "OEM_Baltic_Baltic_DOS", i[i.OEM_Russian_Cyrillic_Euro_symbol = 808] = "OEM_Russian_Cyrillic_Euro_symbol", i[i.OEM_Multilingual_Latin_1_Western_European_DOS = 850] = "OEM_Multilingual_Latin_1_Western_European_DOS", i[i.OEM_Latin_2_Central_European_DOS = 852] = "OEM_Latin_2_Central_European_DOS", i[i.OEM_Cyrillic_primarily_Russian = 855] = "OEM_Cyrillic_primarily_Russian", i[i.OEM_Turkish_Turkish_DOS = 857] = "OEM_Turkish_Turkish_DOS", i[i.OEM_Multilingual_Latin_1_Euro_symbol = 858] = "OEM_Multilingual_Latin_1_Euro_symbol", i[i.OEM_Portuguese_Portuguese_DOS = 860] = "OEM_Portuguese_Portuguese_DOS", i[i.OEM_Icelandic_Icelandic_DOS = 861] = "OEM_Icelandic_Icelandic_DOS", i[i.OEM_Hebrew_Hebrew_DOS = 862] = "OEM_Hebrew_Hebrew_DOS", i[i.OEM_French_Canadian_French_Canadian_DOS = 863] = "OEM_French_Canadian_French_Canadian_DOS", i[i.OEM_Arabic_Arabic_864 = 864] = "OEM_Arabic_Arabic_864", i[i.OEM_Nordic_Nordic_DOS = 865] = "OEM_Nordic_Nordic_DOS", i[i.OEM_Russian_Cyrillic_DOS = 866] = "OEM_Russian_Cyrillic_DOS", i[i.OEM_Modern_Greek_Greek_Modern_DOS = 869] = "OEM_Modern_Greek_Greek_Modern_DOS", i[i.IBM_EBCDIC_Multilingual_ROECE_Latin_2 = 870] = "IBM_EBCDIC_Multilingual_ROECE_Latin_2", i[i.OEM_Cyrillic_primarily_Russian_Euro_Symbol = 872] = "OEM_Cyrillic_primarily_Russian_Euro_Symbol", i[i.Windows_Thai = 874] = "Windows_Thai", i[i.IBM_EBCDIC_Greek_Modern = 875] = "IBM_EBCDIC_Greek_Modern", i[i.Kamenicky_Czech_MS_DOS = 895] = "Kamenicky_Czech_MS_DOS", i[i.Japanese_Shift_JIS = 932] = "Japanese_Shift_JIS", i[i.Simplified_Chinese_GBK = 936] = "Simplified_Chinese_GBK", i[i.Korean = 949] = "Korean", i[i.Traditional_Chinese_Big5 = 950] = "Traditional_Chinese_Big5", i[i.IBM_EBCDIC_French = 1010] = "IBM_EBCDIC_French", i[i.IBM_EBCDIC_Turkish_Latin_5 = 1026] = "IBM_EBCDIC_Turkish_Latin_5", i[i.IBM_EBCDIC_Latin_1_Open_System = 1047] = "IBM_EBCDIC_Latin_1_Open_System", i[i.IBM_EBCDIC_Lao_1132_1133_1341 = 1132] = "IBM_EBCDIC_Lao_1132_1133_1341", i[i.IBM_EBCDIC_US_Canada_037_Euro_symbol = 1140] = "IBM_EBCDIC_US_Canada_037_Euro_symbol", i[i.IBM_EBCDIC_Germany_20273_Euro_symbol = 1141] = "IBM_EBCDIC_Germany_20273_Euro_symbol", i[i.IBM_EBCDIC_Denmark_Norway_20277_Euro_symbol = 1142] = "IBM_EBCDIC_Denmark_Norway_20277_Euro_symbol", i[i.IBM_EBCDIC_Finland_Sweden_20278_Euro_symbol = 1143] = "IBM_EBCDIC_Finland_Sweden_20278_Euro_symbol", i[i.IBM_EBCDIC_Italy_20280_Euro_symbol = 1144] = "IBM_EBCDIC_Italy_20280_Euro_symbol", i[i.IBM_EBCDIC_Latin_America_Spain_20284_Euro_symbol = 1145] = "IBM_EBCDIC_Latin_America_Spain_20284_Euro_symbol", i[i.IBM_EBCDIC_United_Kingdom_20285_Euro_symbol = 1146] = "IBM_EBCDIC_United_Kingdom_20285_Euro_symbol", i[i.IBM_EBCDIC_France_20297_Euro_symbol = 1147] = "IBM_EBCDIC_France_20297_Euro_symbol", i[i.IBM_EBCDIC_International_500_Euro_symbol = 1148] = "IBM_EBCDIC_International_500_Euro_symbol", i[i.IBM_EBCDIC_Icelandic_20871_Euro_symbol = 1149] = "IBM_EBCDIC_Icelandic_20871_Euro_symbol", i[i.Unicode_UTF_16_little_endian_BMP_of_ISO_10646 = 1200] = "Unicode_UTF_16_little_endian_BMP_of_ISO_10646", i[i.Unicode_UTF_16_big_endian = 1201] = "Unicode_UTF_16_big_endian", i[i.Windows_Central_Europe = 1250] = "Windows_Central_Europe", i[i.Windows_Cyrillic = 1251] = "Windows_Cyrillic", i[i.Windows_Latin_I = 1252] = "Windows_Latin_I", i[i.Windows_Greek = 1253] = "Windows_Greek", i[i.Windows_Turkish = 1254] = "Windows_Turkish", i[i.Windows_Hebrew = 1255] = "Windows_Hebrew", i[i.Windows_Arabic = 1256] = "Windows_Arabic", i[i.Windows_Baltic = 1257] = "Windows_Baltic", i[i.Windows_Vietnam = 1258] = "Windows_Vietnam", i[i.Korean_Johab = 1361] = "Korean_Johab", i[i.MAC_Roman = 1e4] = "MAC_Roman", i[i.Japanese_Mac = 10001] = "Japanese_Mac", i[i.MAC_Traditional_Chinese_Big5 = 10002] = "MAC_Traditional_Chinese_Big5", i[i.Korean_Mac = 10003] = "Korean_Mac", i[i.Arabic_Mac = 10004] = "Arabic_Mac", i[i.Hebrew_Mac = 10005] = "Hebrew_Mac", i[i.Greek_Mac = 10006] = "Greek_Mac", i[i.Cyrillic_Mac = 10007] = "Cyrillic_Mac", i[i.MAC_Simplified_Chinese_GB_2312 = 10008] = "MAC_Simplified_Chinese_GB_2312", i[i.Romanian_Mac = 10010] = "Romanian_Mac", i[i.Ukrainian_Mac = 10017] = "Ukrainian_Mac", i[i.Thai_Mac = 10021] = "Thai_Mac", i[i.MAC_Latin_2_Central_European = 10029] = "MAC_Latin_2_Central_European", i[i.Icelandic_Mac = 10079] = "Icelandic_Mac", i[i.Turkish_Mac = 10081] = "Turkish_Mac", i[i.Croatian_Mac = 10082] = "Croatian_Mac", i[i.Unicode_UTF_32_little_endian_byte_order = 12e3] = "Unicode_UTF_32_little_endian_byte_order", i[i.Unicode_UTF_32_big_endian_byte_order = 12001] = "Unicode_UTF_32_big_endian_byte_order", i[i.CNS_Taiwan_Chinese_Traditional = 2e4] = "CNS_Taiwan_Chinese_Traditional", i[i.TCA_Taiwan = 20001] = "TCA_Taiwan", i[i.ETEN_Taiwan_Chinese_Traditional = 20002] = "ETEN_Taiwan_Chinese_Traditional", i[i.IBM5550_Taiwan = 20003] = "IBM5550_Taiwan", i[i.TeleText_Taiwan = 20004] = "TeleText_Taiwan", i[i.Wang_Taiwan = 20005] = "Wang_Taiwan", i[i.Western_European_IA5_IRV_International_Alphabet_5 = 20105] = "Western_European_IA5_IRV_International_Alphabet_5", i[i.IA5_German_7_bit = 20106] = "IA5_German_7_bit", i[i.IA5_Swedish_7_bit = 20107] = "IA5_Swedish_7_bit", i[i.IA5_Norwegian_7_bit = 20108] = "IA5_Norwegian_7_bit", i[i.US_ASCII_7_bit = 20127] = "US_ASCII_7_bit", i[i.T_61 = 20261] = "T_61", i[i.ISO_6937_Non_Spacing_Accent = 20269] = "ISO_6937_Non_Spacing_Accent", i[i.IBM_EBCDIC_Germany = 20273] = "IBM_EBCDIC_Germany", i[i.IBM_EBCDIC_Denmark_Norway = 20277] = "IBM_EBCDIC_Denmark_Norway", i[i.IBM_EBCDIC_Finland_Sweden = 20278] = "IBM_EBCDIC_Finland_Sweden", i[i.IBM_EBCDIC_Italy = 20280] = "IBM_EBCDIC_Italy", i[i.IBM_EBCDIC_Latin_America_Spain = 20284] = "IBM_EBCDIC_Latin_America_Spain", i[i.IBM_EBCDIC_United_Kingdom = 20285] = "IBM_EBCDIC_United_Kingdom", i[i.IBM_EBCDIC_Japanese_Katakana_Extended = 20290] = "IBM_EBCDIC_Japanese_Katakana_Extended", i[i.IBM_EBCDIC_France = 20297] = "IBM_EBCDIC_France", i[i.IBM_EBCDIC_Arabic = 20420] = "IBM_EBCDIC_Arabic", i[i.IBM_EBCDIC_Greek = 20423] = "IBM_EBCDIC_Greek", i[i.IBM_EBCDIC_Hebrew = 20424] = "IBM_EBCDIC_Hebrew", i[i.IBM_EBCDIC_Korean_Extended = 20833] = "IBM_EBCDIC_Korean_Extended", i[i.IBM_EBCDIC_Thai = 20838] = "IBM_EBCDIC_Thai", i[i.Russian_Cyrillic_KOI8_R = 20866] = "Russian_Cyrillic_KOI8_R", i[i.IBM_EBCDIC_Icelandic = 20871] = "IBM_EBCDIC_Icelandic", i[i.IBM_EBCDIC_Cyrillic_Russian = 20880] = "IBM_EBCDIC_Cyrillic_Russian", i[i.IBM_EBCDIC_Turkish = 20905] = "IBM_EBCDIC_Turkish", i[i.IBM_EBCDIC_Latin_1_Open_System_1047_Euro_symbol = 20924] = "IBM_EBCDIC_Latin_1_Open_System_1047_Euro_symbol", i[i.Japanese_JIS_0208_1990_and_0212_1990 = 20932] = "Japanese_JIS_0208_1990_and_0212_1990", i[i.Simplified_Chinese_GB2312_80 = 20936] = "Simplified_Chinese_GB2312_80", i[i.Korean_Wansung = 20949] = "Korean_Wansung", i[i.IBM_EBCDIC_Cyrillic_Serbian_Bulgarian = 21025] = "IBM_EBCDIC_Cyrillic_Serbian_Bulgarian", i[i.Extended_Ext_Alpha_Lowercase = 21027] = "Extended_Ext_Alpha_Lowercase", i[i.Ukrainian_Cyrillic_KOI8_U = 21866] = "Ukrainian_Cyrillic_KOI8_U", i[i.ISO_8859_1_Latin_1_Western_European = 28591] = "ISO_8859_1_Latin_1_Western_European", i[i.ISO_8859_2_Latin_2_Central_European = 28592] = "ISO_8859_2_Latin_2_Central_European", i[i.ISO_8859_3_Latin_3 = 28593] = "ISO_8859_3_Latin_3", i[i.ISO_8859_4_Baltic = 28594] = "ISO_8859_4_Baltic", i[i.ISO_8859_5_Cyrillic = 28595] = "ISO_8859_5_Cyrillic", i[i.ISO_8859_6_Arabic = 28596] = "ISO_8859_6_Arabic", i[i.ISO_8859_7_Greek = 28597] = "ISO_8859_7_Greek", i[i.ISO_8859_8_Hebrew_ISO_Visual = 28598] = "ISO_8859_8_Hebrew_ISO_Visual", i[i.ISO_8859_9_Turkish = 28599] = "ISO_8859_9_Turkish", i[i.ISO_8859_10_Latin_6 = 28600] = "ISO_8859_10_Latin_6", i[i.ISO_8859_11_Latin_Thai = 28601] = "ISO_8859_11_Latin_Thai", i[i.ISO_8859_13_Latin_7_Estonian = 28603] = "ISO_8859_13_Latin_7_Estonian", i[i.ISO_8859_14_Latin_8_Celtic = 28604] = "ISO_8859_14_Latin_8_Celtic", i[i.ISO_8859_15_Latin_9 = 28605] = "ISO_8859_15_Latin_9", i[i.ISO_8859_15_Latin_10 = 28606] = "ISO_8859_15_Latin_10", i[i.Europa_3 = 29001] = "Europa_3", i[i.ISO_8859_8_Hebrew_ISO_Logical = 38598] = "ISO_8859_8_Hebrew_ISO_Logical", i[i.Atari_ST_TT = 47451] = "Atari_ST_TT", i[i.ISO_2022_JIS_Japanese_with_no_halfwidth_Katakana = 50220] = "ISO_2022_JIS_Japanese_with_no_halfwidth_Katakana", i[i.ISO_2022_JIS_Japanese_with_halfwidth_Katakana = 50221] = "ISO_2022_JIS_Japanese_with_halfwidth_Katakana", i[i.ISO_2022_Japanese_JIS_X_0201_1989_1_byte_Kana_SO_SI = 50222] = "ISO_2022_Japanese_JIS_X_0201_1989_1_byte_Kana_SO_SI", i[i.ISO_2022_Korean = 50225] = "ISO_2022_Korean", i[i.ISO_2022_Simplified_Chinese = 50227] = "ISO_2022_Simplified_Chinese", i[i.EUC_Japanese = 51932] = "EUC_Japanese", i[i.EUC_Simplified_Chinese = 51936] = "EUC_Simplified_Chinese", i[i.EUC_Korean = 51949] = "EUC_Korean", i[i.HZ_GB2312_Simplified_Chinese = 52936] = "HZ_GB2312_Simplified_Chinese", i[i.GB18030_Simplified_Chinese_4_byte = 54936] = "GB18030_Simplified_Chinese_4_byte", i[i.ISCII_Devanagari = 57002] = "ISCII_Devanagari", i[i.ISCII_Bengali = 57003] = "ISCII_Bengali", i[i.ISCII_Tamil = 57004] = "ISCII_Tamil", i[i.ISCII_Telugu = 57005] = "ISCII_Telugu", i[i.ISCII_Assamese = 57006] = "ISCII_Assamese", i[i.ISCII_Oriya = 57007] = "ISCII_Oriya", i[i.ISCII_Kannada = 57008] = "ISCII_Kannada", i[i.ISCII_Malayalam = 57009] = "ISCII_Malayalam", i[i.ISCII_Gujarati = 57010] = "ISCII_Gujarati", i[i.ISCII_Punjabi = 57011] = "ISCII_Punjabi", i[i.Unicode_UTF_7 = 65e3] = "Unicode_UTF_7", i[i.Unicode_UTF_8 = 65001] = "Unicode_UTF_8", (n = r.DuplexMode || (r.DuplexMode = {}))[n.Default = 0] = "Default", n[n.Simplex = 1] = "Simplex", n[n.DuplexLongEdge = 2] = "DuplexLongEdge", n[n.DuplexShortEdge = 3] = "DuplexShortEdge", (i = r.Sizing || (r.Sizing = {}))[i.None = 0] = "None", i[i.Fit = 1] = "Fit", (n = r.ScannerImageFormatOutput || (r.ScannerImageFormatOutput = {}))[n.JPG = 0] = "JPG", n[n.PNG = 1] = "PNG", n[n.TIFF = 2] = "TIFF", n[n.PDF = 3] = "PDF", (i = r.PixelMode || (r.PixelMode = {}))[i.Grayscale = 0] = "Grayscale", i[i.Color = 1] = "Color", i[i.BlackAndWhite = 2] = "BlackAndWhite", (n = r.FileSourceType || (r.FileSourceType = {}))[n.Base64 = 0] = "Base64", n[n.Text = 1] = "Text", n[n.BLOB = 2] = "BLOB", n[n.URL = 3] = "URL", n[n.ExternalURL = 4] = "ExternalURL", (i = r.WSStatus || (r.WSStatus = {}))[i.Open = 0] = "Open", i[i.Closed = 1] = "Closed", i[i.Blocked = 2] = "Blocked", i[i.WaitingForUserResponse = 3] = "WaitingForUserResponse", (n = r.PrintRotation || (r.PrintRotation = {}))[n.None = 0] = "None", n[n.Rot90 = 1] = "Rot90", n[n.Rot180 = 2] = "Rot180", n[n.Rot270 = 3] = "Rot270", (i = r.TextAlignment || (r.TextAlignment = {}))[i.Left = 0] = "Left", i[i.Center = 1] = "Center", i[i.Right = 2] = "Right", i[i.Justify = 3] = "Justify", i[i.None = 4] = "None", (n = r.PrintOrientation || (r.PrintOrientation = {}))[n.Portrait = 0] = "Portrait", n[n.Landscape = 1] = "Landscape", i = r.Serial || (r.Serial = {}), (n = i.Parity || (i.Parity = {}))[n.None = 0] = "None", n[n.Odd = 1] = "Odd", n[n.Even = 2] = "Even", n[n.Mark = 3] = "Mark", n[n.Space = 4] = "Space", (n = i.StopBits || (i.StopBits = {}))[n.One = 0] = "One", n[n.OnePointFive = 1] = "OnePointFive", n[n.Two = 2] = "Two", (n = i.DataBits || (i.DataBits = {}))[n.Eight = 0] = "Eight", n[n.Seven = 1] = "Seven", n[n.Six = 2] = "Six", n[n.Five = 3] = "Five", (i = i.Handshake || (i.Handshake = {}))[i.None = 0] = "None", i[i.RequestToSend = 1] = "RequestToSend", i[i.RequestToSendXOnXOff = 2] = "RequestToSendXOnXOff", i[i.XOnXOff = 3] = "XOnXOff", (i = r.PrinterIcon || (r.PrinterIcon = {}))[i.None = 0] = "None", i[i.Small = 1] = "Small", i[i.Large = 2] = "Large", i[i.ExtraLarge = 3] = "ExtraLarge", i[i.Jumbo = 4] = "Jumbo", (r = r.Dither || (r.Dither = {}))[r.Threshold = 0] = "Threshold", r[r.FloydSteinberg = 1] = "FloydSteinberg", r[r.Bayer4x4 = 2] = "Bayer4x4", r[r.Bayer8x8 = 3] = "Bayer8x8", r[r.Cluster6x6 = 4] = "Cluster6x6", r[r.Cluster8x8 = 5] = "Cluster8x8", r[r.Cluster16x16 = 6] = "Cluster16x16"
        }, {}],
        8: [function(e, t, r) {
            "use strict";
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                    void 0 === n && (n = r), Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function() {
                            return t[r]
                        }
                    })
                } : function(e, t, r, n) {
                    e[n = void 0 === n ? r : n] = t[r]
                }),
                i = this && this.__exportStar || function(e, t) {
                    for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.BTComm = r.TcpComm = r.SerialComm = r.PrintFileXLS = r.PrintFileTXT = r.PrintFileTIF = r.PrintFilePDF = r.PrintFileGroup = r.PrintFileDOC = r.PrintFile = r.JSPrintManager = r.ClientScanJob = r.ClientPrintJobGroup = r.ClientPrintJob = r.BluetoothPrinter = r.UserSelectedPrinter = r.SerialPortPrinter = r.ParallelPortPrinter = r.NetworkPrinter = r.InstalledPrinter = r.DefaultPrinter = void 0;
            var o = e("./ClientPrinter");
            Object.defineProperty(r, "DefaultPrinter", {
                enumerable: !0,
                get: function() {
                    return o.DefaultPrinter
                }
            }), Object.defineProperty(r, "InstalledPrinter", {
                enumerable: !0,
                get: function() {
                    return o.InstalledPrinter
                }
            }), Object.defineProperty(r, "NetworkPrinter", {
                enumerable: !0,
                get: function() {
                    return o.NetworkPrinter
                }
            }), Object.defineProperty(r, "ParallelPortPrinter", {
                enumerable: !0,
                get: function() {
                    return o.ParallelPortPrinter
                }
            }), Object.defineProperty(r, "SerialPortPrinter", {
                enumerable: !0,
                get: function() {
                    return o.SerialPortPrinter
                }
            }), Object.defineProperty(r, "UserSelectedPrinter", {
                enumerable: !0,
                get: function() {
                    return o.UserSelectedPrinter
                }
            }), Object.defineProperty(r, "BluetoothPrinter", {
                enumerable: !0,
                get: function() {
                    return o.BluetoothPrinter
                }
            });
            var a = e("./ClientPrintJob");
            Object.defineProperty(r, "ClientPrintJob", {
                enumerable: !0,
                get: function() {
                    return a.ClientPrintJob
                }
            });
            var s = e("./ClientPrintJobGroup");
            Object.defineProperty(r, "ClientPrintJobGroup", {
                enumerable: !0,
                get: function() {
                    return s.ClientPrintJobGroup
                }
            });
            var u = e("./ClientScanJob");
            Object.defineProperty(r, "ClientScanJob", {
                enumerable: !0,
                get: function() {
                    return u.ClientScanJob
                }
            }), i(e("./Enums"), r);
            var l = e("./JSPrintManager");
            Object.defineProperty(r, "JSPrintManager", {
                enumerable: !0,
                get: function() {
                    return l.JSPrintManager
                }
            });
            var c = e("./PrintFile");
            Object.defineProperty(r, "PrintFile", {
                enumerable: !0,
                get: function() {
                    return c.PrintFile
                }
            });
            var f = e("./PrintFileDOC");
            Object.defineProperty(r, "PrintFileDOC", {
                enumerable: !0,
                get: function() {
                    return f.PrintFileDOC
                }
            });
            var h = e("./PrintFileGroup");
            Object.defineProperty(r, "PrintFileGroup", {
                enumerable: !0,
                get: function() {
                    return h.PrintFileGroup
                }
            });
            var d = e("./PrintFilePDF");
            Object.defineProperty(r, "PrintFilePDF", {
                enumerable: !0,
                get: function() {
                    return d.PrintFilePDF
                }
            });
            var p = e("./PrintFileTIF");
            Object.defineProperty(r, "PrintFileTIF", {
                enumerable: !0,
                get: function() {
                    return p.PrintFileTIF
                }
            });
            var _ = e("./PrintFileTXT");
            Object.defineProperty(r, "PrintFileTXT", {
                enumerable: !0,
                get: function() {
                    return _.PrintFileTXT
                }
            });
            var m = e("./PrintFileXLS");
            Object.defineProperty(r, "PrintFileXLS", {
                enumerable: !0,
                get: function() {
                    return m.PrintFileXLS
                }
            });
            var y = e("./SerialComm");
            Object.defineProperty(r, "SerialComm", {
                enumerable: !0,
                get: function() {
                    return y.SerialComm
                }
            });
            var g = e("./TcpComm");
            Object.defineProperty(r, "TcpComm", {
                enumerable: !0,
                get: function() {
                    return g.TcpComm
                }
            });
            var b = e("./BTComm");
            Object.defineProperty(r, "BTComm", {
                enumerable: !0,
                get: function() {
                    return b.BTComm
                }
            })
        }, {
            "./BTComm": 1,
            "./ClientPrintJob": 3,
            "./ClientPrintJobGroup": 4,
            "./ClientPrinter": 5,
            "./ClientScanJob": 6,
            "./Enums": 7,
            "./JSPrintManager": 9,
            "./PrintFile": 11,
            "./PrintFileDOC": 12,
            "./PrintFileGroup": 13,
            "./PrintFilePDF": 14,
            "./PrintFileTIF": 15,
            "./PrintFileTXT": 16,
            "./PrintFileXLS": 17,
            "./SerialComm": 18,
            "./TcpComm": 19
        }],
        9: [function(e, t, r) {
            "use strict";
            var n = this && this.__awaiter || function(e, a, s, u) {
                    return new(s = s || Promise)(function(r, t) {
                        function n(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
                                e(t)
                            })).then(n, i)
                        }
                        o((u = u.apply(e, a || [])).next())
                    })
                },
                s = this && this.__generator || function(r, n) {
                    var i, o, a, s = {
                            label: 0,
                            sent: function() {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (i) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (i = 1, o && (a = 2 & t[0] ? o.return : t[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, t[1])).done) return a;
                                    switch (o = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                                        case 0:
                                        case 1:
                                            a = t;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                                s.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && s.label < a[1]) {
                                                s.label = a[1], a = t;
                                                break
                                            }
                                            if (a && s.label < a[2]) {
                                                s.label = a[2], s.ops.push(t);
                                                break
                                            }
                                            a[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    t = n.call(r, s)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    i = a = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.JSPrintManager = void 0;
            var u = e("./Enums"),
                a = e("./NDWS"),
                l = e("./Utils"),
                e = (i.start = function(t, i, o) {
                    return void 0 === t && (t = !0), void 0 === i && (i = "localhost"), void 0 === o && (o = l.WSPORT), n(this, void 0, void 0, function() {
                        var r, n;
                        return s(this, function(e) {
                            switch (e.label) {
                                case 0:
                                    return this.WS ? [3, 2] : (this.WS = new a.NDWS(i, o, t, this.auto_reconnect), [4, this.WS.start()]);
                                case 1:
                                    return [2, e.sent()];
                                case 2:
                                    return this.WS.onStatusChanged(), r = this.WS.status, n = r == u.WSStatus.Closed, [2, new Promise(function(e, t) {
                                        n ? t("WS Connection not established.") : e(r)
                                    })]
                            }
                        })
                    })
                }, Object.defineProperty(i, "license_url", {
                    get: function() {
                        return this._license
                    },
                    set: function(e) {
                        this._license = e, this.WS && this.WS.status == u.WSStatus.Open && this.WS.send(JSON.stringify({
                            url: this._license
                        }), {
                            type: "set_license",
                            on_update: function(e) {},
                            on_error: function(e) {}
                        })
                    },
                    enumerable: !1,
                    configurable: !0
                }), i.getPrinters = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "printers_list",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getSessionCertificate = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "session_certificate",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getPrintersInfo = function(n, i, o) {
                    var a = this;
                    return void 0 === n && (n = u.PrintersInfoLevel.Basic), void 0 === i && (i = ""), new Promise(function(t, r) {
                        var e = {
                            detail_level: n
                        };
                        i && (e.printer_name = i), o && (e.printer_icon = o), a.WS.send(JSON.stringify(e), {
                            type: "printers_complete_list",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, Object.defineProperty(i, "websocket_status", {
                    get: function() {
                        return this.WS ? this.WS.status : u.WSStatus.Closed
                    },
                    enumerable: !1,
                    configurable: !0
                }), i.showAbout = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "about",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.updateClient = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "update",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getSystemFonts = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "fonts_list",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getSerialPorts = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "serial_ports_list",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getScanners = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "scanner_list",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.onPrinterCreated = function(t, r, e) {
                    if ((e = void 0 === e ? u.PrintersInfoLevel.Extended : e) == u.PrintersInfoLevel.Basic) throw "Basic detail level information is not implemented yet";
                    if (navigator.platform.toLowerCase().indexOf("win") < 0) throw "This functionality is Windows only";
                    return this.WS.send("", {
                        type: "on_printer_creation",
                        on_update: function(e) {
                            return t(e)
                        },
                        on_error: function(e) {
                            return r(e)
                        }
                    })
                }, i.onPrinterUpdated = function(t, r, e) {
                    if ((e = void 0 === e ? u.PrintersInfoLevel.Extended : e) == u.PrintersInfoLevel.Basic) throw "Basic detail level information is not implemented yet";
                    if (navigator.platform.toLowerCase().indexOf("win") < 0) throw "This functionality is Windows only";
                    return this.WS.send("", {
                        type: "on_printer_modification",
                        on_update: function(e) {
                            return t(e)
                        },
                        on_error: function(e) {
                            return r(e)
                        }
                    })
                }, i.onPrinterDeleted = function(t, r, e) {
                    if ((e = void 0 === e ? u.PrintersInfoLevel.Extended : e) == u.PrintersInfoLevel.Basic) throw "Basic detail level information is not implemented yet";
                    if (navigator.platform.toLowerCase().indexOf("win") < 0) throw "This functionality is Windows only";
                    return this.WS.send("", {
                        type: "on_printer_deletion",
                        on_update: function(e) {
                            return t(e)
                        },
                        on_error: function(e) {
                            return r(e)
                        }
                    })
                }, i.refreshPrinters = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "refresh_printers",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.unsubscribePrinterEvent = function(e) {
                    var n = this;
                    return new Promise(function(t, r) {
                        return n.WS.send(JSON.stringify({
                            close: !0
                        }), {
                            id: e,
                            type: "on_printer_deletion",
                            on_update: function(e) {
                                return t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.stop = function() {
                    this.WS.stop(), this.WS = null
                }, i.getClientAppInfo = function(i, o, a) {
                    return void 0 === i && (i = !0), void 0 === o && (o = "localhost"), void 0 === a && (a = l.WSPORT), n(this, void 0, void 0, function() {
                        return s(this, function(e) {
                            return [2, new Promise(function(t, r) {
                                var n = new WebSocket((i ? "wss://" : "ws://") + o + ":" + a + "/?getClientAppInfo");
                                n.onmessage = function(e) {
                                    try {
                                        if ("version" in JSON.parse(e.data)) return t(e.data), n.close(), void(n = null)
                                    } catch (e) {
                                        r("Cannot get Client App Info" + e)
                                    }
                                }, n.onerror = function(e) {
                                    return r("Cannot get Client App Info")
                                }, n.onclose = function(e) {
                                    return r("Cannot get Client App Info")
                                }
                            })]
                        })
                    })
                }, i.getMAC = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "mac_address",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getDefaultPaperName = function(e) {
                    var n = this;
                    return new Promise(function(t, r) {
                        n.WS.send(JSON.stringify({
                            printer_name: e
                        }), {
                            type: "get_default_paper_name",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getDefaultTrayName = function(e) {
                    var n = this;
                    return new Promise(function(t, r) {
                        n.WS.send(JSON.stringify({
                            printer_name: e
                        }), {
                            type: "get_default_tray_name",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getPaperInfo = function(e, n) {
                    var i = this;
                    return new Promise(function(t, r) {
                        i.WS.send(JSON.stringify({
                            printer_name: e,
                            paper_name: n
                        }), {
                            type: "get_paper_info",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getPapers = function(e) {
                    var n = this;
                    return new Promise(function(t, r) {
                        n.WS.send(JSON.stringify({
                            printer_name: e
                        }), {
                            type: "get_papers",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getTrays = function(e) {
                    var n = this;
                    return new Promise(function(t, r) {
                        n.WS.send(JSON.stringify({
                            printer_name: e
                        }), {
                            type: "get_trays",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getInstances = function(i, o, a) {
                    return void 0 === i && (i = !0), void 0 === o && (o = "localhost"), void 0 === a && (a = l.WSPORT), n(this, void 0, void 0, function() {
                        return s(this, function(e) {
                            return [2, new Promise(function(t, r) {
                                var n = new WebSocket((i ? "wss://" : "ws://") + o + ":" + a + "/?getInstances");
                                n.onmessage = function(e) {
                                    try {
                                        return e && e.data && t(e.data), n.close(), void(n = null)
                                    } catch (e) {
                                        r("Cannot get Client App instances" + e)
                                    }
                                }, n.onerror = function(e) {
                                    return r("Cannot get Client App instances")
                                }, n.onclose = function(e) {
                                    return r("Cannot get Client App instances")
                                }
                            })]
                        })
                    })
                }, i.getUser = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "get_user",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getBluetoothDevices = function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e.WS.send("", {
                            type: "bt_devices_list",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.getMediaTypes = function(e) {
                    var n = this;
                    return new Promise(function(t, r) {
                        n.WS.send(JSON.stringify({
                            printer_name: e
                        }), {
                            type: "get_media_types",
                            on_update: function(e) {
                                e && "result" in e ? t(e.result) : t(e)
                            },
                            on_error: function(e) {
                                return r(e)
                            }
                        })
                    })
                }, i.auto_reconnect = !1, i._license = document.location.origin + "/jspm", i);

            function i() {}
            r.JSPrintManager = e
        }, {
            "./Enums": 7,
            "./NDWS": 10,
            "./Utils": 20
        }],
        10: [function(e, t, r) {
            "use strict";
            var a = this && this.__awaiter || function(e, a, s, u) {
                    return new(s = s || Promise)(function(r, t) {
                        function n(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
                                e(t)
                            })).then(n, i)
                        }
                        o((u = u.apply(e, a || [])).next())
                    })
                },
                f = this && this.__generator || function(r, n) {
                    var i, o, a, s = {
                            label: 0,
                            sent: function() {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (i) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (i = 1, o && (a = 2 & t[0] ? o.return : t[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, t[1])).done) return a;
                                    switch (o = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                                        case 0:
                                        case 1:
                                            a = t;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                                s.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && s.label < a[1]) {
                                                s.label = a[1], a = t;
                                                break
                                            }
                                            if (a && s.label < a[2]) {
                                                s.label = a[2], s.ops.push(t);
                                                break
                                            }
                                            a[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    t = n.call(r, s)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    i = a = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.NDWS = void 0;
            var s = e("./Enums"),
                u = e("./JSPrintManager"),
                l = e("./Utils"),
                e = (Object.defineProperty(n.prototype, "address", {
                    get: function() {
                        return this._addr
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "port", {
                    get: function() {
                        return this._port
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "isSecure", {
                    get: function() {
                        return this._secure
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "status", {
                    get: function() {
                        return this._status
                    },
                    enumerable: !1,
                    configurable: !0
                }), n.prototype._onOpen = function(e, t) {
                    this._status = s.WSStatus.WaitingForUserResponse, this._pingPong(), t.onStatusChanged(), t.onOpen(e)
                }, n.prototype._onMessage = function(c) {
                    return a(this, void 0, void 0, function() {
                        var t, r, n, i, o, a, s, u, l;
                        return f(this, function(e) {
                            switch (e.label) {
                                case 0:
                                    return [4, this._processing_message.lock()];
                                case 1:
                                    t = e.sent(), e.label = 2;
                                case 2:
                                    if (e.trys.push([2, 6, 7, 8]), "string" != typeof c.data) return [3, 3];
                                    switch (r = JSON.parse(c.data), (u = this._job_list[r.id]) || this.onError("Job " + r.id + " doesn't exist"), n = "last" in r && r.last, s = "type" in r ? r.type : "message", i = "data" in r ? r.data : {}, s) {
                                        case "message":
                                            u.on_update && (u.on_update, 1) && u.on_update(i, u.first_update, n);
                                            break;
                                        case "error":
                                            o = "critical" in r && r.critical, u.on_error && (u.on_error, 1) && u.on_error(i, u.first_update, o);
                                            break;
                                        default:
                                            u.on_update && (u.on_update, 1) && u.on_update(i, u.first_update, n)
                                    }
                                    return [3, 5];
                                case 3:
                                    return [4, (a = c.data).slice(a.size - 8, a.size).arrayBuffer()];
                                case 4:
                                    l = e.sent(), s = new TextDecoder("utf-8").decode(l), l = a.slice(0, a.size - 8), (u = this._job_list[s]) || this.onError("Job " + s + " doesn't exist"), u.on_update && (u.on_update, 1) && u.on_update(l, u.first_update, !1), e.label = 5;
                                case 5:
                                    return u.first_update = !1, [3, 8];
                                case 6:
                                    return l = e.sent(), this.onError("Malformed message. Error: " + l + " Message: " + c.data), [3, 8];
                                case 7:
                                    return t(), [7];
                                case 8:
                                    return [2]
                            }
                        })
                    })
                }, n.prototype._onError = function(t) {
                    try {
                        var e = JSON.parse(t),
                            r = this._job_list[e.id];
                        r ? r.on_error(t, !0, !0) : this.onError(t)
                    } catch (e) {
                        this.onError(t)
                    }
                }, n.prototype._pingPong = function() {
                    var t = this;
                    setInterval(function(e) {
                        t._status == s.WSStatus.Open && t.send("", {
                            type: "ping",
                            on_update: function(e) {},
                            on_error: function(e) {}
                        })
                    }, 3e4)
                }, n.prototype._onClose = function(e, t) {
                    var r = this;
                    403 == e.code ? this._status = s.WSStatus.Blocked : (this._status = s.WSStatus.Closed, this.autoReconnect && setTimeout(function(e) {
                        r.start()
                    }, 2e3)), t.onClose(e), t.onStatusChanged()
                }, n.prototype._genID = function() {
                    return Math.floor(4294967296 * (1 + Math.random())).toString(16).substring(1)
                }, n.prototype._send = function(e, t) {
                    var r = "";
                    if ("id" in t) r = t.id;
                    else {
                        do {
                            r = this._genID()
                        } while (this._job_list[r]);
                        this._job_list[r] = {
                            id: r,
                            first_update: !0,
                            on_update: t.on_update,
                            on_error: t.on_error
                        }
                    }
                    var n, i = "";
                    return i = e instanceof Blob ? (n = new Uint8Array(("id" + r).split("").map(function(e) {
                        return e.charCodeAt(0)
                    })), new Blob([e, n])) : "string" == typeof e ? (i = {
                        id: r,
                        data: e
                    }, "type" in t && (i.type = t.type), JSON.stringify(i)) : (delete this._job_list[r], e), this._ws.send(i), r
                }, n.prototype.start = function() {
                    var o = this;
                    return new Promise(function(n, i) {
                        try {
                            o._ws = new WebSocket((o._secure ? "wss://" : "ws://") + o._addr + ":" + o._port), o._ws.onclose = function(e) {
                                return o._onClose(e, o)
                            }, o._ws.onerror = function(e) {
                                return o.onError(e)
                            }, o._ws.onopen = function(e) {
                                return o._onOpen(e, o)
                            }, o._ws.onmessage = function(e) {
                                try {
                                    var t, r = JSON.parse(e.data);
                                    "connection" in r && ("CONNECTED" == r.connection ? (o._status = s.WSStatus.Open, o.onStatusChanged(), o.send(JSON.stringify({
                                        url: u.JSPrintManager.license_url
                                    }), {
                                        type: "set_license",
                                        on_update: function(e) {
                                            console.info("License:", "result" in e ? e.result : e)
                                        },
                                        on_error: function(e) {
                                            console.warn("License:", "result" in e ? e.result : e)
                                        }
                                    }), (t = r.version.split("."))[0] + "." + t[1] != l.VERSION && console.warn("Lib JS version and desktop version differs Desktop(" + r.version + ") JS (" + l.VERSION + ")"), o._ws.onmessage = function(t) {
                                        return a(o, void 0, void 0, function() {
                                            return f(this, function(e) {
                                                switch (e.label) {
                                                    case 0:
                                                        return [4, this._onMessage(t)];
                                                    case 1:
                                                        return e.sent(), [2]
                                                }
                                            })
                                        })
                                    }, o._ws.onerror = o._onError, n()) : i("WS Connection not established. Reason: " + r.connection))
                                } catch (e) {
                                    o.onError("Malformed message. Check if JS version and Desktop version are the same. Description: " + e)
                                }
                            }
                        } catch (e) {
                            o.autoReconnect ? setTimeout(function() {
                                o.start().then(n).catch(i)
                            }, 2e3) : o.onError(e)
                        }
                    })
                }, n.prototype.send = function(e, t) {
                    return this._status == s.WSStatus.Closed ? t.on_error("The WebSocket connection is closed", !0, !0) : this._status == s.WSStatus.Blocked ? t.on_error("The site is blocked and the connection was closed", !0, !0) : this._ws.readyState != this._ws.OPEN && t.on_error("The WebSocket isn't ready yet", !0, !0), this._send(e, t)
                }, n.prototype.stop = function() {
                    this._ws && (this._ws.close(), this._ws = null)
                }, n);

            function n(e, t, r, n) {
                void 0 === e && (e = "localhost"), void 0 === t && (t = l.WSPORT), void 0 === r && (r = !0), void 0 === n && (n = !1), this._job_list = [], this._processing_message = new l.Mutex, this.autoReconnect = !1, this.onClose = function(e) {}, this.onOpen = function(e) {}, this.onStatusChanged = function() {}, this.onError = function(e) {
                    throw e
                }, this._addr = e, this._port = t, this._secure = r, this.autoReconnect = n
            }
            r.NDWS = e
        }, {
            "./Enums": 7,
            "./JSPrintManager": 9,
            "./Utils": 20
        }],
        11: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                    return (n = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                        })(e, t)
                }, function(e, t) {
                    function r() {
                        this.constructor = e
                    }
                    n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
                }),
                o = this && this.__awaiter || function(e, a, s, u) {
                    return new(s = s || Promise)(function(r, t) {
                        function n(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
                                e(t)
                            })).then(n, i)
                        }
                        o((u = u.apply(e, a || [])).next())
                    })
                },
                a = this && this.__generator || function(r, n) {
                    var i, o, a, s = {
                            label: 0,
                            sent: function() {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (i) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (i = 1, o && (a = 2 & t[0] ? o.return : t[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, t[1])).done) return a;
                                    switch (o = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                                        case 0:
                                        case 1:
                                            a = t;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                                s.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && s.label < a[1]) {
                                                s.label = a[1], a = t;
                                                break
                                            }
                                            if (a && s.label < a[2]) {
                                                s.label = a[2], s.ops.push(t);
                                                break
                                            }
                                            a[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    t = n.call(r, s)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    i = a = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFileDuplexable = r.PrintFile = void 0;
            var l = e("./Enums"),
                e = (Object.defineProperty(s.prototype, "copies", {
                    get: function() {
                        return this._copies
                    },
                    set: function(e) {
                        if (e < 1) throw "Copies must be greater than or equal to 1.";
                        this._copies = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), s.prototype.escapeInvalidFileNameChars = function() {
                    -1 < this.fileName.indexOf("\\") && (this.fileName = this.fileName.replace("\\", "BACKSLASHCHAR"))
                }, s.prototype.bool2str = function(e, t, r) {
                    return void 0 === t && (t = "1"), void 0 === r && (r = "0"), e ? t : r
                }, s.prototype.getProperties = function() {
                    return {
                        file_type: l.PrintFileType.Generic,
                        file_name: this.fileName,
                        file_content_type: this.fileContentType,
                        copies: this._copies
                    }
                }, s.prototype.isValidRange = function(e) {
                    if (null == (e = e.replace(/\s/g, "")) || "" == e) return !0;
                    var t = /([0-9])+((-[0-9]+)|(,[0-9]+))*/.exec(e);
                    return null != t && t[0].length == e.length
                }, s.prototype._getBLOBContent = function(s, u) {
                    return new Promise(function(t, r) {
                        switch (s) {
                            case l.FileSourceType.BLOB:
                                t(u);
                                break;
                            case l.FileSourceType.Base64:
                                try {
                                    for (var e = atob(u), n = new Uint8Array(e.length), i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
                                    t(new Blob([n]))
                                } catch (e) {
                                    r("Error trying to decode the base64 data.\n" + e)
                                }
                                break;
                            case l.FileSourceType.Text:
                                try {
                                    t(new Blob([u], {
                                        type: "text/plain;charset=utf-8"
                                    }))
                                } catch (e) {
                                    r("Error trying to decode the text data.\n" + e)
                                }
                                break;
                            case l.FileSourceType.URL:
                                var o = new XMLHttpRequest;
                                o.open("GET", u, !0), o.responseType = "blob", o.onload = function(e) {
                                    t(o.response)
                                }, o.send(null);
                                break;
                            case l.FileSourceType.ExternalURL:
                                try {
                                    var a = {
                                        url: u
                                    };
                                    t(new Blob([JSON.stringify(a)], {
                                        type: "text/plain;charset=utf-8"
                                    }))
                                } catch (e) {
                                    r("Error trying to decode the text data.\n" + e)
                                }
                                break;
                            default:
                                r("FileSourceType not specified")
                        }
                    })
                }, s.prototype.getContent = function() {
                    return o(this, void 0, void 0, function() {
                        return a(this, function(e) {
                            switch (e.label) {
                                case 0:
                                    return [4, this._getBLOBContent(this.fileContentType, this.fileContent)];
                                case 1:
                                    return [2, e.sent()]
                            }
                        })
                    })
                }, s);

            function s(e, t, r, n) {
                if (this.fileName = "", this._copies = 1, this.fileContent = e, this.fileContentType = t, !r) throw "You must specify a FileName including the extension.";
                this.fileName = r, n && (this.copies = n), this.escapeInvalidFileNameChars()
            }
            r.PrintFile = e;
            var u, e = (i(c, u = e), c.prototype.getContent = function() {
                return o(this, void 0, void 0, function() {
                    return a(this, function(e) {
                        switch (e.label) {
                            case 0:
                                if (!this.isValidRange(this.printRange)) throw "Invalid Print Range";
                                return [4, u.prototype.getContent.call(this)];
                            case 1:
                                return [2, e.sent()]
                        }
                    })
                })
            }, c);

            function c() {
                var e = null !== u && u.apply(this, arguments) || this;
                return e.manualDuplexMessage = "", e.manualDuplex = !1, e.printInReverseOrder = !1, e.printRange = "", e
            }
            r.PrintFileDuplexable = e
        }, {
            "./Enums": 7
        }],
        12: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    })(e, t)
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFileDOC = void 0;
            var o, a = e("./Enums"),
                e = e("./PrintFile"),
                i = (o = e.PrintFileDuplexable, i(s, o), s.prototype.getProperties = function() {
                    return {
                        file_type: a.PrintFileType.WDOC,
                        file_name: this.fileName,
                        file_content_type: this.fileContentType,
                        copies: this.copies,
                        manual_duplex: this.manualDuplex,
                        reverse: this.printInReverseOrder,
                        duplex_message: this.manualDuplexMessage,
                        range: this.printRange,
                        password: this.encryptedPassword
                    }
                }, s);

            function s(e, t, r, n) {
                n = o.call(this, e, t, r, n) || this;
                return n.encryptedPassword = "", n
            }
            r.PrintFileDOC = i
        }, {
            "./Enums": 7,
            "./PrintFile": 11
        }],
        13: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                    return (n = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                        })(e, t)
                }, function(e, t) {
                    function r() {
                        this.constructor = e
                    }
                    n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
                }),
                a = this && this.__awaiter || function(e, a, s, u) {
                    return new(s = s || Promise)(function(r, t) {
                        function n(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
                                e(t)
                            })).then(n, i)
                        }
                        o((u = u.apply(e, a || [])).next())
                    })
                },
                s = this && this.__generator || function(r, n) {
                    var i, o, a, s = {
                            label: 0,
                            sent: function() {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (i) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (i = 1, o && (a = 2 & t[0] ? o.return : t[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, t[1])).done) return a;
                                    switch (o = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                                        case 0:
                                        case 1:
                                            a = t;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                                s.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && s.label < a[1]) {
                                                s.label = a[1], a = t;
                                                break
                                            }
                                            if (a && s.label < a[2]) {
                                                s.label = a[2], s.ops.push(t);
                                                break
                                            }
                                            a[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    t = n.call(r, s)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    i = a = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFileGroup = void 0;
            var o, u = e("./Enums"),
                l = e("./PrintFile"),
                c = e("jszip"),
                i = (o = l.PrintFileDuplexable, i(f, o), f.prototype.getProperties = function() {
                    return {
                        file_type: u.PrintFileType.Group,
                        file_name: this.fileName,
                        file_content_type: this.fileContentType,
                        range: this.printRange,
                        copies: this.copies,
                        manual_duplex: this.manualDuplex,
                        reverse: this.printInReverseOrder,
                        duplex_message: this.manualDuplexMessage
                    }
                }, f.prototype._getBLOBContent = function() {
                    return a(this, void 0, void 0, function() {
                        var t = this;
                        return s(this, function(e) {
                            return [2, new Promise(function(n, i) {
                                return a(t, void 0, void 0, function() {
                                    var o, t, r = this;
                                    return s(this, function(e) {
                                        try {
                                            o = new c, t = this.fileContent.map(function(i) {
                                                return a(r, void 0, void 0, function() {
                                                    var t, r, n;
                                                    return s(this, function(e) {
                                                        switch (e.label) {
                                                            case 0:
                                                                return r = (t = o).file, n = [i.fileName], [4, i.getContent()];
                                                            case 1:
                                                                return r.apply(t, n.concat([e.sent()])), [2]
                                                        }
                                                    })
                                                })
                                            }), Promise.all(t).then(function(e) {
                                                return a(r, void 0, void 0, function() {
                                                    var t;
                                                    return s(this, function(e) {
                                                        switch (e.label) {
                                                            case 0:
                                                                return o.file("metadata.json", new Blob([JSON.stringify(this.fileContent.map(function(e) {
                                                                    return e.getProperties()
                                                                }))])), t = n, [4, o.generateAsync({
                                                                    type: "blob"
                                                                })];
                                                            case 1:
                                                                return t.apply(void 0, [e.sent()]), [2]
                                                        }
                                                    })
                                                })
                                            }).catch(function(e) {
                                                return i(e)
                                            })
                                        } catch (e) {
                                            i(e)
                                        }
                                        return [2]
                                    })
                                })
                            })]
                        })
                    })
                }, f);

            function f(e, t, r) {
                return o.call(this, e, u.FileSourceType.BLOB, t, r) || this
            }
            r.PrintFileGroup = i
        }, {
            "./Enums": 7,
            "./PrintFile": 11,
            jszip: 24
        }],
        14: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    })(e, t)
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFilePDF = void 0;
            var o, a = e("./Enums"),
                e = e("./PrintFile"),
                i = (o = e.PrintFileDuplexable, i(s, o), s.prototype.getProperties = function() {
                    return {
                        file_type: a.PrintFileType.WPDF,
                        file_name: this.fileName,
                        file_content_type: this.fileContentType,
                        copies: this.copies,
                        manual_duplex: this.manualDuplex,
                        grayscale: this.printAsGrayscale,
                        annotations: this.printAnnotations,
                        reverse: this.printInReverseOrder,
                        auto_rotate: this.printAutoRotate,
                        auto_center: this.printAutoCenter,
                        duplex_message: this.manualDuplexMessage,
                        range: this.printRange,
                        password: this.encryptedPassword,
                        rotation: this.printRotation,
                        sizing: this.pageSizing,
                        scale: this.printScale
                    }
                }, s);

            function s(e, t, r, n) {
                n = o.call(this, e, t, r, n) || this;
                return n.pageSizing = a.Sizing.None, n.printAutoRotate = !1, n.printAutoCenter = !1, n.encryptedPassword = "", n.printAsGrayscale = !1, n.printAnnotations = !1, n.printRotation = a.PrintRotation.None, n.printScale = 100, n
            }
            r.PrintFilePDF = i
        }, {
            "./Enums": 7,
            "./PrintFile": 11
        }],
        15: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    })(e, t)
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFileTIF = void 0;
            var o, a = e("./Enums"),
                e = e("./PrintFile"),
                i = (o = e.PrintFileDuplexable, i(s, o), s.prototype.isValidRange = function(e) {
                    if (null == e || "" == e) return !0;
                    var t = /([0-9])+((-[0-9]+)|(,[0-9]+))*/.exec(e);
                    return null != t && t[0].length == e.length
                }, s.prototype.getProperties = function() {
                    return {
                        file_type: a.PrintFileType.WTIF,
                        file_name: this.fileName,
                        file_content_type: this.fileContentType,
                        copies: this.copies,
                        manual_duplex: this.manualDuplex,
                        grayscale: this.printAsGrayscale,
                        reverse: this.printInReverseOrder,
                        auto_rotate: this.printAutoRotate,
                        auto_center: this.printAutoCenter,
                        duplex_message: this.manualDuplexMessage,
                        range: this.printRange,
                        rotation: this.printRotation,
                        sizing: this.pageSizing
                    }
                }, s);

            function s(e, t, r, n) {
                n = o.call(this, e, t, r, n) || this;
                return n.printAutoRotate = !1, n.printAutoCenter = !1, n.printAsGrayscale = !1, n.printRotation = a.PrintRotation.None, n.pageSizing = a.Sizing.None, n
            }
            r.PrintFileTIF = i
        }, {
            "./Enums": 7,
            "./PrintFile": 11
        }],
        16: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    })(e, t)
            }, function(e, t) {
                function r() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFileTXT = void 0;
            var o, a = e("./Enums"),
                e = e("./PrintFile"),
                i = (o = e.PrintFileDuplexable, i(s, o), s.prototype.getProperties = function() {
                    return {
                        file_name: this.fileName,
                        file_type: a.PrintFileType.WTXT,
                        file_content_type: this.fileContentType,
                        alignment: this.textAligment,
                        bold: this.fontBold,
                        color: this.fontColor,
                        copies: this.copies,
                        font_name: this.fontName,
                        font_size: this.fontSize,
                        italic: this.fontItalic,
                        margin_bottom: this.marginBottom,
                        margin_left: this.marginLeft,
                        margin_right: this.marginRight,
                        margin_top: this.marginTop,
                        orientation: this.printOrientation,
                        range: this.printRange,
                        duplex_message: this.manualDuplexMessage,
                        manual_duplex: this.manualDuplex,
                        reverse: this.printInReverseOrder,
                        strikethrough: this.fontStrikethrough,
                        underline: this.fontUnderline
                    }
                }, s);

            function s(e, t, r, n) {
                r = o.call(this, e, n || a.FileSourceType.Text, t, r) || this;
                return r.textContent = "", r.textAligment = a.TextAlignment.Left, r.fontName = "", r.fontBold = !1, r.fontItalic = !1, r.fontUnderline = !1, r.fontStrikethrough = !1, r.fontSize = 10, r.fontColor = "#000000", r.printOrientation = a.PrintOrientation.Portrait, r.marginLeft = .5, r.marginRight = .5, r.marginTop = .5, r.marginBottom = .5, r
            }
            r.PrintFileTXT = i
        }, {
            "./Enums": 7,
            "./PrintFile": 11
        }],
        17: [function(e, t, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(e, t) {
                    return (n = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                        })(e, t)
                }, function(e, t) {
                    function r() {
                        this.constructor = e
                    }
                    n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
                }),
                o = this && this.__awaiter || function(e, a, s, u) {
                    return new(s = s || Promise)(function(r, t) {
                        function n(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
                                e(t)
                            })).then(n, i)
                        }
                        o((u = u.apply(e, a || [])).next())
                    })
                },
                a = this && this.__generator || function(r, n) {
                    var i, o, a, s = {
                            label: 0,
                            sent: function() {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (i) throw new TypeError("Generator is already executing.");
                                for (; s;) try {
                                    if (i = 1, o && (a = 2 & t[0] ? o.return : t[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, t[1])).done) return a;
                                    switch (o = 0, (t = a ? [2 & t[0], a.value] : t)[0]) {
                                        case 0:
                                        case 1:
                                            a = t;
                                            break;
                                        case 4:
                                            return s.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            s.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = s.ops.pop(), s.trys.pop();
                                            continue;
                                        default:
                                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                s = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                                s.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && s.label < a[1]) {
                                                s.label = a[1], a = t;
                                                break
                                            }
                                            if (a && s.label < a[2]) {
                                                s.label = a[2], s.ops.push(t);
                                                break
                                            }
                                            a[2] && s.ops.pop(), s.trys.pop();
                                            continue
                                    }
                                    t = n.call(r, s)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    i = a = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PrintFileXLS = void 0;
            var s, u = e("./Enums"),
                e = e("./PrintFile"),
                i = (s = e.PrintFile, i(l, s), l.prototype.getProperties = function() {
                    return {
                        file_type: u.PrintFileType.WXLS,
                        file_name: this.fileName,
                        file_content_type: this.fileContentType,
                        copies: this.copies,
                        from_page: this.pageFrom,
                        to_page: this.pageTo,
                        password: this.encryptedPassword
                    }
                }, l.prototype.getContent = function() {
                    return o(this, void 0, void 0, function() {
                        return a(this, function(e) {
                            switch (e.label) {
                                case 0:
                                    if (this.pageFrom > this.pageTo) throw "Invalid Print Range";
                                    return [4, s.prototype.getContent.call(this)];
                                case 1:
                                    return [2, e.sent()]
                            }
                        })
                    })
                }, l);

            function l(e, t, r, n) {
                n = s.call(this, e, t, r, n) || this;
                return n.encryptedPassword = "", n.pageFrom = 0, n.pageTo = 0, n
            }
            r.PrintFileXLS = i
        }, {
            "./Enums": 7,
            "./PrintFile": 11
        }],
        18: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.SerialComm = void 0;
            var a = e("./Enums"),
                s = e("./JSPrintManager"),
                e = (Object.defineProperty(n.prototype, "portName", {
                    get: function() {
                        return this._port
                    },
                    set: function(e) {
                        this._port = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "isOpen", {
                    get: function() {
                        return this._isOpen
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "baudRate", {
                    get: function() {
                        return this._baud_rate
                    },
                    set: function(e) {
                        this._baud_rate = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "parity", {
                    get: function() {
                        return this._parity
                    },
                    set: function(e) {
                        this._parity = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "stopBits", {
                    get: function() {
                        return this._stop_bits
                    },
                    set: function(e) {
                        this._stop_bits = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "dataBits", {
                    get: function() {
                        return this._data_bits
                    },
                    set: function(e) {
                        this._data_bits = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "flowControl", {
                    get: function() {
                        return this._flow_control
                    },
                    set: function(e) {
                        this._flow_control = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "dsr", {
                    get: function() {
                        var n = this;
                        if (!this._isOpen) throw "Connection closed";
                        return s.JSPrintManager.WS.send(JSON.stringify({
                            dsr: !0
                        }), this.propertiesJSON()), new Promise(function(t, e) {
                            setTimeout(function() {
                                return e("Timeout")
                            }, n.SERIAL_TIMEOUT);

                            function r() {
                                "dsr" in n._updated_values || setTimeout(r, 100);
                                var e = n._updated_values.dsr;
                                delete n._updated_values.dsr, t(e)
                            }
                            r()
                        })
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "cts", {
                    get: function() {
                        var n = this;
                        if (!this._isOpen) throw "Connection closed";
                        return s.JSPrintManager.WS.send(JSON.stringify({
                            dsr: !0
                        }), this.propertiesJSON()), new Promise(function(t, e) {
                            setTimeout(function() {
                                return e("Timeout")
                            }, n.SERIAL_TIMEOUT);

                            function r() {
                                "cts" in n._updated_values || setTimeout(r, 100);
                                var e = n._updated_values.cts;
                                delete n._updated_values.cts, t(e)
                            }
                            r()
                        })
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "rts", {
                    set: function(e) {
                        if (!this._isOpen) throw "Connection closed";
                        if (this._flow_control in [a.Serial.Handshake.RequestToSend, a.Serial.Handshake.RequestToSendXOnXOff]) throw "Invalid operation. Flow control manages RTS";
                        s.JSPrintManager.WS.send(JSON.stringify({
                            rts: e
                        }), this.propertiesJSON())
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "dtr", {
                    set: function(e) {
                        if (!this._isOpen) throw "Connection closed";
                        s.JSPrintManager.WS.send(JSON.stringify({
                            dtr: e
                        }), this.propertiesJSON())
                    },
                    enumerable: !1,
                    configurable: !0
                }), n.prototype.onError = function(e, t) {}, n.prototype.onDataReceived = function(e) {}, n.prototype._onDataReceived = function(e) {
                    "dsr" in e ? this._updated_values.dsr = e.dsr : "cts" in e ? this._updated_values.cts = e.cts : this.onDataReceived(e.data)
                }, n.prototype.onClose = function(e) {}, n.prototype.open = function() {
                    var o = this;
                    return new Promise(function(n, i) {
                        if (o._isOpen) throw "Connection is already open";
                        var e = o.propertiesJSON();
                        e.on_update = function(e, t, r) {
                            t ? (e.result && "Open" == e.result && 0 == o._isOpen && (o._isOpen = !0), n(e)) : r ? (o.onClose(e), o._id = "", o._isOpen = !1) : o._onDataReceived(e)
                        }, e.on_error = function(e, t, r) {
                            o.onError(e, r), t && i(e)
                        }, o._id = s.JSPrintManager.WS.send(JSON.stringify({
                            port: o._port,
                            baud_rate: o._baud_rate,
                            data_bits: o._data_bits,
                            flow_control: o._flow_control,
                            parity: o._parity,
                            stop_bits: o._stop_bits
                        }), e)
                    })
                }, n.prototype.send = function(e) {
                    var t = this.propertiesJSON();
                    s.JSPrintManager.WS.send(JSON.stringify({
                        data: e
                    }), t)
                }, n.prototype.close = function() {
                    s.JSPrintManager.WS.send(JSON.stringify({
                        close: !0
                    }), this.propertiesJSON())
                }, n.prototype.propertiesJSON = function() {
                    if (!this.portName) throw "The specified serial port name is null or empty.";
                    var e = {
                        type: "serial"
                    };
                    return this._id && (e.id = this._id), e
                }, n);

            function n(e, t, r, n, i, o) {
                if (this._id = "", this._isOpen = !1, this._port = "", this._baud_rate = 9600, this._parity = a.Serial.Parity.None, this._stop_bits = a.Serial.StopBits.One, this._data_bits = a.Serial.DataBits.Eight, this._flow_control = a.Serial.Handshake.XOnXOff, this._updated_values = {}, this.SERIAL_TIMEOUT = 5e3, !e) throw "The specified serial port name is null or empty.";
                this._port = e, this._baud_rate = t, this._parity = r, this._stop_bits = n, this._data_bits = i, this._flow_control = o
            }
            r.SerialComm = e
        }, {
            "./Enums": 7,
            "./JSPrintManager": 9
        }],
        19: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.TcpComm = void 0;
            var a = e("./JSPrintManager"),
                e = (Object.defineProperty(n.prototype, "timeout", {
                    get: function() {
                        return this._timeout
                    },
                    set: function(e) {
                        this._timeout = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "receiveBufferSize", {
                    get: function() {
                        return this._receiveBufferSize
                    },
                    set: function(e) {
                        this._receiveBufferSize = e
                    },
                    enumerable: !1,
                    configurable: !0
                }), n.prototype.onError = function(e, t) {}, n.prototype.onDataReceived = function(e) {}, n.prototype._onDataReceived = function(e) {
                    this.onDataReceived(e.data)
                }, n.prototype.onClose = function(e) {}, n.prototype.connect = function() {
                    var o = this;
                    return new Promise(function(n, i) {
                        var e = o.propertiesJSON();
                        e.on_update = function(e, t, r) {
                            t ? n(e) : r ? (o.onClose(e), o._id = "") : o._onDataReceived(e)
                        }, e.on_error = function(e, t, r) {
                            o.onError(e, r), t && i(e)
                        }, o._id = a.JSPrintManager.WS.send(JSON.stringify({
                            port: o._port,
                            address: o._address,
                            timeout: o._timeout,
                            receive_buffer_size: o._receiveBufferSize
                        }), e)
                    })
                }, n.prototype.send = function(e) {
                    var t = this.propertiesJSON();
                    a.JSPrintManager.WS.send(JSON.stringify({
                        data: e
                    }), t)
                }, n.prototype.close = function() {
                    a.JSPrintManager.WS.send(JSON.stringify({
                        close: !0
                    }), this.propertiesJSON())
                }, n.prototype.propertiesJSON = function() {
                    if (!this._address) throw "The specified address is null or empty.";
                    var e = {
                        type: "tcp"
                    };
                    return this._id && (e.id = this._id), e
                }, n);

            function n(e, t) {
                if (this._id = "", this._address = "", this._port = 0, this._timeout = 1e3, this._receiveBufferSize = 8192, !e) throw "The specified address is null or empty.";
                this._address = e, this._port = t
            }
            r.TcpComm = e
        }, {
            "./JSPrintManager": 9
        }],
        20: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.Utils = r.Mutex = r.WSPORT = r.VERSION = void 0, r.VERSION = "6.0", r.WSPORT = 26443;
            var n = (i.prototype.lock = function() {
                var t = function(e) {};
                return this.mutex = this.mutex.then(function() {
                    return new Promise(t)
                }), new Promise(function(e) {
                    t = e
                })
            }, i);

            function i() {
                this.mutex = Promise.resolve()
            }
            r.Mutex = n;
            o._intToByteArray = function(e) {
                return new Uint8Array([255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255])
            }, o._str2UTF8Array = function(e) {
                for (var t = [], r = 0; r < e.length; r++) {
                    var n = e.charCodeAt(r);
                    0 == r && 239 == n && r + 1 < e.length && 187 == e.charCodeAt(r + 1) && r + 2 < e.length && 191 == e.charCodeAt(r + 2) ? (t.push(239), t.push(187), t.push(191), r += 2) : n < 128 ? t.push(n) : n < 2048 ? t.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || 57344 <= n ? t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (r++, n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(r)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
                }
                return t
            }, n = o;

            function o() {}
            r.Utils = n
        }, {}],
        21: [function(e, t, r) {
            "use strict";
            r.byteLength = function(e) {
                var t = c(e),
                    e = t[0],
                    t = t[1];
                return 3 * (e + t) / 4 - t
            }, r.toByteArray = function(e) {
                var t, r, n = c(e),
                    i = n[0],
                    n = n[1],
                    o = new l(function(e, t) {
                        return 3 * (e + t) / 4 - t
                    }(i, n)),
                    a = 0,
                    s = 0 < n ? i - 4 : i;
                for (r = 0; r < s; r += 4) t = u[e.charCodeAt(r)] << 18 | u[e.charCodeAt(r + 1)] << 12 | u[e.charCodeAt(r + 2)] << 6 | u[e.charCodeAt(r + 3)], o[a++] = t >> 16 & 255, o[a++] = t >> 8 & 255, o[a++] = 255 & t;
                2 === n && (t = u[e.charCodeAt(r)] << 2 | u[e.charCodeAt(r + 1)] >> 4, o[a++] = 255 & t);
                1 === n && (t = u[e.charCodeAt(r)] << 10 | u[e.charCodeAt(r + 1)] << 4 | u[e.charCodeAt(r + 2)] >> 2, o[a++] = t >> 8 & 255, o[a++] = 255 & t);
                return o
            }, r.fromByteArray = function(e) {
                for (var t, r = e.length, n = r % 3, i = [], o = 0, a = r - n; o < a; o += 16383) i.push(function(e, t, r) {
                    for (var n, i = [], o = t; o < r; o += 3) n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), i.push(function(e) {
                        return s[e >> 18 & 63] + s[e >> 12 & 63] + s[e >> 6 & 63] + s[63 & e]
                    }(n));
                    return i.join("")
                }(e, o, a < o + 16383 ? a : o + 16383));
                1 == n ? (t = e[r - 1], i.push(s[t >> 2] + s[t << 4 & 63] + "==")) : 2 == n && (t = (e[r - 2] << 8) + e[r - 1], i.push(s[t >> 10] + s[t >> 4 & 63] + s[t << 2 & 63] + "="));
                return i.join("")
            };
            for (var s = [], u = [], l = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, o = n.length; i < o; ++i) s[i] = n[i], u[n.charCodeAt(i)] = i;

            function c(e) {
                var t = e.length;
                if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
                e = e.indexOf("=");
                return [e = -1 === e ? t : e, e === t ? 0 : 4 - e % 4]
            }
            u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63
        }, {}],
        22: [function(T, e, A) {
            ! function(e) {
                ! function() {
                    "use strict";
                    var s = T("base64-js"),
                        o = T("ieee754");
                    A.Buffer = f, A.SlowBuffer = function(e) {
                        +e != e && (e = 0);
                        return f.alloc(+e)
                    }, A.INSPECT_MAX_BYTES = 50;
                    var t = 2147483647;

                    function i(e) {
                        if (t < e) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                        e = new Uint8Array(e);
                        return e.__proto__ = f.prototype, e
                    }

                    function f(e, t, r) {
                        if ("number" != typeof e) return n(e, t, r);
                        if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return u(e)
                    }

                    function n(e, t, r) {
                        if ("string" == typeof e) return function(e, t) {
                            "string" == typeof t && "" !== t || (t = "utf8");
                            if (!f.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                            var r = 0 | h(e, t),
                                n = i(r),
                                t = n.write(e, t);
                            t !== r && (n = n.slice(0, t));
                            return n
                        }(e, t);
                        if (ArrayBuffer.isView(e)) return l(e);
                        if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                        if (x(e, ArrayBuffer) || e && x(e.buffer, ArrayBuffer)) return function(e, t, r) {
                            if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                            if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                            r = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
                            return r.__proto__ = f.prototype, r
                        }(e, t, r);
                        if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                        var n = e.valueOf && e.valueOf();
                        if (null != n && n !== e) return f.from(n, t, r);
                        n = function(e) {
                            if (f.isBuffer(e)) {
                                var t = 0 | c(e.length),
                                    r = i(t);
                                return 0 === r.length ? r : (e.copy(r, 0, 0, t), r)
                            }
                            if (void 0 !== e.length) return "number" != typeof e.length || B(e.length) ? i(0) : l(e);
                            if ("Buffer" === e.type && Array.isArray(e.data)) return l(e.data)
                        }(e);
                        if (n) return n;
                        if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return f.from(e[Symbol.toPrimitive]("string"), t, r);
                        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                    }

                    function a(e) {
                        if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                        if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                    }

                    function u(e) {
                        return a(e), i(e < 0 ? 0 : 0 | c(e))
                    }

                    function l(e) {
                        for (var t = e.length < 0 ? 0 : 0 | c(e.length), r = i(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                        return r
                    }

                    function c(e) {
                        if (t <= e) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + t.toString(16) + " bytes");
                        return 0 | e
                    }

                    function h(e, t) {
                        if (f.isBuffer(e)) return e.length;
                        if (ArrayBuffer.isView(e) || x(e, ArrayBuffer)) return e.byteLength;
                        if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                        var r = e.length,
                            n = 2 < arguments.length && !0 === arguments[2];
                        if (!n && 0 === r) return 0;
                        for (var i = !1;;) switch (t) {
                            case "ascii":
                            case "latin1":
                            case "binary":
                                return r;
                            case "utf8":
                            case "utf-8":
                                return P(e).length;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return 2 * r;
                            case "hex":
                                return r >>> 1;
                            case "base64":
                                return E(e).length;
                            default:
                                if (i) return n ? -1 : P(e).length;
                                t = ("" + t).toLowerCase(), i = !0
                        }
                    }

                    function r(e, t, r) {
                        var n, i, o, a = !1;
                        if ((t = void 0 === t || t < 0 ? 0 : t) > this.length) return "";
                        if ((r = void 0 === r || r > this.length ? this.length : r) <= 0) return "";
                        if ((r >>>= 0) <= (t >>>= 0)) return "";
                        for (e = e || "utf8";;) switch (e) {
                            case "hex":
                                return function(e, t, r) {
                                    var n = e.length;
                                    (!t || t < 0) && (t = 0);
                                    (!r || r < 0 || n < r) && (r = n);
                                    for (var i = "", o = t; o < r; ++o) i += function(e) {
                                        return e < 16 ? "0" + e.toString(16) : e.toString(16)
                                    }(e[o]);
                                    return i
                                }(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return g(this, t, r);
                            case "ascii":
                                return function(e, t, r) {
                                    var n = "";
                                    r = Math.min(e.length, r);
                                    for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                                    return n
                                }(this, t, r);
                            case "latin1":
                            case "binary":
                                return function(e, t, r) {
                                    var n = "";
                                    r = Math.min(e.length, r);
                                    for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                                    return n
                                }(this, t, r);
                            case "base64":
                                return n = this, o = r, 0 === (i = t) && o === n.length ? s.fromByteArray(n) : s.fromByteArray(n.slice(i, o));
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return function(e, t, r) {
                                    for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                                    return i
                                }(this, t, r);
                            default:
                                if (a) throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase(), a = !0
                        }
                    }

                    function d(e, t, r) {
                        var n = e[t];
                        e[t] = e[r], e[r] = n
                    }

                    function p(e, t, r, n, i) {
                        if (0 === e.length) return -1;
                        if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), (r = (r = B(r = +r) ? i ? 0 : e.length - 1 : r) < 0 ? e.length + r : r) >= e.length) {
                            if (i) return -1;
                            r = e.length - 1
                        } else if (r < 0) {
                            if (!i) return -1;
                            r = 0
                        }
                        if ("string" == typeof t && (t = f.from(t, n)), f.isBuffer(t)) return 0 === t.length ? -1 : _(e, t, r, n, i);
                        if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? (i ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(e, t, r) : _(e, [t], r, n, i);
                        throw new TypeError("val must be string, number or Buffer")
                    }

                    function _(e, t, r, n, i) {
                        var o = 1,
                            a = e.length,
                            s = t.length;
                        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                            if (e.length < 2 || t.length < 2) return -1;
                            a /= o = 2, s /= 2, r /= 2
                        }

                        function u(e, t) {
                            return 1 === o ? e[t] : e.readUInt16BE(t * o)
                        }
                        if (i)
                            for (var l = -1, c = r; c < a; c++)
                                if (u(e, c) === u(t, -1 === l ? 0 : c - l)) {
                                    if (c - (l = -1 === l ? c : l) + 1 === s) return l * o
                                } else - 1 !== l && (c -= c - l), l = -1;
                        else
                            for (c = r = a < r + s ? a - s : r; 0 <= c; c--) {
                                for (var f = !0, h = 0; h < s; h++)
                                    if (u(e, c + h) !== u(t, h)) {
                                        f = !1;
                                        break
                                    } if (f) return c
                            }
                        return -1
                    }

                    function m(e, t, r, n) {
                        return k(function(e) {
                            for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                            return t
                        }(t), e, r, n)
                    }

                    function y(e, t, r, n) {
                        return k(function(e, t) {
                            for (var r, n, i = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) n = e.charCodeAt(o), r = n >> 8, n = n % 256, i.push(n), i.push(r);
                            return i
                        }(t, e.length - r), e, r, n)
                    }

                    function g(e, t, r) {
                        r = Math.min(e.length, r);
                        for (var n = [], i = t; i < r;) {
                            var o, a, s, u, l = e[i],
                                c = null,
                                f = 239 < l ? 4 : 223 < l ? 3 : 191 < l ? 2 : 1;
                            if (i + f <= r) switch (f) {
                                case 1:
                                    l < 128 && (c = l);
                                    break;
                                case 2:
                                    128 == (192 & (o = e[i + 1])) && 127 < (u = (31 & l) << 6 | 63 & o) && (c = u);
                                    break;
                                case 3:
                                    o = e[i + 1], a = e[i + 2], 128 == (192 & o) && 128 == (192 & a) && 2047 < (u = (15 & l) << 12 | (63 & o) << 6 | 63 & a) && (u < 55296 || 57343 < u) && (c = u);
                                    break;
                                case 4:
                                    o = e[i + 1], a = e[i + 2], s = e[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && 65535 < (u = (15 & l) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) && u < 1114112 && (c = u)
                            }
                            null === c ? (c = 65533, f = 1) : 65535 < c && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), i += f
                        }
                        return function(e) {
                            var t = e.length;
                            if (t <= b) return String.fromCharCode.apply(String, e);
                            var r = "",
                                n = 0;
                            for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += b));
                            return r
                        }(n)
                    }
                    A.kMaxLength = t, (f.TYPED_ARRAY_SUPPORT = function() {
                        try {
                            var e = new Uint8Array(1);
                            return e.__proto__ = {
                                __proto__: Uint8Array.prototype,
                                foo: function() {
                                    return 42
                                }
                            }, 42 === e.foo()
                        } catch (e) {
                            return !1
                        }
                    }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(f.prototype, "parent", {
                        enumerable: !0,
                        get: function() {
                            if (f.isBuffer(this)) return this.buffer
                        }
                    }), Object.defineProperty(f.prototype, "offset", {
                        enumerable: !0,
                        get: function() {
                            if (f.isBuffer(this)) return this.byteOffset
                        }
                    }), "undefined" != typeof Symbol && null != Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, {
                        value: null,
                        configurable: !0,
                        enumerable: !1,
                        writable: !1
                    }), f.poolSize = 8192, f.from = n, f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, f.alloc = function(e, t, r) {
                        return t = t, r = r, a(e = e), !(e <= 0) && void 0 !== t ? "string" == typeof r ? i(e).fill(t, r) : i(e).fill(t) : i(e)
                    }, f.allocUnsafe = u, f.allocUnsafeSlow = u, f.isBuffer = function(e) {
                        return null != e && !0 === e._isBuffer && e !== f.prototype
                    }, f.compare = function(e, t) {
                        if (x(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), x(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(e) || !f.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                        if (e === t) return 0;
                        for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i)
                            if (e[i] !== t[i]) {
                                r = e[i], n = t[i];
                                break
                            } return r < n ? -1 : n < r ? 1 : 0
                    }, f.isEncoding = function(e) {
                        switch (String(e).toLowerCase()) {
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "latin1":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return !0;
                            default:
                                return !1
                        }
                    }, f.concat = function(e, t) {
                        if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                        if (0 === e.length) return f.alloc(0);
                        if (void 0 === t)
                            for (i = t = 0; i < e.length; ++i) t += e[i].length;
                        for (var r = f.allocUnsafe(t), n = 0, i = 0; i < e.length; ++i) {
                            var o = e[i];
                            if (x(o, Uint8Array) && (o = f.from(o)), !f.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                            o.copy(r, n), n += o.length
                        }
                        return r
                    }, f.byteLength = h, f.prototype._isBuffer = !0, f.prototype.swap16 = function() {
                        var e = this.length;
                        if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                        for (var t = 0; t < e; t += 2) d(this, t, t + 1);
                        return this
                    }, f.prototype.swap32 = function() {
                        var e = this.length;
                        if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                        for (var t = 0; t < e; t += 4) d(this, t, t + 3), d(this, t + 1, t + 2);
                        return this
                    }, f.prototype.swap64 = function() {
                        var e = this.length;
                        if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                        for (var t = 0; t < e; t += 8) d(this, t, t + 7), d(this, t + 1, t + 6), d(this, t + 2, t + 5), d(this, t + 3, t + 4);
                        return this
                    }, f.prototype.toLocaleString = f.prototype.toString = function() {
                        var e = this.length;
                        return 0 === e ? "" : 0 === arguments.length ? g(this, 0, e) : r.apply(this, arguments)
                    }, f.prototype.equals = function(e) {
                        if (!f.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                        return this === e || 0 === f.compare(this, e)
                    }, f.prototype.inspect = function() {
                        var e = "",
                            t = A.INSPECT_MAX_BYTES,
                            e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim();
                        return this.length > t && (e += " ... "), "<Buffer " + e + ">"
                    }, f.prototype.compare = function(e, t, r, n, i) {
                        if (x(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                        if (void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), (t = void 0 === t ? 0 : t) < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                        if (i <= n && r <= t) return 0;
                        if (i <= n) return -1;
                        if (r <= t) return 1;
                        if (this === e) return 0;
                        for (var o = (i >>>= 0) - (n >>>= 0), a = (r >>>= 0) - (t >>>= 0), s = Math.min(o, a), u = this.slice(n, i), l = e.slice(t, r), c = 0; c < s; ++c)
                            if (u[c] !== l[c]) {
                                o = u[c], a = l[c];
                                break
                            } return o < a ? -1 : a < o ? 1 : 0
                    }, f.prototype.includes = function(e, t, r) {
                        return -1 !== this.indexOf(e, t, r)
                    }, f.prototype.indexOf = function(e, t, r) {
                        return p(this, e, t, r, !0)
                    }, f.prototype.lastIndexOf = function(e, t, r) {
                        return p(this, e, t, r, !1)
                    }, f.prototype.write = function(e, t, r, n) {
                        if (void 0 === t) n = "utf8", r = this.length, t = 0;
                        else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                        else {
                            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                            t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                        }
                        var i = this.length - t;
                        if ((void 0 === r || i < r) && (r = i), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                        n = n || "utf8";
                        for (var o, a, s, u = !1;;) switch (n) {
                            case "hex":
                                return function(e, t, r, n) {
                                    r = Number(r) || 0;
                                    var i = e.length - r;
                                    (!n || i < (n = Number(n))) && (n = i), (i = t.length) / 2 < n && (n = i / 2);
                                    for (var o = 0; o < n; ++o) {
                                        var a = parseInt(t.substr(2 * o, 2), 16);
                                        if (B(a)) return o;
                                        e[r + o] = a
                                    }
                                    return o
                                }(this, e, t, r);
                            case "utf8":
                            case "utf-8":
                                return a = t, s = r, k(P(e, (o = this).length - a), o, a, s);
                            case "ascii":
                                return m(this, e, t, r);
                            case "latin1":
                            case "binary":
                                return m(this, e, t, r);
                            case "base64":
                                return o = this, a = t, s = r, k(E(e), o, a, s);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return y(this, e, t, r);
                            default:
                                if (u) throw new TypeError("Unknown encoding: " + n);
                                n = ("" + n).toLowerCase(), u = !0
                        }
                    }, f.prototype.toJSON = function() {
                        return {
                            type: "Buffer",
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        }
                    };
                    var b = 4096;

                    function w(e, t, r) {
                        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                        if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
                    }

                    function v(e, t, r, n, i, o) {
                        if (!f.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                        if (i < t || t < o) throw new RangeError('"value" argument is out of bounds');
                        if (r + n > e.length) throw new RangeError("Index out of range")
                    }

                    function S(e, t, r, n) {
                        if (r + n > e.length) throw new RangeError("Index out of range");
                        if (r < 0) throw new RangeError("Index out of range")
                    }

                    function C(e, t, r, n, i) {
                        return t = +t, r >>>= 0, i || S(e, 0, r, 4), o.write(e, t, r, n, 23, 4), r + 4
                    }

                    function I(e, t, r, n, i) {
                        return t = +t, r >>>= 0, i || S(e, 0, r, 8), o.write(e, t, r, n, 52, 8), r + 8
                    }
                    f.prototype.slice = function(e, t) {
                        var r = this.length;
                        (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), t < e && (t = e);
                        t = this.subarray(e, t);
                        return t.__proto__ = f.prototype, t
                    }, f.prototype.readUIntLE = function(e, t, r) {
                        e >>>= 0, t >>>= 0, r || w(e, t, this.length);
                        for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                        return n
                    }, f.prototype.readUIntBE = function(e, t, r) {
                        e >>>= 0, t >>>= 0, r || w(e, t, this.length);
                        for (var n = this[e + --t], i = 1; 0 < t && (i *= 256);) n += this[e + --t] * i;
                        return n
                    }, f.prototype.readUInt8 = function(e, t) {
                        return e >>>= 0, t || w(e, 1, this.length), this[e]
                    }, f.prototype.readUInt16LE = function(e, t) {
                        return e >>>= 0, t || w(e, 2, this.length), this[e] | this[e + 1] << 8
                    }, f.prototype.readUInt16BE = function(e, t) {
                        return e >>>= 0, t || w(e, 2, this.length), this[e] << 8 | this[e + 1]
                    }, f.prototype.readUInt32LE = function(e, t) {
                        return e >>>= 0, t || w(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                    }, f.prototype.readUInt32BE = function(e, t) {
                        return e >>>= 0, t || w(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                    }, f.prototype.readIntLE = function(e, t, r) {
                        e >>>= 0, t >>>= 0, r || w(e, t, this.length);
                        for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                        return (i *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
                    }, f.prototype.readIntBE = function(e, t, r) {
                        e >>>= 0, t >>>= 0, r || w(e, t, this.length);
                        for (var n = t, i = 1, o = this[e + --n]; 0 < n && (i *= 256);) o += this[e + --n] * i;
                        return (i *= 128) <= o && (o -= Math.pow(2, 8 * t)), o
                    }, f.prototype.readInt8 = function(e, t) {
                        return e >>>= 0, t || w(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                    }, f.prototype.readInt16LE = function(e, t) {
                        e >>>= 0, t || w(e, 2, this.length);
                        e = this[e] | this[e + 1] << 8;
                        return 32768 & e ? 4294901760 | e : e
                    }, f.prototype.readInt16BE = function(e, t) {
                        e >>>= 0, t || w(e, 2, this.length);
                        e = this[e + 1] | this[e] << 8;
                        return 32768 & e ? 4294901760 | e : e
                    }, f.prototype.readInt32LE = function(e, t) {
                        return e >>>= 0, t || w(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                    }, f.prototype.readInt32BE = function(e, t) {
                        return e >>>= 0, t || w(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                    }, f.prototype.readFloatLE = function(e, t) {
                        return e >>>= 0, t || w(e, 4, this.length), o.read(this, e, !0, 23, 4)
                    }, f.prototype.readFloatBE = function(e, t) {
                        return e >>>= 0, t || w(e, 4, this.length), o.read(this, e, !1, 23, 4)
                    }, f.prototype.readDoubleLE = function(e, t) {
                        return e >>>= 0, t || w(e, 8, this.length), o.read(this, e, !0, 52, 8)
                    }, f.prototype.readDoubleBE = function(e, t) {
                        return e >>>= 0, t || w(e, 8, this.length), o.read(this, e, !1, 52, 8)
                    }, f.prototype.writeUIntLE = function(e, t, r, n) {
                        e = +e, t >>>= 0, r >>>= 0, n || v(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                        var i = 1,
                            o = 0;
                        for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                        return t + r
                    }, f.prototype.writeUIntBE = function(e, t, r, n) {
                        e = +e, t >>>= 0, r >>>= 0, n || v(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                        var i = r - 1,
                            o = 1;
                        for (this[t + i] = 255 & e; 0 <= --i && (o *= 256);) this[t + i] = e / o & 255;
                        return t + r
                    }, f.prototype.writeUInt8 = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                    }, f.prototype.writeUInt16LE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                    }, f.prototype.writeUInt16BE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                    }, f.prototype.writeUInt32LE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                    }, f.prototype.writeUInt32BE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                    }, f.prototype.writeIntLE = function(e, t, r, n) {
                        e = +e, t >>>= 0, n || v(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
                        var i = 0,
                            o = 1,
                            a = 0;
                        for (this[t] = 255 & e; ++i < r && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / o >> 0) - a & 255;
                        return t + r
                    }, f.prototype.writeIntBE = function(e, t, r, n) {
                        e = +e, t >>>= 0, n || v(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
                        var i = r - 1,
                            o = 1,
                            a = 0;
                        for (this[t + i] = 255 & e; 0 <= --i && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / o >> 0) - a & 255;
                        return t + r
                    }, f.prototype.writeInt8 = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 1, 127, -128), this[t] = 255 & (e = e < 0 ? 255 + e + 1 : e), t + 1
                    }, f.prototype.writeInt16LE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                    }, f.prototype.writeInt16BE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                    }, f.prototype.writeInt32LE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                    }, f.prototype.writeInt32BE = function(e, t, r) {
                        return e = +e, t >>>= 0, r || v(this, e, t, 4, 2147483647, -2147483648), this[t] = (e = e < 0 ? 4294967295 + e + 1 : e) >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                    }, f.prototype.writeFloatLE = function(e, t, r) {
                        return C(this, e, t, !0, r)
                    }, f.prototype.writeFloatBE = function(e, t, r) {
                        return C(this, e, t, !1, r)
                    }, f.prototype.writeDoubleLE = function(e, t, r) {
                        return I(this, e, t, !0, r)
                    }, f.prototype.writeDoubleBE = function(e, t, r) {
                        return I(this, e, t, !1, r)
                    }, f.prototype.copy = function(e, t, r, n) {
                        if (!f.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                        if (r = r || 0, n || 0 === n || (n = this.length), t >= e.length && (t = e.length), (n = 0 < n && n < r ? r : n) === r) return 0;
                        if (0 === e.length || 0 === this.length) return 0;
                        if ((t = t || 0) < 0) throw new RangeError("targetStart out of bounds");
                        if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                        if (n < 0) throw new RangeError("sourceEnd out of bounds");
                        n > this.length && (n = this.length);
                        var i = (n = e.length - t < n - r ? e.length - t + r : n) - r;
                        if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);
                        else if (this === e && r < t && t < n)
                            for (var o = i - 1; 0 <= o; --o) e[o + t] = this[o + r];
                        else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                        return i
                    }, f.prototype.fill = function(e, t, r, n) {
                        if ("string" == typeof e) {
                            if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                            if ("string" == typeof n && !f.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                            var i;
                            1 === e.length && (i = e.charCodeAt(0), ("utf8" === n && i < 128 || "latin1" === n) && (e = i))
                        } else "number" == typeof e && (e &= 255);
                        if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                        if (r <= t) return this;
                        var o;
                        if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, "number" == typeof(e = e || 0))
                            for (o = t; o < r; ++o) this[o] = e;
                        else {
                            var a = f.isBuffer(e) ? e : f.from(e, n),
                                s = a.length;
                            if (0 === s) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                            for (o = 0; o < r - t; ++o) this[o + t] = a[o % s]
                        }
                        return this
                    };
                    var O = /[^+/0-9A-Za-z-_]/g;

                    function P(e, t) {
                        var r;
                        t = t || 1 / 0;
                        for (var n = e.length, i = null, o = [], a = 0; a < n; ++a) {
                            if (55295 < (r = e.charCodeAt(a)) && r < 57344) {
                                if (!i) {
                                    if (56319 < r) {
                                        -1 < (t -= 3) && o.push(239, 191, 189);
                                        continue
                                    }
                                    if (a + 1 === n) {
                                        -1 < (t -= 3) && o.push(239, 191, 189);
                                        continue
                                    }
                                    i = r;
                                    continue
                                }
                                if (r < 56320) {
                                    -1 < (t -= 3) && o.push(239, 191, 189), i = r;
                                    continue
                                }
                                r = 65536 + (i - 55296 << 10 | r - 56320)
                            } else i && -1 < (t -= 3) && o.push(239, 191, 189);
                            if (i = null, r < 128) {
                                if (--t < 0) break;
                                o.push(r)
                            } else if (r < 2048) {
                                if ((t -= 2) < 0) break;
                                o.push(r >> 6 | 192, 63 & r | 128)
                            } else if (r < 65536) {
                                if ((t -= 3) < 0) break;
                                o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                            } else {
                                if (!(r < 1114112)) throw new Error("Invalid code point");
                                if ((t -= 4) < 0) break;
                                o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                            }
                        }
                        return o
                    }

                    function E(e) {
                        return s.toByteArray(function(e) {
                            if ((e = (e = e.split("=")[0]).trim().replace(O, "")).length < 2) return "";
                            for (; e.length % 4 != 0;) e += "=";
                            return e
                        }(e))
                    }

                    function k(e, t, r, n) {
                        for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                        return i
                    }

                    function x(e, t) {
                        return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                    }

                    function B(e) {
                        return e != e
                    }
                }.call(this)
            }.call(this, T("buffer").Buffer)
        }, {
            "base64-js": 21,
            buffer: 22,
            ieee754: 23
        }],
        23: [function(e, t, r) {
            r.read = function(e, t, r, n, i) {
                var o, a, s = 8 * i - n - 1,
                    u = (1 << s) - 1,
                    l = u >> 1,
                    c = -7,
                    f = r ? i - 1 : 0,
                    h = r ? -1 : 1,
                    r = e[t + f];
                for (f += h, o = r & (1 << -c) - 1, r >>= -c, c += s; 0 < c; o = 256 * o + e[t + f], f += h, c -= 8);
                for (a = o & (1 << -c) - 1, o >>= -c, c += n; 0 < c; a = 256 * a + e[t + f], f += h, c -= 8);
                if (0 === o) o = 1 - l;
                else {
                    if (o === u) return a ? NaN : 1 / 0 * (r ? -1 : 1);
                    a += Math.pow(2, n), o -= l
                }
                return (r ? -1 : 1) * a * Math.pow(2, o - n)
            }, r.write = function(e, t, r, n, i, o) {
                var a, s, u = 8 * o - i - 1,
                    l = (1 << u) - 1,
                    c = l >> 1,
                    f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    h = n ? 0 : o - 1,
                    d = n ? 1 : -1,
                    o = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = l) : (a = Math.floor(Math.log(t) / Math.LN2), t * (n = Math.pow(2, -a)) < 1 && (a--, n *= 2), 2 <= (t += 1 <= a + c ? f / n : f * Math.pow(2, 1 - c)) * n && (a++, n /= 2), l <= a + c ? (s = 0, a = l) : 1 <= a + c ? (s = (t * n - 1) * Math.pow(2, i), a += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, i), a = 0)); 8 <= i; e[r + h] = 255 & s, h += d, s /= 256, i -= 8);
                for (a = a << i | s, u += i; 0 < u; e[r + h] = 255 & a, h += d, a /= 256, u -= 8);
                e[r + h - d] |= 128 * o
            }
        }, {}],
        24: [function(l, t, i) {
            ! function(r, f, n) {
                ! function() {
                    ! function(e) {
                        "object" == typeof i && void 0 !== t ? t.exports = e() : ("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this).JSZip = e()
                    }(function() {
                        return function n(i, o, a) {
                            function s(t, e) {
                                if (!o[t]) {
                                    if (!i[t]) {
                                        var r = "function" == typeof l && l;
                                        if (!e && r) return r(t, !0);
                                        if (u) return u(t, !0);
                                        r = new Error("Cannot find module '" + t + "'");
                                        throw r.code = "MODULE_NOT_FOUND", r
                                    }
                                    r = o[t] = {
                                        exports: {}
                                    };
                                    i[t][0].call(r.exports, function(e) {
                                        return s(i[t][1][e] || e)
                                    }, r, r.exports, n, i, o, a)
                                }
                                return o[t].exports
                            }
                            for (var u = "function" == typeof l && l, e = 0; e < a.length; e++) s(a[e]);
                            return s
                        }({
                            1: [function(e, t, r) {
                                "use strict";
                                var f = e("./utils"),
                                    c = e("./support"),
                                    h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                                r.encode = function(e) {
                                    for (var t, r, n, i, o, a, s = [], u = 0, l = e.length, c = "string" !== f.getTypeOf(e); u < e.length;) a = l - u, o = c ? (t = e[u++], r = u < l ? e[u++] : 0, u < l ? e[u++] : 0) : (t = e.charCodeAt(u++), r = u < l ? e.charCodeAt(u++) : 0, u < l ? e.charCodeAt(u++) : 0), n = (3 & t) << 4 | r >> 4, i = 1 < a ? (15 & r) << 2 | o >> 6 : 64, o = 2 < a ? 63 & o : 64, s.push(h.charAt(t >> 2) + h.charAt(n) + h.charAt(i) + h.charAt(o));
                                    return s.join("")
                                }, r.decode = function(e) {
                                    var t, r, n, i, o, a = 0,
                                        s = 0;
                                    if ("data:" === e.substr(0, "data:".length)) throw new Error("Invalid base64 input, it looks like a data url.");
                                    var u, l = 3 * (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
                                    if (e.charAt(e.length - 1) === h.charAt(64) && l--, e.charAt(e.length - 2) === h.charAt(64) && l--, l % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
                                    for (u = new(c.uint8array ? Uint8Array : Array)(0 | l); a < e.length;) t = h.indexOf(e.charAt(a++)) << 2 | (n = h.indexOf(e.charAt(a++))) >> 4, r = (15 & n) << 4 | (i = h.indexOf(e.charAt(a++))) >> 2, n = (3 & i) << 6 | (o = h.indexOf(e.charAt(a++))), u[s++] = t, 64 !== i && (u[s++] = r), 64 !== o && (u[s++] = n);
                                    return u
                                }
                            }, {
                                "./support": 30,
                                "./utils": 32
                            }],
                            2: [function(e, t, r) {
                                "use strict";
                                var n = e("./external"),
                                    i = e("./stream/DataWorker"),
                                    o = e("./stream/Crc32Probe"),
                                    a = e("./stream/DataLengthProbe");

                                function s(e, t, r, n, i) {
                                    this.compressedSize = e, this.uncompressedSize = t, this.crc32 = r, this.compression = n, this.compressedContent = i
                                }
                                s.prototype = {
                                    getContentWorker: function() {
                                        var e = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                                            t = this;
                                        return e.on("end", function() {
                                            if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch")
                                        }), e
                                    },
                                    getCompressedWorker: function() {
                                        return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                                    }
                                }, s.createWorkerFrom = function(e, t, r) {
                                    return e.pipe(new o).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", t)
                                }, t.exports = s
                            }, {
                                "./external": 6,
                                "./stream/Crc32Probe": 25,
                                "./stream/DataLengthProbe": 26,
                                "./stream/DataWorker": 27
                            }],
                            3: [function(e, t, r) {
                                "use strict";
                                var n = e("./stream/GenericWorker");
                                r.STORE = {
                                    magic: "\0\0",
                                    compressWorker: function(e) {
                                        return new n("STORE compression")
                                    },
                                    uncompressWorker: function() {
                                        return new n("STORE decompression")
                                    }
                                }, r.DEFLATE = e("./flate")
                            }, {
                                "./flate": 7,
                                "./stream/GenericWorker": 28
                            }],
                            4: [function(e, t, r) {
                                "use strict";
                                var n = e("./utils"),
                                    a = function() {
                                        for (var e = [], t = 0; t < 256; t++) {
                                            for (var r = t, n = 0; n < 8; n++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
                                            e[t] = r
                                        }
                                        return e
                                    }();
                                t.exports = function(e, t) {
                                    return void 0 !== e && e.length ? ("string" !== n.getTypeOf(e) ? function(e, t, r) {
                                        var n = a,
                                            i = 0 + r;
                                        e ^= -1;
                                        for (var o = 0; o < i; o++) e = e >>> 8 ^ n[255 & (e ^ t[o])];
                                        return -1 ^ e
                                    } : function(e, t, r) {
                                        var n = a,
                                            i = 0 + r;
                                        e ^= -1;
                                        for (var o = 0; o < i; o++) e = e >>> 8 ^ n[255 & (e ^ t.charCodeAt(o))];
                                        return -1 ^ e
                                    })(0 | t, e, e.length) : 0
                                }
                            }, {
                                "./utils": 32
                            }],
                            5: [function(e, t, r) {
                                "use strict";
                                r.base64 = !1, r.binary = !1, r.dir = !1, r.createFolders = !0, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null
                            }, {}],
                            6: [function(e, t, r) {
                                "use strict";
                                var n = "undefined" != typeof Promise ? Promise : e("lie");
                                t.exports = {
                                    Promise: n
                                }
                            }, {
                                lie: 37
                            }],
                            7: [function(e, t, r) {
                                "use strict";
                                var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                                    i = e("pako"),
                                    o = e("./utils"),
                                    a = e("./stream/GenericWorker"),
                                    s = n ? "uint8array" : "array";

                                function u(e, t) {
                                    a.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {}
                                }
                                r.magic = "\b\0", o.inherits(u, a), u.prototype.processChunk = function(e) {
                                    this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(o.transformTo(s, e.data), !1)
                                }, u.prototype.flush = function() {
                                    a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0)
                                }, u.prototype.cleanUp = function() {
                                    a.prototype.cleanUp.call(this), this._pako = null
                                }, u.prototype._createPako = function() {
                                    this._pako = new i[this._pakoAction]({
                                        raw: !0,
                                        level: this._pakoOptions.level || -1
                                    });
                                    var t = this;
                                    this._pako.onData = function(e) {
                                        t.push({
                                            data: e,
                                            meta: t.meta
                                        })
                                    }
                                }, r.compressWorker = function(e) {
                                    return new u("Deflate", e)
                                }, r.uncompressWorker = function() {
                                    return new u("Inflate", {})
                                }
                            }, {
                                "./stream/GenericWorker": 28,
                                "./utils": 32,
                                pako: 38
                            }],
                            8: [function(e, t, r) {
                                "use strict";

                                function w(e, t) {
                                    for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(255 & e), e >>>= 8;
                                    return r
                                }

                                function n(e, t, r, n, i, o) {
                                    var a, s = e.file,
                                        u = e.compression,
                                        l = o !== S.utf8encode,
                                        c = v.transformTo("string", o(s.name)),
                                        f = v.transformTo("string", S.utf8encode(s.name)),
                                        h = s.comment,
                                        d = v.transformTo("string", o(h)),
                                        p = v.transformTo("string", S.utf8encode(h)),
                                        _ = f.length !== s.name.length,
                                        m = p.length !== h.length,
                                        y = "",
                                        g = s.dir,
                                        o = s.date,
                                        h = {
                                            crc32: 0,
                                            compressedSize: 0,
                                            uncompressedSize: 0
                                        };
                                    t && !r || (h.crc32 = e.crc32, h.compressedSize = e.compressedSize, h.uncompressedSize = e.uncompressedSize);
                                    e = 0;
                                    t && (e |= 8), l || !_ && !m || (e |= 2048);
                                    t = 0, l = 0;
                                    g && (t |= 16), "UNIX" === i ? (l = 798, t |= (65535 & ((i = s.unixPermissions) ? i : g ? 16893 : 33204)) << 16) : (l = 20, t |= 63 & (s.dosPermissions || 0)), g = o.getUTCHours(), g <<= 6, g |= o.getUTCMinutes(), g <<= 5, g |= o.getUTCSeconds() / 2, s = o.getUTCFullYear() - 1980, s <<= 4, s |= o.getUTCMonth() + 1, s <<= 5, s |= o.getUTCDate(), _ && (a = w(1, 1) + w(C(c), 4) + f, y += "up" + w(a.length, 2) + a), m && (b = w(1, 1) + w(C(d), 4) + p, y += "uc" + w(b.length, 2) + b);
                                    var b = "";
                                    return b += "\n\0", b += w(e, 2), b += u.magic, b += w(g, 2), b += w(s, 2), b += w(h.crc32, 4), b += w(h.compressedSize, 4), b += w(h.uncompressedSize, 4), b += w(c.length, 2), b += w(y.length, 2), {
                                        fileRecord: I.LOCAL_FILE_HEADER + b + c + y,
                                        dirRecord: I.CENTRAL_FILE_HEADER + w(l, 2) + b + w(d.length, 2) + "\0\0\0\0" + w(t, 4) + w(n, 4) + c + y + d
                                    }
                                }
                                var v = e("../utils"),
                                    i = e("../stream/GenericWorker"),
                                    S = e("../utf8"),
                                    C = e("../crc32"),
                                    I = e("../signature");

                                function o(e, t, r, n) {
                                    i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = r, this.encodeFileName = n, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = []
                                }
                                v.inherits(o, i), o.prototype.push = function(e) {
                                    var t = e.meta.percent || 0,
                                        r = this.entriesCount,
                                        n = this._sources.length;
                                    this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, i.prototype.push.call(this, {
                                        data: e.data,
                                        meta: {
                                            currentFile: this.currentFile,
                                            percent: r ? (t + 100 * (r - n - 1)) / r : 100
                                        }
                                    }))
                                }, o.prototype.openedSource = function(e) {
                                    this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
                                    var t = this.streamFiles && !e.file.dir;
                                    t ? (t = n(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName), this.push({
                                        data: t.fileRecord,
                                        meta: {
                                            percent: 0
                                        }
                                    })) : this.accumulate = !0
                                }, o.prototype.closedSource = function(e) {
                                    this.accumulate = !1;
                                    var t = this.streamFiles && !e.file.dir,
                                        r = n(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                    if (this.dirRecords.push(r.dirRecord), t) this.push({
                                        data: (e = e, I.DATA_DESCRIPTOR + w(e.crc32, 4) + w(e.compressedSize, 4) + w(e.uncompressedSize, 4)),
                                        meta: {
                                            percent: 100
                                        }
                                    });
                                    else
                                        for (this.push({
                                                data: r.fileRecord,
                                                meta: {
                                                    percent: 0
                                                }
                                            }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
                                    this.currentFile = null
                                }, o.prototype.flush = function() {
                                    for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
                                        data: this.dirRecords[t],
                                        meta: {
                                            percent: 100
                                        }
                                    });
                                    var r = this.bytesWritten - e,
                                        e = function(e, t, r, n, i) {
                                            n = v.transformTo("string", i(n));
                                            return I.CENTRAL_DIRECTORY_END + "\0\0\0\0" + w(e, 2) + w(e, 2) + w(t, 4) + w(r, 4) + w(n.length, 2) + n
                                        }(this.dirRecords.length, r, e, this.zipComment, this.encodeFileName);
                                    this.push({
                                        data: e,
                                        meta: {
                                            percent: 100
                                        }
                                    })
                                }, o.prototype.prepareNextSource = function() {
                                    this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume()
                                }, o.prototype.registerPrevious = function(e) {
                                    this._sources.push(e);
                                    var t = this;
                                    return e.on("data", function(e) {
                                        t.processChunk(e)
                                    }), e.on("end", function() {
                                        t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end()
                                    }), e.on("error", function(e) {
                                        t.error(e)
                                    }), this
                                }, o.prototype.resume = function() {
                                    return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
                                }, o.prototype.error = function(e) {
                                    var t = this._sources;
                                    if (!i.prototype.error.call(this, e)) return !1;
                                    for (var r = 0; r < t.length; r++) try {
                                        t[r].error(e)
                                    } catch (e) {}
                                    return !0
                                }, o.prototype.lock = function() {
                                    i.prototype.lock.call(this);
                                    for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock()
                                }, t.exports = o
                            }, {
                                "../crc32": 4,
                                "../signature": 23,
                                "../stream/GenericWorker": 28,
                                "../utf8": 31,
                                "../utils": 32
                            }],
                            9: [function(e, t, r) {
                                "use strict";
                                var l = e("../compressions"),
                                    n = e("./ZipFileWorker");
                                r.generateWorker = function(e, a, t) {
                                    var s = new n(a.streamFiles, t, a.platform, a.encodeFileName),
                                        u = 0;
                                    try {
                                        e.forEach(function(e, t) {
                                            u++;
                                            var r = function(e, t) {
                                                    e = e || t, t = l[e];
                                                    if (!t) throw new Error(e + " is not a valid compression method !");
                                                    return t
                                                }(t.options.compression, a.compression),
                                                n = t.options.compressionOptions || a.compressionOptions || {},
                                                i = t.dir,
                                                o = t.date;
                                            t._compressWorker(r, n).withStreamInfo("file", {
                                                name: e,
                                                dir: i,
                                                date: o,
                                                comment: t.comment || "",
                                                unixPermissions: t.unixPermissions,
                                                dosPermissions: t.dosPermissions
                                            }).pipe(s)
                                        }), s.entriesCount = u
                                    } catch (e) {
                                        s.error(e)
                                    }
                                    return s
                                }
                            }, {
                                "../compressions": 3,
                                "./ZipFileWorker": 8
                            }],
                            10: [function(e, t, r) {
                                "use strict";

                                function n() {
                                    if (!(this instanceof n)) return new n;
                                    if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                                    this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
                                        var e, t = new n;
                                        for (e in this) "function" != typeof this[e] && (t[e] = this[e]);
                                        return t
                                    }
                                }(n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.7.1", n.loadAsync = function(e, t) {
                                    return (new n).loadAsync(e, t)
                                }, n.external = e("./external"), t.exports = n
                            }, {
                                "./defaults": 5,
                                "./external": 6,
                                "./load": 11,
                                "./object": 15,
                                "./support": 30
                            }],
                            11: [function(e, t, r) {
                                "use strict";
                                var n = e("./utils"),
                                    a = e("./external"),
                                    s = e("./utf8"),
                                    u = e("./zipEntries"),
                                    l = e("./stream/Crc32Probe"),
                                    c = e("./nodejsUtils");
                                t.exports = function(e, i) {
                                    var o = this;
                                    return i = n.extend(i || {}, {
                                        base64: !1,
                                        checkCRC32: !1,
                                        optimizedBinaryString: !1,
                                        createFolders: !1,
                                        decodeFileName: s.utf8decode
                                    }), c.isNode && c.isStream(e) ? a.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n.prepareContent("the loaded zip file", e, !0, i.optimizedBinaryString, i.base64).then(function(e) {
                                        var t = new u(i);
                                        return t.load(e), t
                                    }).then(function(e) {
                                        var t = [a.Promise.resolve(e)],
                                            r = e.files;
                                        if (i.checkCRC32)
                                            for (var n = 0; n < r.length; n++) t.push(function(n) {
                                                return new a.Promise(function(e, t) {
                                                    var r = n.decompressed.getContentWorker().pipe(new l);
                                                    r.on("error", function(e) {
                                                        t(e)
                                                    }).on("end", function() {
                                                        r.streamInfo.crc32 !== n.decompressed.crc32 ? t(new Error("Corrupted zip : CRC32 mismatch")) : e()
                                                    }).resume()
                                                })
                                            }(r[n]));
                                        return a.Promise.all(t)
                                    }).then(function(e) {
                                        for (var e = e.shift(), t = e.files, r = 0; r < t.length; r++) {
                                            var n = t[r];
                                            o.file(n.fileNameStr, n.decompressed, {
                                                binary: !0,
                                                optimizedBinaryString: !0,
                                                date: n.date,
                                                dir: n.dir,
                                                comment: n.fileCommentStr.length ? n.fileCommentStr : null,
                                                unixPermissions: n.unixPermissions,
                                                dosPermissions: n.dosPermissions,
                                                createFolders: i.createFolders
                                            })
                                        }
                                        return e.zipComment.length && (o.comment = e.zipComment), o
                                    })
                                }
                            }, {
                                "./external": 6,
                                "./nodejsUtils": 14,
                                "./stream/Crc32Probe": 25,
                                "./utf8": 31,
                                "./utils": 32,
                                "./zipEntries": 33
                            }],
                            12: [function(e, t, r) {
                                "use strict";
                                var n = e("../utils"),
                                    i = e("../stream/GenericWorker");

                                function o(e, t) {
                                    i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t)
                                }
                                n.inherits(o, i), o.prototype._bindStream = function(e) {
                                    var t = this;
                                    (this._stream = e).pause(), e.on("data", function(e) {
                                        t.push({
                                            data: e,
                                            meta: {
                                                percent: 0
                                            }
                                        })
                                    }).on("error", function(e) {
                                        t.isPaused ? this.generatedError = e : t.error(e)
                                    }).on("end", function() {
                                        t.isPaused ? t._upstreamEnded = !0 : t.end()
                                    })
                                }, o.prototype.pause = function() {
                                    return !!i.prototype.pause.call(this) && (this._stream.pause(), !0)
                                }, o.prototype.resume = function() {
                                    return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                                }, t.exports = o
                            }, {
                                "../stream/GenericWorker": 28,
                                "../utils": 32
                            }],
                            13: [function(e, t, r) {
                                "use strict";
                                var i = e("readable-stream").Readable;

                                function n(e, t, r) {
                                    i.call(this, t), this._helper = e;
                                    var n = this;
                                    e.on("data", function(e, t) {
                                        n.push(e) || n._helper.pause(), r && r(t)
                                    }).on("error", function(e) {
                                        n.emit("error", e)
                                    }).on("end", function() {
                                        n.push(null)
                                    })
                                }
                                e("../utils").inherits(n, i), n.prototype._read = function() {
                                    this._helper.resume()
                                }, t.exports = n
                            }, {
                                "../utils": 32,
                                "readable-stream": 16
                            }],
                            14: [function(e, t, r) {
                                "use strict";
                                t.exports = {
                                    isNode: void 0 !== f,
                                    newBufferFrom: function(e, t) {
                                        if (f.from && f.from !== Uint8Array.from) return f.from(e, t);
                                        if ("number" == typeof e) throw new Error('The "data" argument must not be a number');
                                        return new f(e, t)
                                    },
                                    allocBuffer: function(e) {
                                        if (f.alloc) return f.alloc(e);
                                        e = new f(e);
                                        return e.fill(0), e
                                    },
                                    isBuffer: function(e) {
                                        return f.isBuffer(e)
                                    },
                                    isStream: function(e) {
                                        return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume
                                    }
                                }
                            }, {}],
                            15: [function(e, t, r) {
                                "use strict";

                                function i(e, t, r) {
                                    var n, i = u.getTypeOf(t),
                                        o = u.extend(r || {}, f);
                                    o.date = o.date || new Date, null !== o.compression && (o.compression = o.compression.toUpperCase()), "string" == typeof o.unixPermissions && (o.unixPermissions = parseInt(o.unixPermissions, 8)), o.unixPermissions && 16384 & o.unixPermissions && (o.dir = !0), o.dosPermissions && 16 & o.dosPermissions && (o.dir = !0), o.dir && (e = y(e)), o.createFolders && (n = a(e)) && s.call(this, n, !0);
                                    i = "string" === i && !1 === o.binary && !1 === o.base64;
                                    r && void 0 !== r.binary || (o.binary = !i), (t instanceof h && 0 === t.uncompressedSize || o.dir || !t || 0 === t.length) && (o.base64 = !1, o.binary = !0, t = "", o.compression = "STORE");
                                    i = t instanceof h || t instanceof l ? t : _.isNode && _.isStream(t) ? new m(e, t) : u.prepareContent(e, t, o.binary, o.optimizedBinaryString, o.base64), o = new d(e, i, o);
                                    this.files[e] = o
                                }

                                function a(e) {
                                    var t = (e = "/" === e.slice(-1) ? e.substring(0, e.length - 1) : e).lastIndexOf("/");
                                    return 0 < t ? e.substring(0, t) : ""
                                }

                                function s(e, t) {
                                    return t = void 0 !== t ? t : f.createFolders, e = y(e), this.files[e] || i.call(this, e, null, {
                                        dir: !0,
                                        createFolders: t
                                    }), this.files[e]
                                }
                                var o = e("./utf8"),
                                    u = e("./utils"),
                                    l = e("./stream/GenericWorker"),
                                    c = e("./stream/StreamHelper"),
                                    f = e("./defaults"),
                                    h = e("./compressedObject"),
                                    d = e("./zipObject"),
                                    p = e("./generate"),
                                    _ = e("./nodejsUtils"),
                                    m = e("./nodejs/NodejsStreamInputAdapter"),
                                    y = function(e) {
                                        return "/" !== e.slice(-1) && (e += "/"), e
                                    };

                                function g(e) {
                                    return "[object RegExp]" === Object.prototype.toString.call(e)
                                }
                                e = {
                                    load: function() {
                                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                                    },
                                    forEach: function(e) {
                                        var t, r, n;
                                        for (t in this.files) n = this.files[t], (r = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(r, n)
                                    },
                                    filter: function(r) {
                                        var n = [];
                                        return this.forEach(function(e, t) {
                                            r(e, t) && n.push(t)
                                        }), n
                                    },
                                    file: function(e, t, r) {
                                        if (1 !== arguments.length) return e = this.root + e, i.call(this, e, t, r), this;
                                        if (g(e)) {
                                            var n = e;
                                            return this.filter(function(e, t) {
                                                return !t.dir && n.test(e)
                                            })
                                        }
                                        e = this.files[this.root + e];
                                        return e && !e.dir ? e : null
                                    },
                                    folder: function(r) {
                                        if (!r) return this;
                                        if (g(r)) return this.filter(function(e, t) {
                                            return t.dir && r.test(e)
                                        });
                                        var e = this.root + r,
                                            t = s.call(this, e),
                                            e = this.clone();
                                        return e.root = t.name, e
                                    },
                                    remove: function(r) {
                                        r = this.root + r;
                                        var e = this.files[r];
                                        if (e || ("/" !== r.slice(-1) && (r += "/"), e = this.files[r]), e && !e.dir) delete this.files[r];
                                        else
                                            for (var t = this.filter(function(e, t) {
                                                    return t.name.slice(0, r.length) === r
                                                }), n = 0; n < t.length; n++) delete this.files[t[n].name];
                                        return this
                                    },
                                    generate: function(e) {
                                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                                    },
                                    generateInternalStream: function(e) {
                                        var t = {};
                                        try {
                                            if ((t = u.extend(e || {}, {
                                                    streamFiles: !1,
                                                    compression: "STORE",
                                                    compressionOptions: null,
                                                    type: "",
                                                    platform: "DOS",
                                                    comment: null,
                                                    mimeType: "application/zip",
                                                    encodeFileName: o.utf8encode
                                                })).type = t.type.toLowerCase(), t.compression = t.compression.toUpperCase(), "binarystring" === t.type && (t.type = "string"), !t.type) throw new Error("No output type specified.");
                                            u.checkSupport(t.type), "darwin" !== t.platform && "freebsd" !== t.platform && "linux" !== t.platform && "sunos" !== t.platform || (t.platform = "UNIX"), "win32" === t.platform && (t.platform = "DOS");
                                            var r = t.comment || this.comment || "",
                                                n = p.generateWorker(this, t, r)
                                        } catch (e) {
                                            (n = new l("error")).error(e)
                                        }
                                        return new c(n, t.type || "string", t.mimeType)
                                    },
                                    generateAsync: function(e, t) {
                                        return this.generateInternalStream(e).accumulate(t)
                                    },
                                    generateNodeStream: function(e, t) {
                                        return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t)
                                    }
                                };
                                t.exports = e
                            }, {
                                "./compressedObject": 2,
                                "./defaults": 5,
                                "./generate": 9,
                                "./nodejs/NodejsStreamInputAdapter": 12,
                                "./nodejsUtils": 14,
                                "./stream/GenericWorker": 28,
                                "./stream/StreamHelper": 29,
                                "./utf8": 31,
                                "./utils": 32,
                                "./zipObject": 35
                            }],
                            16: [function(e, t, r) {
                                t.exports = e("stream")
                            }, {
                                stream: void 0
                            }],
                            17: [function(e, t, r) {
                                "use strict";
                                var n = e("./DataReader");

                                function i(e) {
                                    n.call(this, e);
                                    for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t]
                                }
                                e("../utils").inherits(i, n), i.prototype.byteAt = function(e) {
                                    return this.data[this.zero + e]
                                }, i.prototype.lastIndexOfSignature = function(e) {
                                    for (var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), o = this.length - 4; 0 <= o; --o)
                                        if (this.data[o] === t && this.data[o + 1] === r && this.data[o + 2] === n && this.data[o + 3] === i) return o - this.zero;
                                    return -1
                                }, i.prototype.readAndCheckSignature = function(e) {
                                    var t = e.charCodeAt(0),
                                        r = e.charCodeAt(1),
                                        n = e.charCodeAt(2),
                                        i = e.charCodeAt(3),
                                        e = this.readData(4);
                                    return t === e[0] && r === e[1] && n === e[2] && i === e[3]
                                }, i.prototype.readData = function(e) {
                                    if (this.checkOffset(e), 0 === e) return [];
                                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                                    return this.index += e, t
                                }, t.exports = i
                            }, {
                                "../utils": 32,
                                "./DataReader": 18
                            }],
                            18: [function(e, t, r) {
                                "use strict";
                                var n = e("../utils");

                                function i(e) {
                                    this.data = e, this.length = e.length, this.index = 0, this.zero = 0
                                }
                                i.prototype = {
                                    checkOffset: function(e) {
                                        this.checkIndex(this.index + e)
                                    },
                                    checkIndex: function(e) {
                                        if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
                                    },
                                    setIndex: function(e) {
                                        this.checkIndex(e), this.index = e
                                    },
                                    skip: function(e) {
                                        this.setIndex(this.index + e)
                                    },
                                    byteAt: function(e) {},
                                    readInt: function(e) {
                                        var t, r = 0;
                                        for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) r = (r << 8) + this.byteAt(t);
                                        return this.index += e, r
                                    },
                                    readString: function(e) {
                                        return n.transformTo("string", this.readData(e))
                                    },
                                    readData: function(e) {},
                                    lastIndexOfSignature: function(e) {},
                                    readAndCheckSignature: function(e) {},
                                    readDate: function() {
                                        var e = this.readInt(4);
                                        return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1))
                                    }
                                }, t.exports = i
                            }, {
                                "../utils": 32
                            }],
                            19: [function(e, t, r) {
                                "use strict";
                                var n = e("./Uint8ArrayReader");

                                function i(e) {
                                    n.call(this, e)
                                }
                                e("../utils").inherits(i, n), i.prototype.readData = function(e) {
                                    this.checkOffset(e);
                                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                                    return this.index += e, t
                                }, t.exports = i
                            }, {
                                "../utils": 32,
                                "./Uint8ArrayReader": 21
                            }],
                            20: [function(e, t, r) {
                                "use strict";
                                var n = e("./DataReader");

                                function i(e) {
                                    n.call(this, e)
                                }
                                e("../utils").inherits(i, n), i.prototype.byteAt = function(e) {
                                    return this.data.charCodeAt(this.zero + e)
                                }, i.prototype.lastIndexOfSignature = function(e) {
                                    return this.data.lastIndexOf(e) - this.zero
                                }, i.prototype.readAndCheckSignature = function(e) {
                                    return e === this.readData(4)
                                }, i.prototype.readData = function(e) {
                                    this.checkOffset(e);
                                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                                    return this.index += e, t
                                }, t.exports = i
                            }, {
                                "../utils": 32,
                                "./DataReader": 18
                            }],
                            21: [function(e, t, r) {
                                "use strict";
                                var n = e("./ArrayReader");

                                function i(e) {
                                    n.call(this, e)
                                }
                                e("../utils").inherits(i, n), i.prototype.readData = function(e) {
                                    if (this.checkOffset(e), 0 === e) return new Uint8Array(0);
                                    var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
                                    return this.index += e, t
                                }, t.exports = i
                            }, {
                                "../utils": 32,
                                "./ArrayReader": 17
                            }],
                            22: [function(e, t, r) {
                                "use strict";
                                var n = e("../utils"),
                                    i = e("../support"),
                                    o = e("./ArrayReader"),
                                    a = e("./StringReader"),
                                    s = e("./NodeBufferReader"),
                                    u = e("./Uint8ArrayReader");
                                t.exports = function(e) {
                                    var t = n.getTypeOf(e);
                                    return n.checkSupport(t), "string" !== t || i.uint8array ? "nodebuffer" === t ? new s(e) : i.uint8array ? new u(n.transformTo("uint8array", e)) : new o(n.transformTo("array", e)) : new a(e)
                                }
                            }, {
                                "../support": 30,
                                "../utils": 32,
                                "./ArrayReader": 17,
                                "./NodeBufferReader": 19,
                                "./StringReader": 20,
                                "./Uint8ArrayReader": 21
                            }],
                            23: [function(e, t, r) {
                                "use strict";
                                r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\b"
                            }, {}],
                            24: [function(e, t, r) {
                                "use strict";
                                var n = e("./GenericWorker"),
                                    i = e("../utils");

                                function o(e) {
                                    n.call(this, "ConvertWorker to " + e), this.destType = e
                                }
                                i.inherits(o, n), o.prototype.processChunk = function(e) {
                                    this.push({
                                        data: i.transformTo(this.destType, e.data),
                                        meta: e.meta
                                    })
                                }, t.exports = o
                            }, {
                                "../utils": 32,
                                "./GenericWorker": 28
                            }],
                            25: [function(e, t, r) {
                                "use strict";
                                var n = e("./GenericWorker"),
                                    i = e("../crc32");

                                function o() {
                                    n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0)
                                }
                                e("../utils").inherits(o, n), o.prototype.processChunk = function(e) {
                                    this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e)
                                }, t.exports = o
                            }, {
                                "../crc32": 4,
                                "../utils": 32,
                                "./GenericWorker": 28
                            }],
                            26: [function(e, t, r) {
                                "use strict";
                                var n = e("../utils"),
                                    i = e("./GenericWorker");

                                function o(e) {
                                    i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0)
                                }
                                n.inherits(o, i), o.prototype.processChunk = function(e) {
                                    var t;
                                    e && (t = this.streamInfo[this.propName] || 0, this.streamInfo[this.propName] = t + e.data.length), i.prototype.processChunk.call(this, e)
                                }, t.exports = o
                            }, {
                                "../utils": 32,
                                "./GenericWorker": 28
                            }],
                            27: [function(e, t, r) {
                                "use strict";
                                var n = e("../utils"),
                                    i = e("./GenericWorker");

                                function o(e) {
                                    i.call(this, "DataWorker");
                                    var t = this;
                                    this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
                                        t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = n.getTypeOf(e), t.isPaused || t._tickAndRepeat()
                                    }, function(e) {
                                        t.error(e)
                                    })
                                }
                                n.inherits(o, i), o.prototype.cleanUp = function() {
                                    i.prototype.cleanUp.call(this), this.data = null
                                }, o.prototype.resume = function() {
                                    return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0)
                                }, o.prototype._tickAndRepeat = function() {
                                    this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
                                }, o.prototype._tick = function() {
                                    if (this.isPaused || this.isFinished) return !1;
                                    var e = null,
                                        t = Math.min(this.max, this.index + 16384);
                                    if (this.index >= this.max) return this.end();
                                    switch (this.type) {
                                        case "string":
                                            e = this.data.substring(this.index, t);
                                            break;
                                        case "uint8array":
                                            e = this.data.subarray(this.index, t);
                                            break;
                                        case "array":
                                        case "nodebuffer":
                                            e = this.data.slice(this.index, t)
                                    }
                                    return this.index = t, this.push({
                                        data: e,
                                        meta: {
                                            percent: this.max ? this.index / this.max * 100 : 0
                                        }
                                    })
                                }, t.exports = o
                            }, {
                                "../utils": 32,
                                "./GenericWorker": 28
                            }],
                            28: [function(e, t, r) {
                                "use strict";

                                function n(e) {
                                    this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
                                        data: [],
                                        end: [],
                                        error: []
                                    }, this.previous = null
                                }
                                n.prototype = {
                                    push: function(e) {
                                        this.emit("data", e)
                                    },
                                    end: function() {
                                        if (this.isFinished) return !1;
                                        this.flush();
                                        try {
                                            this.emit("end"), this.cleanUp(), this.isFinished = !0
                                        } catch (e) {
                                            this.emit("error", e)
                                        }
                                        return !0
                                    },
                                    error: function(e) {
                                        return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0)
                                    },
                                    on: function(e, t) {
                                        return this._listeners[e].push(t), this
                                    },
                                    cleanUp: function() {
                                        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = []
                                    },
                                    emit: function(e, t) {
                                        if (this._listeners[e])
                                            for (var r = 0; r < this._listeners[e].length; r++) this._listeners[e][r].call(this, t)
                                    },
                                    pipe: function(e) {
                                        return e.registerPrevious(this)
                                    },
                                    registerPrevious: function(e) {
                                        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                                        this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
                                        var t = this;
                                        return e.on("data", function(e) {
                                            t.processChunk(e)
                                        }), e.on("end", function() {
                                            t.end()
                                        }), e.on("error", function(e) {
                                            t.error(e)
                                        }), this
                                    },
                                    pause: function() {
                                        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
                                    },
                                    resume: function() {
                                        if (!this.isPaused || this.isFinished) return !1;
                                        var e = this.isPaused = !1;
                                        return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e
                                    },
                                    flush: function() {},
                                    processChunk: function(e) {
                                        this.push(e)
                                    },
                                    withStreamInfo: function(e, t) {
                                        return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this
                                    },
                                    mergeStreamInfo: function() {
                                        for (var e in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(e) && (this.streamInfo[e] = this.extraStreamInfo[e])
                                    },
                                    lock: function() {
                                        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                                        this.isLocked = !0, this.previous && this.previous.lock()
                                    },
                                    toString: function() {
                                        var e = "Worker " + this.name;
                                        return this.previous ? this.previous + " -> " + e : e
                                    }
                                }, t.exports = n
                            }, {}],
                            29: [function(e, t, r) {
                                "use strict";
                                var l = e("../utils"),
                                    i = e("./ConvertWorker"),
                                    o = e("./GenericWorker"),
                                    c = e("../base64"),
                                    n = e("../support"),
                                    a = e("../external"),
                                    s = null;
                                if (n.nodestream) try {
                                    s = e("../nodejs/NodejsStreamOutputAdapter")
                                } catch (e) {}

                                function u(e, t, r) {
                                    var n = t;
                                    switch (t) {
                                        case "blob":
                                        case "arraybuffer":
                                            n = "uint8array";
                                            break;
                                        case "base64":
                                            n = "string"
                                    }
                                    try {
                                        this._internalType = n, this._outputType = t, this._mimeType = r, l.checkSupport(n), this._worker = e.pipe(new i(n)), e.lock()
                                    } catch (e) {
                                        this._worker = new o("error"), this._worker.error(e)
                                    }
                                }
                                u.prototype = {
                                    accumulate: function(e) {
                                        return s = this, u = e, new a.Promise(function(t, r) {
                                            var n = [],
                                                i = s._internalType,
                                                o = s._outputType,
                                                a = s._mimeType;
                                            s.on("data", function(e, t) {
                                                n.push(e), u && u(t)
                                            }).on("error", function(e) {
                                                n = [], r(e)
                                            }).on("end", function() {
                                                try {
                                                    var e = function(e, t, r) {
                                                        switch (e) {
                                                            case "blob":
                                                                return l.newBlob(l.transformTo("arraybuffer", t), r);
                                                            case "base64":
                                                                return c.encode(t);
                                                            default:
                                                                return l.transformTo(e, t)
                                                        }
                                                    }(o, function(e, t) {
                                                        for (var r = 0, n = null, i = 0, o = 0; o < t.length; o++) i += t[o].length;
                                                        switch (e) {
                                                            case "string":
                                                                return t.join("");
                                                            case "array":
                                                                return Array.prototype.concat.apply([], t);
                                                            case "uint8array":
                                                                for (n = new Uint8Array(i), o = 0; o < t.length; o++) n.set(t[o], r), r += t[o].length;
                                                                return n;
                                                            case "nodebuffer":
                                                                return f.concat(t);
                                                            default:
                                                                throw new Error("concat : unsupported type '" + e + "'")
                                                        }
                                                    }(i, n), a);
                                                    t(e)
                                                } catch (e) {
                                                    r(e)
                                                }
                                                n = []
                                            }).resume()
                                        });
                                        var s, u
                                    },
                                    on: function(e, t) {
                                        var r = this;
                                        return "data" === e ? this._worker.on(e, function(e) {
                                            t.call(r, e.data, e.meta)
                                        }) : this._worker.on(e, function() {
                                            l.delay(t, arguments, r)
                                        }), this
                                    },
                                    resume: function() {
                                        return l.delay(this._worker.resume, [], this._worker), this
                                    },
                                    pause: function() {
                                        return this._worker.pause(), this
                                    },
                                    toNodejsStream: function(e) {
                                        if (l.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
                                        return new s(this, {
                                            objectMode: "nodebuffer" !== this._outputType
                                        }, e)
                                    }
                                }, t.exports = u
                            }, {
                                "../base64": 1,
                                "../external": 6,
                                "../nodejs/NodejsStreamOutputAdapter": 13,
                                "../support": 30,
                                "../utils": 32,
                                "./ConvertWorker": 24,
                                "./GenericWorker": 28
                            }],
                            30: [function(e, t, r) {
                                "use strict";
                                if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = void 0 !== f, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = !1;
                                else {
                                    var n = new ArrayBuffer(0);
                                    try {
                                        r.blob = 0 === new Blob([n], {
                                            type: "application/zip"
                                        }).size
                                    } catch (e) {
                                        try {
                                            var i = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                                            i.append(n), r.blob = 0 === i.getBlob("application/zip").size
                                        } catch (e) {
                                            r.blob = !1
                                        }
                                    }
                                }
                                try {
                                    r.nodestream = !!e("readable-stream").Readable
                                } catch (e) {
                                    r.nodestream = !1
                                }
                            }, {
                                "readable-stream": 16
                            }],
                            31: [function(e, t, i) {
                                "use strict";
                                for (var s = e("./utils"), u = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), l = new Array(256), o = 0; o < 256; o++) l[o] = 252 <= o ? 6 : 248 <= o ? 5 : 240 <= o ? 4 : 224 <= o ? 3 : 192 <= o ? 2 : 1;

                                function a() {
                                    n.call(this, "utf-8 decode"), this.leftOver = null
                                }

                                function c() {
                                    n.call(this, "utf-8 encode")
                                }
                                l[254] = l[254] = 1, i.utf8encode = function(e) {
                                    return u.nodebuffer ? r.newBufferFrom(e, "utf-8") : function(e) {
                                        for (var t, r, n, i, o = e.length, a = 0, s = 0; s < o; s++) 55296 == (64512 & (r = e.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = e.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), s++), a += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                                        for (t = new(u.uint8array ? Uint8Array : Array)(a), s = i = 0; i < a; s++) 55296 == (64512 & (r = e.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = e.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), s++), r < 128 ? t[i++] = r : (r < 2048 ? t[i++] = 192 | r >>> 6 : (r < 65536 ? t[i++] = 224 | r >>> 12 : (t[i++] = 240 | r >>> 18, t[i++] = 128 | r >>> 12 & 63), t[i++] = 128 | r >>> 6 & 63), t[i++] = 128 | 63 & r);
                                        return t
                                    }(e)
                                }, i.utf8decode = function(e) {
                                    return u.nodebuffer ? s.transformTo("nodebuffer", e).toString("utf-8") : function(e) {
                                        for (var t, r, n, i = e.length, o = new Array(2 * i), a = t = 0; a < i;)
                                            if ((r = e[a++]) < 128) o[t++] = r;
                                            else if (4 < (n = l[r])) o[t++] = 65533, a += n - 1;
                                        else {
                                            for (r &= 2 === n ? 31 : 3 === n ? 15 : 7; 1 < n && a < i;) r = r << 6 | 63 & e[a++], n--;
                                            1 < n ? o[t++] = 65533 : r < 65536 ? o[t++] = r : (r -= 65536, o[t++] = 55296 | r >> 10 & 1023, o[t++] = 56320 | 1023 & r)
                                        }
                                        return o.length !== t && (o.subarray ? o = o.subarray(0, t) : o.length = t), s.applyFromCharCode(o)
                                    }(e = s.transformTo(u.uint8array ? "uint8array" : "array", e))
                                }, s.inherits(a, n), a.prototype.processChunk = function(e) {
                                    var t = s.transformTo(u.uint8array ? "uint8array" : "array", e.data);
                                    this.leftOver && this.leftOver.length && (u.uint8array ? (n = t, (t = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), t.set(n, this.leftOver.length)) : t = this.leftOver.concat(t), this.leftOver = null);
                                    var r = function(e, t) {
                                            for (var r = (t = (t = t || e.length) > e.length ? e.length : t) - 1; 0 <= r && 128 == (192 & e[r]);) r--;
                                            return !(r < 0) && 0 !== r && r + l[e[r]] > t ? r : t
                                        }(t),
                                        n = t;
                                    r !== t.length && (u.uint8array ? (n = t.subarray(0, r), this.leftOver = t.subarray(r, t.length)) : (n = t.slice(0, r), this.leftOver = t.slice(r, t.length))), this.push({
                                        data: i.utf8decode(n),
                                        meta: e.meta
                                    })
                                }, a.prototype.flush = function() {
                                    this.leftOver && this.leftOver.length && (this.push({
                                        data: i.utf8decode(this.leftOver),
                                        meta: {}
                                    }), this.leftOver = null)
                                }, i.Utf8DecodeWorker = a, s.inherits(c, n), c.prototype.processChunk = function(e) {
                                    this.push({
                                        data: i.utf8encode(e.data),
                                        meta: e.meta
                                    })
                                }, i.Utf8EncodeWorker = c
                            }, {
                                "./nodejsUtils": 14,
                                "./stream/GenericWorker": 28,
                                "./support": 30,
                                "./utils": 32
                            }],
                            32: [function(e, t, a) {
                                "use strict";
                                var s = e("./support"),
                                    u = e("./base64"),
                                    r = e("./nodejsUtils"),
                                    n = e("set-immediate-shim"),
                                    l = e("./external");

                                function i(e) {
                                    return e
                                }

                                function c(e, t) {
                                    for (var r = 0; r < e.length; ++r) t[r] = 255 & e.charCodeAt(r);
                                    return t
                                }
                                a.newBlob = function(t, r) {
                                    a.checkSupport("blob");
                                    try {
                                        return new Blob([t], {
                                            type: r
                                        })
                                    } catch (e) {
                                        try {
                                            var n = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                                            return n.append(t), n.getBlob(r)
                                        } catch (e) {
                                            throw new Error("Bug : can't construct the Blob.")
                                        }
                                    }
                                };
                                var o = {
                                    stringifyByChunk: function(e, t, r) {
                                        var n = [],
                                            i = 0,
                                            o = e.length;
                                        if (o <= r) return String.fromCharCode.apply(null, e);
                                        for (; i < o;) "array" === t || "nodebuffer" === t ? n.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + r, o)))) : n.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + r, o)))), i += r;
                                        return n.join("")
                                    },
                                    stringifyByChar: function(e) {
                                        for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
                                        return t
                                    },
                                    applyCanBeUsed: {
                                        uint8array: function() {
                                            try {
                                                return s.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
                                            } catch (e) {
                                                return !1
                                            }
                                        }(),
                                        nodebuffer: function() {
                                            try {
                                                return s.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length
                                            } catch (e) {
                                                return !1
                                            }
                                        }()
                                    }
                                };

                                function f(e) {
                                    var t = 65536,
                                        r = a.getTypeOf(e),
                                        n = !0;
                                    if ("uint8array" === r ? n = o.applyCanBeUsed.uint8array : "nodebuffer" === r && (n = o.applyCanBeUsed.nodebuffer), n)
                                        for (; 1 < t;) try {
                                            return o.stringifyByChunk(e, r, t)
                                        } catch (e) {
                                            t = Math.floor(t / 2)
                                        }
                                    return o.stringifyByChar(e)
                                }

                                function h(e, t) {
                                    for (var r = 0; r < e.length; r++) t[r] = e[r];
                                    return t
                                }
                                a.applyFromCharCode = f;
                                var d = {};
                                d.string = {
                                    string: i,
                                    array: function(e) {
                                        return c(e, new Array(e.length))
                                    },
                                    arraybuffer: function(e) {
                                        return d.string.uint8array(e).buffer
                                    },
                                    uint8array: function(e) {
                                        return c(e, new Uint8Array(e.length))
                                    },
                                    nodebuffer: function(e) {
                                        return c(e, r.allocBuffer(e.length))
                                    }
                                }, d.array = {
                                    string: f,
                                    array: i,
                                    arraybuffer: function(e) {
                                        return new Uint8Array(e).buffer
                                    },
                                    uint8array: function(e) {
                                        return new Uint8Array(e)
                                    },
                                    nodebuffer: function(e) {
                                        return r.newBufferFrom(e)
                                    }
                                }, d.arraybuffer = {
                                    string: function(e) {
                                        return f(new Uint8Array(e))
                                    },
                                    array: function(e) {
                                        return h(new Uint8Array(e), new Array(e.byteLength))
                                    },
                                    arraybuffer: i,
                                    uint8array: function(e) {
                                        return new Uint8Array(e)
                                    },
                                    nodebuffer: function(e) {
                                        return r.newBufferFrom(new Uint8Array(e))
                                    }
                                }, d.uint8array = {
                                    string: f,
                                    array: function(e) {
                                        return h(e, new Array(e.length))
                                    },
                                    arraybuffer: function(e) {
                                        return e.buffer
                                    },
                                    uint8array: i,
                                    nodebuffer: function(e) {
                                        return r.newBufferFrom(e)
                                    }
                                }, d.nodebuffer = {
                                    string: f,
                                    array: function(e) {
                                        return h(e, new Array(e.length))
                                    },
                                    arraybuffer: function(e) {
                                        return d.nodebuffer.uint8array(e).buffer
                                    },
                                    uint8array: function(e) {
                                        return h(e, new Uint8Array(e.length))
                                    },
                                    nodebuffer: i
                                }, a.transformTo = function(e, t) {
                                    if (t = t || "", !e) return t;
                                    a.checkSupport(e);
                                    var r = a.getTypeOf(t);
                                    return d[r][e](t)
                                }, a.getTypeOf = function(e) {
                                    return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : s.nodebuffer && r.isBuffer(e) ? "nodebuffer" : s.uint8array && e instanceof Uint8Array ? "uint8array" : s.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0
                                }, a.checkSupport = function(e) {
                                    if (!s[e.toLowerCase()]) throw new Error(e + " is not supported by this platform")
                                }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e) {
                                    for (var t, r = "", n = 0; n < (e || "").length; n++) r += "\\x" + ((t = e.charCodeAt(n)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
                                    return r
                                }, a.delay = function(e, t, r) {
                                    n(function() {
                                        e.apply(r || null, t || [])
                                    })
                                }, a.inherits = function(e, t) {
                                    function r() {}
                                    r.prototype = t.prototype, e.prototype = new r
                                }, a.extend = function() {
                                    for (var e, t = {}, r = 0; r < arguments.length; r++)
                                        for (e in arguments[r]) arguments[r].hasOwnProperty(e) && void 0 === t[e] && (t[e] = arguments[r][e]);
                                    return t
                                }, a.prepareContent = function(r, e, n, i, o) {
                                    return l.Promise.resolve(e).then(function(n) {
                                        return s.blob && (n instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n))) && "undefined" != typeof FileReader ? new l.Promise(function(t, r) {
                                            var e = new FileReader;
                                            e.onload = function(e) {
                                                t(e.target.result)
                                            }, e.onerror = function(e) {
                                                r(e.target.error)
                                            }, e.readAsArrayBuffer(n)
                                        }) : n
                                    }).then(function(e) {
                                        var t = a.getTypeOf(e);
                                        return t ? ("arraybuffer" === t ? e = a.transformTo("uint8array", e) : "string" === t && (o ? e = u.decode(e) : n && !0 !== i && (e = c(t = e, new(s.uint8array ? Uint8Array : Array)(t.length)))), e) : l.Promise.reject(new Error("Can't read the data of '" + r + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
                                    })
                                }
                            }, {
                                "./base64": 1,
                                "./external": 6,
                                "./nodejsUtils": 14,
                                "./support": 30,
                                "set-immediate-shim": 54
                            }],
                            33: [function(e, t, r) {
                                "use strict";
                                var n = e("./reader/readerFor"),
                                    i = e("./utils"),
                                    o = e("./signature"),
                                    a = e("./zipEntry"),
                                    s = (e("./utf8"), e("./support"));

                                function u(e) {
                                    this.files = [], this.loadOptions = e
                                }
                                u.prototype = {
                                    checkSignature: function(e) {
                                        if (!this.reader.readAndCheckSignature(e)) {
                                            this.reader.index -= 4;
                                            var t = this.reader.readString(4);
                                            throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")")
                                        }
                                    },
                                    isSignature: function(e, t) {
                                        var r = this.reader.index;
                                        this.reader.setIndex(e);
                                        t = this.reader.readString(4) === t;
                                        return this.reader.setIndex(r), t
                                    },
                                    readBlockEndOfCentral: function() {
                                        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                                        var e = this.reader.readData(this.zipCommentLength),
                                            t = s.uint8array ? "uint8array" : "array",
                                            e = i.transformTo(t, e);
                                        this.zipComment = this.loadOptions.decodeFileName(e)
                                    },
                                    readBlockZip64EndOfCentral: function() {
                                        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                                        for (var e, t, r, n = this.zip64EndOfCentralSize - 44; 0 < n;) e = this.reader.readInt(2), t = this.reader.readInt(4), r = this.reader.readData(t), this.zip64ExtensibleData[e] = {
                                            id: e,
                                            length: t,
                                            value: r
                                        }
                                    },
                                    readBlockZip64EndOfCentralLocator: function() {
                                        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported")
                                    },
                                    readLocalFiles: function() {
                                        for (var e, t = 0; t < this.files.length; t++) e = this.files[t], this.reader.setIndex(e.localHeaderOffset), this.checkSignature(o.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes()
                                    },
                                    readCentralDir: function() {
                                        var e;
                                        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);)(e = new a({
                                            zip64: this.zip64
                                        }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
                                        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                                    },
                                    readEndOfCentral: function() {
                                        var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
                                        if (e < 0) throw this.isSignature(0, o.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                                        this.reader.setIndex(e);
                                        var t = e;
                                        if (this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
                                            if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                                            if (this.reader.setIndex(e), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, o.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                                            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
                                        }
                                        e = this.centralDirOffset + this.centralDirSize;
                                        this.zip64 && (e += 20, e += 12 + this.zip64EndOfCentralSize);
                                        e = t - e;
                                        if (0 < e) this.isSignature(t, o.CENTRAL_FILE_HEADER) || (this.reader.zero = e);
                                        else if (e < 0) throw new Error("Corrupted zip: missing " + Math.abs(e) + " bytes.")
                                    },
                                    prepareReader: function(e) {
                                        this.reader = n(e)
                                    },
                                    load: function(e) {
                                        this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
                                    }
                                }, t.exports = u
                            }, {
                                "./reader/readerFor": 22,
                                "./signature": 23,
                                "./support": 30,
                                "./utf8": 31,
                                "./utils": 32,
                                "./zipEntry": 34
                            }],
                            34: [function(e, t, r) {
                                "use strict";
                                var n = e("./reader/readerFor"),
                                    i = e("./utils"),
                                    o = e("./compressedObject"),
                                    a = e("./crc32"),
                                    s = e("./utf8"),
                                    u = e("./compressions"),
                                    l = e("./support");

                                function c(e, t) {
                                    this.options = e, this.loadOptions = t
                                }
                                c.prototype = {
                                    isEncrypted: function() {
                                        return 1 == (1 & this.bitFlag)
                                    },
                                    useUTF8: function() {
                                        return 2048 == (2048 & this.bitFlag)
                                    },
                                    readLocalPart: function(e) {
                                        var t;
                                        if (e.skip(22), this.fileNameLength = e.readInt(2), t = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(t), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                                        if (null === (t = function(e) {
                                                for (var t in u)
                                                    if (u.hasOwnProperty(t) && u[t].magic === e) return u[t];
                                                return null
                                            }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + i.pretty(this.compressionMethod) + " unknown (inner file : " + i.transformTo("string", this.fileName) + ")");
                                        this.decompressed = new o(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize))
                                    },
                                    readCentralPart: function(e) {
                                        this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
                                        var t = e.readInt(2);
                                        if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                                        e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength)
                                    },
                                    processAttributes: function() {
                                        this.unixPermissions = null, this.dosPermissions = null;
                                        var e = this.versionMadeBy >> 8;
                                        this.dir = !!(16 & this.externalFileAttributes), 0 == e && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
                                    },
                                    parseZIP64ExtraField: function(e) {
                                        var t;
                                        this.extraFields[1] && (t = n(this.extraFields[1].value), this.uncompressedSize === i.MAX_VALUE_32BITS && (this.uncompressedSize = t.readInt(8)), this.compressedSize === i.MAX_VALUE_32BITS && (this.compressedSize = t.readInt(8)), this.localHeaderOffset === i.MAX_VALUE_32BITS && (this.localHeaderOffset = t.readInt(8)), this.diskNumberStart === i.MAX_VALUE_32BITS && (this.diskNumberStart = t.readInt(4)))
                                    },
                                    readExtraFields: function(e) {
                                        var t, r, n, i = e.index + this.extraFieldsLength;
                                        for (this.extraFields || (this.extraFields = {}); e.index + 4 < i;) t = e.readInt(2), r = e.readInt(2), n = e.readData(r), this.extraFields[t] = {
                                            id: t,
                                            length: r,
                                            value: n
                                        };
                                        e.setIndex(i)
                                    },
                                    handleUTF8: function() {
                                        var e, t, r = l.uint8array ? "uint8array" : "array";
                                        this.useUTF8() ? (this.fileNameStr = s.utf8decode(this.fileName), this.fileCommentStr = s.utf8decode(this.fileComment)) : (null !== (e = this.findExtraFieldUnicodePath()) ? this.fileNameStr = e : (t = i.transformTo(r, this.fileName), this.fileNameStr = this.loadOptions.decodeFileName(t)), null !== (t = this.findExtraFieldUnicodeComment()) ? this.fileCommentStr = t : (r = i.transformTo(r, this.fileComment), this.fileCommentStr = this.loadOptions.decodeFileName(r)))
                                    },
                                    findExtraFieldUnicodePath: function() {
                                        var e = this.extraFields[28789];
                                        if (e) {
                                            var t = n(e.value);
                                            return 1 !== t.readInt(1) || a(this.fileName) !== t.readInt(4) ? null : s.utf8decode(t.readData(e.length - 5))
                                        }
                                        return null
                                    },
                                    findExtraFieldUnicodeComment: function() {
                                        var e = this.extraFields[25461];
                                        if (e) {
                                            var t = n(e.value);
                                            return 1 !== t.readInt(1) || a(this.fileComment) !== t.readInt(4) ? null : s.utf8decode(t.readData(e.length - 5))
                                        }
                                        return null
                                    }
                                }, t.exports = c
                            }, {
                                "./compressedObject": 2,
                                "./compressions": 3,
                                "./crc32": 4,
                                "./reader/readerFor": 22,
                                "./support": 30,
                                "./utf8": 31,
                                "./utils": 32
                            }],
                            35: [function(e, t, r) {
                                "use strict";

                                function n(e, t, r) {
                                    this.name = e, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = t, this._dataBinary = r.binary, this.options = {
                                        compression: r.compression,
                                        compressionOptions: r.compressionOptions
                                    }
                                }
                                var o = e("./stream/StreamHelper"),
                                    i = e("./stream/DataWorker"),
                                    a = e("./utf8"),
                                    s = e("./compressedObject"),
                                    u = e("./stream/GenericWorker");
                                n.prototype = {
                                    internalStream: function(e) {
                                        var t = null,
                                            r = "string";
                                        try {
                                            if (!e) throw new Error("No output type specified.");
                                            var n = "string" === (r = e.toLowerCase()) || "text" === r;
                                            "binarystring" !== r && "text" !== r || (r = "string");
                                            var t = this._decompressWorker(),
                                                i = !this._dataBinary;
                                            i && !n && (t = t.pipe(new a.Utf8EncodeWorker)), !i && n && (t = t.pipe(new a.Utf8DecodeWorker))
                                        } catch (e) {
                                            (t = new u("error")).error(e)
                                        }
                                        return new o(t, r, "")
                                    },
                                    async: function(e, t) {
                                        return this.internalStream(e).accumulate(t)
                                    },
                                    nodeStream: function(e, t) {
                                        return this.internalStream(e || "nodebuffer").toNodejsStream(t)
                                    },
                                    _compressWorker: function(e, t) {
                                        if (this._data instanceof s && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
                                        var r = this._decompressWorker();
                                        return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker)), s.createWorkerFrom(r, e, t)
                                    },
                                    _decompressWorker: function() {
                                        return this._data instanceof s ? this._data.getContentWorker() : this._data instanceof u ? this._data : new i(this._data)
                                    }
                                };
                                for (var l = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], c = function() {
                                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                                    }, f = 0; f < l.length; f++) n.prototype[l[f]] = c;
                                t.exports = n
                            }, {
                                "./compressedObject": 2,
                                "./stream/DataWorker": 27,
                                "./stream/GenericWorker": 28,
                                "./stream/StreamHelper": 29,
                                "./utf8": 31
                            }],
                            36: [function(e, l, t) {
                                ! function(t) {
                                    "use strict";
                                    var n, e, r, i, o = t.MutationObserver || t.WebKitMutationObserver,
                                        a = o ? (e = 0, o = new o(u), r = t.document.createTextNode(""), o.observe(r, {
                                            characterData: !0
                                        }), function() {
                                            r.data = e = ++e % 2
                                        }) : t.setImmediate || void 0 === t.MessageChannel ? "document" in t && "onreadystatechange" in t.document.createElement("script") ? function() {
                                            var e = t.document.createElement("script");
                                            e.onreadystatechange = function() {
                                                u(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null
                                            }, t.document.documentElement.appendChild(e)
                                        } : function() {
                                            setTimeout(u, 0)
                                        } : ((i = new t.MessageChannel).port1.onmessage = u, function() {
                                            i.port2.postMessage(0)
                                        }),
                                        s = [];

                                    function u() {
                                        var e, t;
                                        n = !0;
                                        for (var r = s.length; r;) {
                                            for (t = s, s = [], e = -1; ++e < r;) t[e]();
                                            r = s.length
                                        }
                                        n = !1
                                    }
                                    l.exports = function(e) {
                                        1 !== s.push(e) || n || a()
                                    }
                                }.call(this, void 0 !== r ? r : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                            }, {}],
                            37: [function(e, t, r) {
                                "use strict";
                                var i = e("immediate");

                                function u() {}
                                var l = {},
                                    o = ["REJECTED"],
                                    a = ["FULFILLED"],
                                    n = ["PENDING"];

                                function s(e) {
                                    if ("function" != typeof e) throw new TypeError("resolver must be a function");
                                    this.state = n, this.queue = [], this.outcome = void 0, e !== u && d(this, e)
                                }

                                function c(e, t, r) {
                                    this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected)
                                }

                                function f(t, r, n) {
                                    i(function() {
                                        var e;
                                        try {
                                            e = r(n)
                                        } catch (e) {
                                            return l.reject(t, e)
                                        }
                                        e === t ? l.reject(t, new TypeError("Cannot resolve promise with itself")) : l.resolve(t, e)
                                    })
                                }

                                function h(e) {
                                    var t = e && e.then;
                                    if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
                                        t.apply(e, arguments)
                                    }
                                }

                                function d(t, e) {
                                    var r = !1;

                                    function n(e) {
                                        r || (r = !0, l.reject(t, e))
                                    }

                                    function i(e) {
                                        r || (r = !0, l.resolve(t, e))
                                    }
                                    var o = p(function() {
                                        e(i, n)
                                    });
                                    "error" === o.status && n(o.value)
                                }

                                function p(e, t) {
                                    var r = {};
                                    try {
                                        r.value = e(t), r.status = "success"
                                    } catch (e) {
                                        r.status = "error", r.value = e
                                    }
                                    return r
                                }(t.exports = s).prototype.finally = function(t) {
                                    if ("function" != typeof t) return this;
                                    var r = this.constructor;
                                    return this.then(function(e) {
                                        return r.resolve(t()).then(function() {
                                            return e
                                        })
                                    }, function(e) {
                                        return r.resolve(t()).then(function() {
                                            throw e
                                        })
                                    })
                                }, s.prototype.catch = function(e) {
                                    return this.then(null, e)
                                }, s.prototype.then = function(e, t) {
                                    if ("function" != typeof e && this.state === a || "function" != typeof t && this.state === o) return this;
                                    var r = new this.constructor(u);
                                    return this.state !== n ? f(r, this.state === a ? e : t, this.outcome) : this.queue.push(new c(r, e, t)), r
                                }, c.prototype.callFulfilled = function(e) {
                                    l.resolve(this.promise, e)
                                }, c.prototype.otherCallFulfilled = function(e) {
                                    f(this.promise, this.onFulfilled, e)
                                }, c.prototype.callRejected = function(e) {
                                    l.reject(this.promise, e)
                                }, c.prototype.otherCallRejected = function(e) {
                                    f(this.promise, this.onRejected, e)
                                }, l.resolve = function(e, t) {
                                    var r = p(h, t);
                                    if ("error" === r.status) return l.reject(e, r.value);
                                    r = r.value;
                                    if (r) d(e, r);
                                    else {
                                        e.state = a, e.outcome = t;
                                        for (var n = -1, i = e.queue.length; ++n < i;) e.queue[n].callFulfilled(t)
                                    }
                                    return e
                                }, l.reject = function(e, t) {
                                    e.state = o, e.outcome = t;
                                    for (var r = -1, n = e.queue.length; ++r < n;) e.queue[r].callRejected(t);
                                    return e
                                }, s.resolve = function(e) {
                                    return e instanceof this ? e : l.resolve(new this(u), e)
                                }, s.reject = function(e) {
                                    var t = new this(u);
                                    return l.reject(t, e)
                                }, s.all = function(e) {
                                    var r = this;
                                    if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                                    var n = e.length,
                                        i = !1;
                                    if (!n) return this.resolve([]);
                                    for (var o = new Array(n), a = 0, t = -1, s = new this(u); ++t < n;) ! function(e, t) {
                                        r.resolve(e).then(function(e) {
                                            o[t] = e, ++a !== n || i || (i = !0, l.resolve(s, o))
                                        }, function(e) {
                                            i || (i = !0, l.reject(s, e))
                                        })
                                    }(e[t], t);
                                    return s
                                }, s.race = function(e) {
                                    if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                                    var t = e.length,
                                        r = !1;
                                    if (!t) return this.resolve([]);
                                    for (var n, i = -1, o = new this(u); ++i < t;) n = e[i], this.resolve(n).then(function(e) {
                                        r || (r = !0, l.resolve(o, e))
                                    }, function(e) {
                                        r || (r = !0, l.reject(o, e))
                                    });
                                    return o
                                }
                            }, {
                                immediate: 36
                            }],
                            38: [function(e, t, r) {
                                "use strict";
                                var n = {};
                                (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n
                            }, {
                                "./lib/deflate": 39,
                                "./lib/inflate": 40,
                                "./lib/utils/common": 41,
                                "./lib/zlib/constants": 44
                            }],
                            39: [function(e, t, r) {
                                "use strict";
                                var a = e("./zlib/deflate"),
                                    s = e("./utils/common"),
                                    u = e("./utils/strings"),
                                    n = e("./zlib/messages"),
                                    i = e("./zlib/zstream"),
                                    l = Object.prototype.toString;

                                function o(e) {
                                    if (!(this instanceof o)) return new o(e);
                                    this.options = s.assign({
                                        level: -1,
                                        method: 8,
                                        chunkSize: 16384,
                                        windowBits: 15,
                                        memLevel: 8,
                                        strategy: 0,
                                        to: ""
                                    }, e || {});
                                    var t = this.options;
                                    t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i, this.strm.avail_out = 0;
                                    e = a.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
                                    if (0 !== e) throw new Error(n[e]);
                                    if (t.header && a.deflateSetHeader(this.strm, t.header), t.dictionary) {
                                        t = "string" == typeof t.dictionary ? u.string2buf(t.dictionary) : "[object ArrayBuffer]" === l.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary;
                                        if (0 !== (e = a.deflateSetDictionary(this.strm, t))) throw new Error(n[e]);
                                        this._dict_set = !0
                                    }
                                }

                                function c(e, t) {
                                    t = new o(t);
                                    if (t.push(e, !0), t.err) throw t.msg || n[t.err];
                                    return t.result
                                }
                                o.prototype.push = function(e, t) {
                                    var r, n, i = this.strm,
                                        o = this.options.chunkSize;
                                    if (this.ended) return !1;
                                    n = t === ~~t ? t : !0 === t ? 4 : 0, "string" == typeof e ? i.input = u.string2buf(e) : "[object ArrayBuffer]" === l.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;
                                    do {
                                        if (0 === i.avail_out && (i.output = new s.Buf8(o), i.next_out = 0, i.avail_out = o), 1 !== (r = a.deflate(i, n)) && 0 !== r) return this.onEnd(r), !(this.ended = !0)
                                    } while (0 !== i.avail_out && (0 !== i.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(u.buf2binstring(s.shrinkBuf(i.output, i.next_out))) : this.onData(s.shrinkBuf(i.output, i.next_out))), (0 < i.avail_in || 0 === i.avail_out) && 1 !== r);
                                    return 4 === n ? (r = a.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, 0 === r) : 2 !== n || (this.onEnd(0), !(i.avail_out = 0))
                                }, o.prototype.onData = function(e) {
                                    this.chunks.push(e)
                                }, o.prototype.onEnd = function(e) {
                                    0 === e && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                                }, r.Deflate = o, r.deflate = c, r.deflateRaw = function(e, t) {
                                    return (t = t || {}).raw = !0, c(e, t)
                                }, r.gzip = function(e, t) {
                                    return (t = t || {}).gzip = !0, c(e, t)
                                }
                            }, {
                                "./utils/common": 41,
                                "./utils/strings": 42,
                                "./zlib/deflate": 46,
                                "./zlib/messages": 51,
                                "./zlib/zstream": 53
                            }],
                            40: [function(e, t, r) {
                                "use strict";
                                var f = e("./zlib/inflate"),
                                    h = e("./utils/common"),
                                    d = e("./utils/strings"),
                                    p = e("./zlib/constants"),
                                    n = e("./zlib/messages"),
                                    i = e("./zlib/zstream"),
                                    o = e("./zlib/gzheader"),
                                    _ = Object.prototype.toString;

                                function a(e) {
                                    if (!(this instanceof a)) return new a(e);
                                    this.options = h.assign({
                                        chunkSize: 16384,
                                        windowBits: 0,
                                        to: ""
                                    }, e || {});
                                    var t = this.options;
                                    t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i, this.strm.avail_out = 0;
                                    t = f.inflateInit2(this.strm, t.windowBits);
                                    if (t !== p.Z_OK) throw new Error(n[t]);
                                    this.header = new o, f.inflateGetHeader(this.strm, this.header)
                                }

                                function s(e, t) {
                                    t = new a(t);
                                    if (t.push(e, !0), t.err) throw t.msg || n[t.err];
                                    return t.result
                                }
                                a.prototype.push = function(e, t) {
                                    var r, n, i, o, a, s = this.strm,
                                        u = this.options.chunkSize,
                                        l = this.options.dictionary,
                                        c = !1;
                                    if (this.ended) return !1;
                                    n = t === ~~t ? t : !0 === t ? p.Z_FINISH : p.Z_NO_FLUSH, "string" == typeof e ? s.input = d.binstring2buf(e) : "[object ArrayBuffer]" === _.call(e) ? s.input = new Uint8Array(e) : s.input = e, s.next_in = 0, s.avail_in = s.input.length;
                                    do {
                                        if (0 === s.avail_out && (s.output = new h.Buf8(u), s.next_out = 0, s.avail_out = u), (r = f.inflate(s, p.Z_NO_FLUSH)) === p.Z_NEED_DICT && l && (a = "string" == typeof l ? d.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r = f.inflateSetDictionary(this.strm, a)), r === p.Z_BUF_ERROR && !0 === c && (r = p.Z_OK, c = !1), r !== p.Z_STREAM_END && r !== p.Z_OK) return this.onEnd(r), !(this.ended = !0)
                                    } while (s.next_out && (0 !== s.avail_out && r !== p.Z_STREAM_END && (0 !== s.avail_in || n !== p.Z_FINISH && n !== p.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = d.utf8border(s.output, s.next_out), o = s.next_out - i, a = d.buf2string(s.output, i), s.next_out = o, s.avail_out = u - o, o && h.arraySet(s.output, s.output, i, o, 0), this.onData(a)) : this.onData(h.shrinkBuf(s.output, s.next_out)))), 0 === s.avail_in && 0 === s.avail_out && (c = !0), (0 < s.avail_in || 0 === s.avail_out) && r !== p.Z_STREAM_END);
                                    return (n = r === p.Z_STREAM_END ? p.Z_FINISH : n) === p.Z_FINISH ? (r = f.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === p.Z_OK) : n !== p.Z_SYNC_FLUSH || (this.onEnd(p.Z_OK), !(s.avail_out = 0))
                                }, a.prototype.onData = function(e) {
                                    this.chunks.push(e)
                                }, a.prototype.onEnd = function(e) {
                                    e === p.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = h.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                                }, r.Inflate = a, r.inflate = s, r.inflateRaw = function(e, t) {
                                    return (t = t || {}).raw = !0, s(e, t)
                                }, r.ungzip = s
                            }, {
                                "./utils/common": 41,
                                "./utils/strings": 42,
                                "./zlib/constants": 44,
                                "./zlib/gzheader": 47,
                                "./zlib/inflate": 49,
                                "./zlib/messages": 51,
                                "./zlib/zstream": 53
                            }],
                            41: [function(e, t, r) {
                                "use strict";
                                var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                                r.assign = function(e) {
                                    for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                                        var r = t.shift();
                                        if (r) {
                                            if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                                            for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                                        }
                                    }
                                    return e
                                }, r.shrinkBuf = function(e, t) {
                                    return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                                };
                                var i = {
                                        arraySet: function(e, t, r, n, i) {
                                            if (t.subarray && e.subarray) e.set(t.subarray(r, r + n), i);
                                            else
                                                for (var o = 0; o < n; o++) e[i + o] = t[r + o]
                                        },
                                        flattenChunks: function(e) {
                                            for (var t, r, n, i, o = t = 0, a = e.length; o < a; o++) t += e[o].length;
                                            for (i = new Uint8Array(t), o = r = 0, a = e.length; o < a; o++) n = e[o], i.set(n, r), r += n.length;
                                            return i
                                        }
                                    },
                                    o = {
                                        arraySet: function(e, t, r, n, i) {
                                            for (var o = 0; o < n; o++) e[i + o] = t[r + o]
                                        },
                                        flattenChunks: function(e) {
                                            return [].concat.apply([], e)
                                        }
                                    };
                                r.setTyped = function(e) {
                                    e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, o))
                                }, r.setTyped(n)
                            }, {}],
                            42: [function(e, t, r) {
                                "use strict";
                                var u = e("./common"),
                                    i = !0,
                                    o = !0;
                                try {
                                    String.fromCharCode.apply(null, [0])
                                } catch (e) {
                                    i = !1
                                }
                                try {
                                    String.fromCharCode.apply(null, new Uint8Array(1))
                                } catch (e) {
                                    o = !1
                                }
                                for (var l = new u.Buf8(256), n = 0; n < 256; n++) l[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;

                                function c(e, t) {
                                    if (t < 65537 && (e.subarray && o || !e.subarray && i)) return String.fromCharCode.apply(null, u.shrinkBuf(e, t));
                                    for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
                                    return r
                                }
                                l[254] = l[254] = 1, r.string2buf = function(e) {
                                    for (var t, r, n, i, o = e.length, a = 0, s = 0; s < o; s++) 55296 == (64512 & (r = e.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = e.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), s++), a += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                                    for (t = new u.Buf8(a), s = i = 0; i < a; s++) 55296 == (64512 & (r = e.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = e.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), s++), r < 128 ? t[i++] = r : (r < 2048 ? t[i++] = 192 | r >>> 6 : (r < 65536 ? t[i++] = 224 | r >>> 12 : (t[i++] = 240 | r >>> 18, t[i++] = 128 | r >>> 12 & 63), t[i++] = 128 | r >>> 6 & 63), t[i++] = 128 | 63 & r);
                                    return t
                                }, r.buf2binstring = function(e) {
                                    return c(e, e.length)
                                }, r.binstring2buf = function(e) {
                                    for (var t = new u.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);
                                    return t
                                }, r.buf2string = function(e, t) {
                                    for (var r, n, i, o = t || e.length, a = new Array(2 * o), s = r = 0; s < o;)
                                        if ((n = e[s++]) < 128) a[r++] = n;
                                        else if (4 < (i = l[n])) a[r++] = 65533, s += i - 1;
                                    else {
                                        for (n &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && s < o;) n = n << 6 | 63 & e[s++], i--;
                                        1 < i ? a[r++] = 65533 : n < 65536 ? a[r++] = n : (n -= 65536, a[r++] = 55296 | n >> 10 & 1023, a[r++] = 56320 | 1023 & n)
                                    }
                                    return c(a, r)
                                }, r.utf8border = function(e, t) {
                                    for (var r = (t = (t = t || e.length) > e.length ? e.length : t) - 1; 0 <= r && 128 == (192 & e[r]);) r--;
                                    return !(r < 0) && 0 !== r && r + l[e[r]] > t ? r : t
                                }
                            }, {
                                "./common": 41
                            }],
                            43: [function(e, t, r) {
                                "use strict";
                                t.exports = function(e, t, r, n) {
                                    for (var i = 65535 & e | 0, o = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                                        for (r -= a = 2e3 < r ? 2e3 : r; o = o + (i = i + t[n++] | 0) | 0, --a;);
                                        i %= 65521, o %= 65521
                                    }
                                    return i | o << 16 | 0
                                }
                            }, {}],
                            44: [function(e, t, r) {
                                "use strict";
                                t.exports = {
                                    Z_NO_FLUSH: 0,
                                    Z_PARTIAL_FLUSH: 1,
                                    Z_SYNC_FLUSH: 2,
                                    Z_FULL_FLUSH: 3,
                                    Z_FINISH: 4,
                                    Z_BLOCK: 5,
                                    Z_TREES: 6,
                                    Z_OK: 0,
                                    Z_STREAM_END: 1,
                                    Z_NEED_DICT: 2,
                                    Z_ERRNO: -1,
                                    Z_STREAM_ERROR: -2,
                                    Z_DATA_ERROR: -3,
                                    Z_BUF_ERROR: -5,
                                    Z_NO_COMPRESSION: 0,
                                    Z_BEST_SPEED: 1,
                                    Z_BEST_COMPRESSION: 9,
                                    Z_DEFAULT_COMPRESSION: -1,
                                    Z_FILTERED: 1,
                                    Z_HUFFMAN_ONLY: 2,
                                    Z_RLE: 3,
                                    Z_FIXED: 4,
                                    Z_DEFAULT_STRATEGY: 0,
                                    Z_BINARY: 0,
                                    Z_TEXT: 1,
                                    Z_UNKNOWN: 2,
                                    Z_DEFLATED: 8
                                }
                            }, {}],
                            45: [function(e, t, r) {
                                "use strict";
                                var s = function() {
                                    for (var e = [], t = 0; t < 256; t++) {
                                        for (var r = t, n = 0; n < 8; n++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
                                        e[t] = r
                                    }
                                    return e
                                }();
                                t.exports = function(e, t, r, n) {
                                    var i = s,
                                        o = n + r;
                                    e ^= -1;
                                    for (var a = n; a < o; a++) e = e >>> 8 ^ i[255 & (e ^ t[a])];
                                    return -1 ^ e
                                }
                            }, {}],
                            46: [function(e, t, r) {
                                "use strict";
                                var s, f = e("../utils/common"),
                                    u = e("./trees"),
                                    h = e("./adler32"),
                                    d = e("./crc32"),
                                    n = e("./messages"),
                                    l = 0,
                                    c = 0,
                                    p = -2,
                                    i = 2,
                                    _ = 8,
                                    o = 286,
                                    a = 30,
                                    m = 19,
                                    y = 2 * o + 1,
                                    g = 15,
                                    b = 3,
                                    w = 258,
                                    v = w + b + 1,
                                    S = 42,
                                    C = 113;

                                function I(e, t) {
                                    return e.msg = n[t], t
                                }

                                function O(e) {
                                    return (e << 1) - (4 < e ? 9 : 0)
                                }

                                function P(e) {
                                    for (var t = e.length; 0 <= --t;) e[t] = 0
                                }

                                function E(e) {
                                    var t = e.state,
                                        r = t.pending;
                                    0 !== (r = r > e.avail_out ? e.avail_out : r) && (f.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, 0 === t.pending && (t.pending_out = 0))
                                }

                                function k(e, t) {
                                    u._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, E(e.strm)
                                }

                                function x(e, t) {
                                    e.pending_buf[e.pending++] = t
                                }

                                function B(e, t) {
                                    e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
                                }

                                function T(e, t) {
                                    var r, n, i = e.max_chain_length,
                                        o = e.strstart,
                                        a = e.prev_length,
                                        s = e.nice_match,
                                        u = e.strstart > e.w_size - v ? e.strstart - (e.w_size - v) : 0,
                                        l = e.window,
                                        c = e.w_mask,
                                        f = e.prev,
                                        h = e.strstart + w,
                                        d = l[o + a - 1],
                                        p = l[o + a];
                                    e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
                                    do {
                                        if (l[(r = t) + a] === p && l[r + a - 1] === d && l[r] === l[o] && l[++r] === l[o + 1]) {
                                            for (o += 2, r++; l[++o] === l[++r] && l[++o] === l[++r] && l[++o] === l[++r] && l[++o] === l[++r] && l[++o] === l[++r] && l[++o] === l[++r] && l[++o] === l[++r] && l[++o] === l[++r] && o < h;);
                                            if (n = w - (h - o), o = h - w, a < n) {
                                                if (e.match_start = t, s <= (a = n)) break;
                                                d = l[o + a - 1], p = l[o + a]
                                            }
                                        }
                                    } while ((t = f[t & c]) > u && 0 != --i);
                                    return a <= e.lookahead ? a : e.lookahead
                                }

                                function A(e) {
                                    var t, r, n, i, o, a, s, u, l, c = e.w_size;
                                    do {
                                        if (u = e.window_size - e.lookahead - e.strstart, e.strstart >= c + (c - v)) {
                                            for (f.arraySet(e.window, e.window, c, c, 0), e.match_start -= c, e.strstart -= c, e.block_start -= c, t = r = e.hash_size; n = e.head[--t], e.head[t] = c <= n ? n - c : 0, --r;);
                                            for (t = r = c; n = e.prev[--t], e.prev[t] = c <= n ? n - c : 0, --r;);
                                            u += c
                                        }
                                        if (0 === e.strm.avail_in) break;
                                        if (o = e.strm, a = e.window, s = e.strstart + e.lookahead, l = void 0, r = 0 === (l = (u = u) < (l = o.avail_in) ? u : l) ? 0 : (o.avail_in -= l, f.arraySet(a, o.input, o.next_in, l, s), 1 === o.state.wrap ? o.adler = h(o.adler, a, l, s) : 2 === o.state.wrap && (o.adler = d(o.adler, a, l, s)), o.next_in += l, o.total_in += l, l), e.lookahead += r, e.lookahead + e.insert >= b)
                                            for (i = e.strstart - e.insert, e.ins_h = e.window[i], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[i + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[i + b - 1]) & e.hash_mask, e.prev[i & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = i, i++, e.insert--, !(e.lookahead + e.insert < b)););
                                    } while (e.lookahead < v && 0 !== e.strm.avail_in)
                                }

                                function D(e, t) {
                                    for (var r, n;;) {
                                        if (e.lookahead < v) {
                                            if (A(e), e.lookahead < v && t === l) return 1;
                                            if (0 === e.lookahead) break
                                        }
                                        if (r = 0, e.lookahead >= b && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== r && e.strstart - r <= e.w_size - v && (e.match_length = T(e, r)), e.match_length >= b)
                                            if (n = u._tr_tally(e, e.strstart - e.match_start, e.match_length - b), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= b) {
                                                for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, 0 != --e.match_length;);
                                                e.strstart++
                                            } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                                        else n = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
                                        if (n && (k(e, !1), 0 === e.strm.avail_out)) return 1
                                    }
                                    return e.insert = e.strstart < b - 1 ? e.strstart : b - 1, 4 === t ? (k(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (k(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                                }

                                function M(e, t) {
                                    for (var r, n, i;;) {
                                        if (e.lookahead < v) {
                                            if (A(e), e.lookahead < v && t === l) return 1;
                                            if (0 === e.lookahead) break
                                        }
                                        if (r = 0, e.lookahead >= b && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = b - 1, 0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - v && (e.match_length = T(e, r), e.match_length <= 5 && (1 === e.strategy || e.match_length === b && 4096 < e.strstart - e.match_start) && (e.match_length = b - 1)), e.prev_length >= b && e.match_length <= e.prev_length) {
                                            for (i = e.strstart + e.lookahead - b, n = u._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - b), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 != --e.prev_length;);
                                            if (e.match_available = 0, e.match_length = b - 1, e.strstart++, n && (k(e, !1), 0 === e.strm.avail_out)) return 1
                                        } else if (e.match_available) {
                                            if ((n = u._tr_tally(e, 0, e.window[e.strstart - 1])) && k(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
                                        } else e.match_available = 1, e.strstart++, e.lookahead--
                                    }
                                    return e.match_available && (n = u._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < b - 1 ? e.strstart : b - 1, 4 === t ? (k(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (k(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                                }

                                function F(e, t, r, n, i) {
                                    this.good_length = e, this.max_lazy = t, this.nice_length = r, this.max_chain = n, this.func = i
                                }

                                function z() {
                                    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = _, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new f.Buf16(2 * y), this.dyn_dtree = new f.Buf16(2 * (2 * a + 1)), this.bl_tree = new f.Buf16(2 * (2 * m + 1)), P(this.dyn_ltree), P(this.dyn_dtree), P(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new f.Buf16(g + 1), this.heap = new f.Buf16(2 * o + 1), P(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new f.Buf16(2 * o + 1), P(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
                                }

                                function R(e) {
                                    var t;
                                    return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = i, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? S : C, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = l, u._tr_init(t), c) : I(e, p)
                                }

                                function N(e) {
                                    var t = R(e);
                                    return t === c && ((e = e.state).window_size = 2 * e.w_size, P(e.head), e.max_lazy_match = s[e.level].max_lazy, e.good_match = s[e.level].good_length, e.nice_match = s[e.level].nice_length, e.max_chain_length = s[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = b - 1, e.match_available = 0, e.ins_h = 0), t
                                }

                                function U(e, t, r, n, i, o) {
                                    if (!e) return p;
                                    var a = 1;
                                    if (-1 === t && (t = 6), n < 0 ? (a = 0, n = -n) : 15 < n && (a = 2, n -= 16), i < 1 || 9 < i || r !== _ || n < 8 || 15 < n || t < 0 || 9 < t || o < 0 || 4 < o) return I(e, p);
                                    8 === n && (n = 9);
                                    var s = new z;
                                    return (e.state = s).strm = e, s.wrap = a, s.gzhead = null, s.w_bits = n, s.w_size = 1 << s.w_bits, s.w_mask = s.w_size - 1, s.hash_bits = i + 7, s.hash_size = 1 << s.hash_bits, s.hash_mask = s.hash_size - 1, s.hash_shift = ~~((s.hash_bits + b - 1) / b), s.window = new f.Buf8(2 * s.w_size), s.head = new f.Buf16(s.hash_size), s.prev = new f.Buf16(s.w_size), s.lit_bufsize = 1 << i + 6, s.pending_buf_size = 4 * s.lit_bufsize, s.pending_buf = new f.Buf8(s.pending_buf_size), s.d_buf = +s.lit_bufsize, s.l_buf = 3 * s.lit_bufsize, s.level = t, s.strategy = o, s.method = r, N(e)
                                }
                                s = [new F(0, 0, 0, 0, function(e, t) {
                                    var r = 65535;
                                    for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5);;) {
                                        if (e.lookahead <= 1) {
                                            if (A(e), 0 === e.lookahead && t === l) return 1;
                                            if (0 === e.lookahead) break
                                        }
                                        e.strstart += e.lookahead, e.lookahead = 0;
                                        var n = e.block_start + r;
                                        if ((0 === e.strstart || e.strstart >= n) && (e.lookahead = e.strstart - n, e.strstart = n, k(e, !1), 0 === e.strm.avail_out)) return 1;
                                        if (e.strstart - e.block_start >= e.w_size - v && (k(e, !1), 0 === e.strm.avail_out)) return 1
                                    }
                                    return e.insert = 0, 4 === t ? (k(e, !0), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (k(e, !1), e.strm.avail_out), 1)
                                }), new F(4, 4, 8, 4, D), new F(4, 5, 16, 8, D), new F(4, 6, 32, 32, D), new F(4, 4, 16, 16, M), new F(8, 16, 32, 32, M), new F(8, 16, 128, 128, M), new F(8, 32, 128, 256, M), new F(32, 128, 258, 1024, M), new F(32, 258, 258, 4096, M)], r.deflateInit = function(e, t) {
                                    return U(e, t, _, 15, 8, 0)
                                }, r.deflateInit2 = U, r.deflateReset = N, r.deflateResetKeep = R, r.deflateSetHeader = function(e, t) {
                                    return !e || !e.state || 2 !== e.state.wrap ? p : (e.state.gzhead = t, c)
                                }, r.deflate = function(e, t) {
                                    var r, n, i, o;
                                    if (!e || !e.state || 5 < t || t < 0) return e ? I(e, p) : p;
                                    if (r = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === r.status && 4 !== t) return I(e, 0 === e.avail_out ? -5 : p);
                                    if (r.strm = e, a = r.last_flush, r.last_flush = t, r.status === S && (2 === r.wrap ? (e.adler = 0, x(r, 31), x(r, 139), x(r, 8), r.gzhead ? (x(r, (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)), x(r, 255 & r.gzhead.time), x(r, r.gzhead.time >> 8 & 255), x(r, r.gzhead.time >> 16 & 255), x(r, r.gzhead.time >> 24 & 255), x(r, 9 === r.level ? 2 : 2 <= r.strategy || r.level < 2 ? 4 : 0), x(r, 255 & r.gzhead.os), r.gzhead.extra && r.gzhead.extra.length && (x(r, 255 & r.gzhead.extra.length), x(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (e.adler = d(e.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = 69) : (x(r, 0), x(r, 0), x(r, 0), x(r, 0), x(r, 0), x(r, 9 === r.level ? 2 : 2 <= r.strategy || r.level < 2 ? 4 : 0), x(r, 3), r.status = C)) : (o = _ + (r.w_bits - 8 << 4) << 8, o |= (2 <= r.strategy || r.level < 2 ? 0 : r.level < 6 ? 1 : 6 === r.level ? 2 : 3) << 6, 0 !== r.strstart && (o |= 32), o += 31 - o % 31, r.status = C, B(r, o), 0 !== r.strstart && (B(r, e.adler >>> 16), B(r, 65535 & e.adler)), e.adler = 1)), 69 === r.status)
                                        if (r.gzhead.extra) {
                                            for (n = r.pending; r.gzindex < (65535 & r.gzhead.extra.length) && (r.pending !== r.pending_buf_size || (r.gzhead.hcrc && r.pending > n && (e.adler = d(e.adler, r.pending_buf, r.pending - n, n)), E(e), n = r.pending, r.pending !== r.pending_buf_size));) x(r, 255 & r.gzhead.extra[r.gzindex]), r.gzindex++;
                                            r.gzhead.hcrc && r.pending > n && (e.adler = d(e.adler, r.pending_buf, r.pending - n, n)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = 73)
                                        } else r.status = 73;
                                    if (73 === r.status)
                                        if (r.gzhead.name) {
                                            n = r.pending;
                                            do {
                                                if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > n && (e.adler = d(e.adler, r.pending_buf, r.pending - n, n)), E(e), n = r.pending, r.pending === r.pending_buf_size)) {
                                                    i = 1;
                                                    break
                                                }
                                            } while (i = r.gzindex < r.gzhead.name.length ? 255 & r.gzhead.name.charCodeAt(r.gzindex++) : 0, x(r, i), 0 !== i);
                                            r.gzhead.hcrc && r.pending > n && (e.adler = d(e.adler, r.pending_buf, r.pending - n, n)), 0 === i && (r.gzindex = 0, r.status = 91)
                                        } else r.status = 91;
                                    if (91 === r.status)
                                        if (r.gzhead.comment) {
                                            n = r.pending;
                                            do {
                                                if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > n && (e.adler = d(e.adler, r.pending_buf, r.pending - n, n)), E(e), n = r.pending, r.pending === r.pending_buf_size)) {
                                                    i = 1;
                                                    break
                                                }
                                            } while (i = r.gzindex < r.gzhead.comment.length ? 255 & r.gzhead.comment.charCodeAt(r.gzindex++) : 0, x(r, i), 0 !== i);
                                            r.gzhead.hcrc && r.pending > n && (e.adler = d(e.adler, r.pending_buf, r.pending - n, n)), 0 === i && (r.status = 103)
                                        } else r.status = 103;
                                    if (103 === r.status && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && E(e), r.pending + 2 <= r.pending_buf_size && (x(r, 255 & e.adler), x(r, e.adler >> 8 & 255), e.adler = 0, r.status = C)) : r.status = C), 0 !== r.pending) {
                                        if (E(e), 0 === e.avail_out) return r.last_flush = -1, c
                                    } else if (0 === e.avail_in && O(t) <= O(a) && 4 !== t) return I(e, -5);
                                    if (666 === r.status && 0 !== e.avail_in) return I(e, -5);
                                    if (0 !== e.avail_in || 0 !== r.lookahead || t !== l && 666 !== r.status) {
                                        var a = 2 === r.strategy ? function(e, t) {
                                            for (var r;;) {
                                                if (0 === e.lookahead && (A(e), 0 === e.lookahead)) {
                                                    if (t === l) return 1;
                                                    break
                                                }
                                                if (e.match_length = 0, r = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (k(e, !1), 0 === e.strm.avail_out)) return 1
                                            }
                                            return e.insert = 0, 4 === t ? (k(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (k(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                                        }(r, t) : 3 === r.strategy ? function(e, t) {
                                            for (var r, n, i, o, a = e.window;;) {
                                                if (e.lookahead <= w) {
                                                    if (A(e), e.lookahead <= w && t === l) return 1;
                                                    if (0 === e.lookahead) break
                                                }
                                                if (e.match_length = 0, e.lookahead >= b && 0 < e.strstart && (n = a[i = e.strstart - 1]) === a[++i] && n === a[++i] && n === a[++i]) {
                                                    for (o = e.strstart + w; n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && i < o;);
                                                    e.match_length = w - (o - i), e.match_length > e.lookahead && (e.match_length = e.lookahead)
                                                }
                                                if (e.match_length >= b ? (r = u._tr_tally(e, 1, e.match_length - b), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (k(e, !1), 0 === e.strm.avail_out)) return 1
                                            }
                                            return e.insert = 0, 4 === t ? (k(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (k(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                                        }(r, t) : s[r.level].func(r, t);
                                        if (3 !== a && 4 !== a || (r.status = 666), 1 === a || 3 === a) return 0 === e.avail_out && (r.last_flush = -1), c;
                                        if (2 === a && (1 === t ? u._tr_align(r) : 5 !== t && (u._tr_stored_block(r, 0, 0, !1), 3 === t && (P(r.head), 0 === r.lookahead && (r.strstart = 0, r.block_start = 0, r.insert = 0))), E(e), 0 === e.avail_out)) return r.last_flush = -1, c
                                    }
                                    return 4 !== t ? c : r.wrap <= 0 ? 1 : (2 === r.wrap ? (x(r, 255 & e.adler), x(r, e.adler >> 8 & 255), x(r, e.adler >> 16 & 255), x(r, e.adler >> 24 & 255), x(r, 255 & e.total_in), x(r, e.total_in >> 8 & 255), x(r, e.total_in >> 16 & 255), x(r, e.total_in >> 24 & 255)) : (B(r, e.adler >>> 16), B(r, 65535 & e.adler)), E(e), 0 < r.wrap && (r.wrap = -r.wrap), 0 !== r.pending ? c : 1)
                                }, r.deflateEnd = function(e) {
                                    var t;
                                    return e && e.state ? (t = e.state.status) !== S && 69 !== t && 73 !== t && 91 !== t && 103 !== t && t !== C && 666 !== t ? I(e, p) : (e.state = null, t === C ? I(e, -3) : c) : p
                                }, r.deflateSetDictionary = function(e, t) {
                                    var r, n, i, o, a, s, u, l = t.length;
                                    if (!e || !e.state) return p;
                                    if (2 === (o = (r = e.state).wrap) || 1 === o && r.status !== S || r.lookahead) return p;
                                    for (1 === o && (e.adler = h(e.adler, t, l, 0)), r.wrap = 0, l >= r.w_size && (0 === o && (P(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), u = new f.Buf8(r.w_size), f.arraySet(u, t, l - r.w_size, r.w_size, 0), t = u, l = r.w_size), a = e.avail_in, s = e.next_in, u = e.input, e.avail_in = l, e.next_in = 0, e.input = t, A(r); r.lookahead >= b;) {
                                        for (n = r.strstart, i = r.lookahead - (b - 1); r.ins_h = (r.ins_h << r.hash_shift ^ r.window[n + b - 1]) & r.hash_mask, r.prev[n & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = n, n++, --i;);
                                        r.strstart = n, r.lookahead = b - 1, A(r)
                                    }
                                    return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = b - 1, r.match_available = 0, e.next_in = s, e.input = u, e.avail_in = a, r.wrap = o, c
                                }, r.deflateInfo = "pako deflate (from Nodeca project)"
                            }, {
                                "../utils/common": 41,
                                "./adler32": 43,
                                "./crc32": 45,
                                "./messages": 51,
                                "./trees": 52
                            }],
                            47: [function(e, t, r) {
                                "use strict";
                                t.exports = function() {
                                    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                                }
                            }, {}],
                            48: [function(e, t, r) {
                                "use strict";
                                t.exports = function(e, t) {
                                    var r, n, i, o, a, s, u = e.state,
                                        l = e.next_in,
                                        c = e.input,
                                        f = l + (e.avail_in - 5),
                                        h = e.next_out,
                                        d = e.output,
                                        p = h - (t - e.avail_out),
                                        _ = h + (e.avail_out - 257),
                                        m = u.dmax,
                                        y = u.wsize,
                                        g = u.whave,
                                        b = u.wnext,
                                        w = u.window,
                                        v = u.hold,
                                        S = u.bits,
                                        C = u.lencode,
                                        I = u.distcode,
                                        O = (1 << u.lenbits) - 1,
                                        P = (1 << u.distbits) - 1;
                                    e: do {
                                        for (S < 15 && (v += c[l++] << S, S += 8, v += c[l++] << S, S += 8), r = C[v & O];;) {
                                            if (v >>>= n = r >>> 24, S -= n, 0 == (n = r >>> 16 & 255)) d[h++] = 65535 & r;
                                            else {
                                                if (!(16 & n)) {
                                                    if (0 == (64 & n)) {
                                                        r = C[(65535 & r) + (v & (1 << n) - 1)];
                                                        continue
                                                    }
                                                    if (32 & n) {
                                                        u.mode = 12;
                                                        break e
                                                    }
                                                    e.msg = "invalid literal/length code", u.mode = 30;
                                                    break e
                                                }
                                                for (i = 65535 & r, (n &= 15) && (S < n && (v += c[l++] << S, S += 8), i += v & (1 << n) - 1, v >>>= n, S -= n), S < 15 && (v += c[l++] << S, S += 8, v += c[l++] << S, S += 8), r = I[v & P];;) {
                                                    if (v >>>= n = r >>> 24, S -= n, !(16 & (n = r >>> 16 & 255))) {
                                                        if (0 == (64 & n)) {
                                                            r = I[(65535 & r) + (v & (1 << n) - 1)];
                                                            continue
                                                        }
                                                        e.msg = "invalid distance code", u.mode = 30;
                                                        break e
                                                    }
                                                    if (o = 65535 & r, S < (n &= 15) && (v += c[l++] << S, (S += 8) < n && (v += c[l++] << S, S += 8)), m < (o += v & (1 << n) - 1)) {
                                                        e.msg = "invalid distance too far back", u.mode = 30;
                                                        break e
                                                    }
                                                    if (v >>>= n, S -= n, (n = h - p) < o) {
                                                        if (g < (n = o - n) && u.sane) {
                                                            e.msg = "invalid distance too far back", u.mode = 30;
                                                            break e
                                                        }
                                                        if (s = w, (a = 0) === b) {
                                                            if (a += y - n, n < i) {
                                                                for (i -= n; d[h++] = w[a++], --n;);
                                                                a = h - o, s = d
                                                            }
                                                        } else if (b < n) {
                                                            if (a += y + b - n, (n -= b) < i) {
                                                                for (i -= n; d[h++] = w[a++], --n;);
                                                                if (a = 0, b < i) {
                                                                    for (i -= n = b; d[h++] = w[a++], --n;);
                                                                    a = h - o, s = d
                                                                }
                                                            }
                                                        } else if (a += b - n, n < i) {
                                                            for (i -= n; d[h++] = w[a++], --n;);
                                                            a = h - o, s = d
                                                        }
                                                        for (; 2 < i;) d[h++] = s[a++], d[h++] = s[a++], d[h++] = s[a++], i -= 3;
                                                        i && (d[h++] = s[a++], 1 < i && (d[h++] = s[a++]))
                                                    } else {
                                                        for (a = h - o; d[h++] = d[a++], d[h++] = d[a++], d[h++] = d[a++], 2 < (i -= 3););
                                                        i && (d[h++] = d[a++], 1 < i && (d[h++] = d[a++]))
                                                    }
                                                    break
                                                }
                                            }
                                            break
                                        }
                                    } while (l < f && h < _);
                                    l -= i = S >> 3, v &= (1 << (S -= i << 3)) - 1, e.next_in = l, e.next_out = h, e.avail_in = l < f ? f - l + 5 : 5 - (l - f), e.avail_out = h < _ ? _ - h + 257 : 257 - (h - _), u.hold = v, u.bits = S
                                }
                            }, {}],
                            49: [function(e, t, r) {
                                "use strict";
                                var x = e("../utils/common"),
                                    B = e("./adler32"),
                                    T = e("./crc32"),
                                    A = e("./inffast"),
                                    D = e("./inftrees"),
                                    M = 0,
                                    F = -2,
                                    z = 1,
                                    n = 852,
                                    i = 592;

                                function R(e) {
                                    return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
                                }

                                function o() {
                                    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new x.Buf16(320), this.work = new x.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                                }

                                function a(e) {
                                    var t;
                                    return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = z, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new x.Buf32(n), t.distcode = t.distdyn = new x.Buf32(i), t.sane = 1, t.back = -1, M) : F
                                }

                                function s(e) {
                                    var t;
                                    return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, a(e)) : F
                                }

                                function u(e, t) {
                                    var r, n;
                                    return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? F : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, s(e))) : F
                                }

                                function l(e, t) {
                                    var r;
                                    return e ? (r = new o, (e.state = r).window = null, (t = u(e, t)) !== M && (e.state = null), t) : F
                                }
                                var N, U, j = !0;

                                function L(e, t, r, n) {
                                    var i = e.state;
                                    return null === i.window && (i.wsize = 1 << i.wbits, i.wnext = 0, i.whave = 0, i.window = new x.Buf8(i.wsize)), n >= i.wsize ? (x.arraySet(i.window, t, r - i.wsize, i.wsize, 0), i.wnext = 0, i.whave = i.wsize) : (n < (e = i.wsize - i.wnext) && (e = n), x.arraySet(i.window, t, r - n, e, i.wnext), (n -= e) ? (x.arraySet(i.window, t, r - n, n, 0), i.wnext = n, i.whave = i.wsize) : (i.wnext += e, i.wnext === i.wsize && (i.wnext = 0), i.whave < i.wsize && (i.whave += e))), 0
                                }
                                r.inflateReset = s, r.inflateReset2 = u, r.inflateResetKeep = a, r.inflateInit = function(e) {
                                    return l(e, 15)
                                }, r.inflateInit2 = l, r.inflate = function(e, t) {
                                    var r, n, i, o, a, s, u, l, c, f, h, d, p, _, m, y, g, b, w, v, S, C, I, O, P = 0,
                                        E = new x.Buf8(4),
                                        k = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                                    if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return F;
                                    12 === (r = e.state).mode && (r.mode = 13), a = e.next_out, i = e.output, u = e.avail_out, o = e.next_in, n = e.input, s = e.avail_in, l = r.hold, c = r.bits, f = s, h = u, C = M;
                                    e: for (;;) switch (r.mode) {
                                        case z:
                                            if (0 === r.wrap) {
                                                r.mode = 13;
                                                break
                                            }
                                            for (; c < 16;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            if (2 & r.wrap && 35615 === l) {
                                                E[r.check = 0] = 255 & l, E[1] = l >>> 8 & 255, r.check = T(r.check, E, 2, 0), c = l = 0, r.mode = 2;
                                                break
                                            }
                                            if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & l) << 8) + (l >> 8)) % 31) {
                                                e.msg = "incorrect header check", r.mode = 30;
                                                break
                                            }
                                            if (8 != (15 & l)) {
                                                e.msg = "unknown compression method", r.mode = 30;
                                                break
                                            }
                                            if (c -= 4, S = 8 + (15 & (l >>>= 4)), 0 === r.wbits) r.wbits = S;
                                            else if (S > r.wbits) {
                                                e.msg = "invalid window size", r.mode = 30;
                                                break
                                            }
                                            r.dmax = 1 << S, e.adler = r.check = 1, r.mode = 512 & l ? 10 : 12, c = l = 0;
                                            break;
                                        case 2:
                                            for (; c < 16;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            if (r.flags = l, 8 != (255 & r.flags)) {
                                                e.msg = "unknown compression method", r.mode = 30;
                                                break
                                            }
                                            if (57344 & r.flags) {
                                                e.msg = "unknown header flags set", r.mode = 30;
                                                break
                                            }
                                            r.head && (r.head.text = l >> 8 & 1), 512 & r.flags && (E[0] = 255 & l, E[1] = l >>> 8 & 255, r.check = T(r.check, E, 2, 0)), c = l = 0, r.mode = 3;
                                        case 3:
                                            for (; c < 32;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            r.head && (r.head.time = l), 512 & r.flags && (E[0] = 255 & l, E[1] = l >>> 8 & 255, E[2] = l >>> 16 & 255, E[3] = l >>> 24 & 255, r.check = T(r.check, E, 4, 0)), c = l = 0, r.mode = 4;
                                        case 4:
                                            for (; c < 16;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            r.head && (r.head.xflags = 255 & l, r.head.os = l >> 8), 512 & r.flags && (E[0] = 255 & l, E[1] = l >>> 8 & 255, r.check = T(r.check, E, 2, 0)), c = l = 0, r.mode = 5;
                                        case 5:
                                            if (1024 & r.flags) {
                                                for (; c < 16;) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                r.length = l, r.head && (r.head.extra_len = l), 512 & r.flags && (E[0] = 255 & l, E[1] = l >>> 8 & 255, r.check = T(r.check, E, 2, 0)), c = l = 0
                                            } else r.head && (r.head.extra = null);
                                            r.mode = 6;
                                        case 6:
                                            if (1024 & r.flags && ((d = s < (d = r.length) ? s : d) && (r.head && (S = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), x.arraySet(r.head.extra, n, o, d, S)), 512 & r.flags && (r.check = T(r.check, n, d, o)), s -= d, o += d, r.length -= d), r.length)) break e;
                                            r.length = 0, r.mode = 7;
                                        case 7:
                                            if (2048 & r.flags) {
                                                if (0 === s) break e;
                                                for (d = 0; S = n[o + d++], r.head && S && r.length < 65536 && (r.head.name += String.fromCharCode(S)), S && d < s;);
                                                if (512 & r.flags && (r.check = T(r.check, n, d, o)), s -= d, o += d, S) break e
                                            } else r.head && (r.head.name = null);
                                            r.length = 0, r.mode = 8;
                                        case 8:
                                            if (4096 & r.flags) {
                                                if (0 === s) break e;
                                                for (d = 0; S = n[o + d++], r.head && S && r.length < 65536 && (r.head.comment += String.fromCharCode(S)), S && d < s;);
                                                if (512 & r.flags && (r.check = T(r.check, n, d, o)), s -= d, o += d, S) break e
                                            } else r.head && (r.head.comment = null);
                                            r.mode = 9;
                                        case 9:
                                            if (512 & r.flags) {
                                                for (; c < 16;) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                if (l !== (65535 & r.check)) {
                                                    e.msg = "header crc mismatch", r.mode = 30;
                                                    break
                                                }
                                                c = l = 0
                                            }
                                            r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = 12;
                                            break;
                                        case 10:
                                            for (; c < 32;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            e.adler = r.check = R(l), c = l = 0, r.mode = 11;
                                        case 11:
                                            if (0 === r.havedict) return e.next_out = a, e.avail_out = u, e.next_in = o, e.avail_in = s, r.hold = l, r.bits = c, 2;
                                            e.adler = r.check = 1, r.mode = 12;
                                        case 12:
                                            if (5 === t || 6 === t) break e;
                                        case 13:
                                            if (r.last) {
                                                l >>>= 7 & c, c -= 7 & c, r.mode = 27;
                                                break
                                            }
                                            for (; c < 3;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            switch (r.last = 1 & l, --c, 3 & (l >>>= 1)) {
                                                case 0:
                                                    r.mode = 14;
                                                    break;
                                                case 1:
                                                    if (function(e) {
                                                            if (j) {
                                                                var t;
                                                                for (N = new x.Buf32(512), U = new x.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                                                                for (; t < 256;) e.lens[t++] = 9;
                                                                for (; t < 280;) e.lens[t++] = 7;
                                                                for (; t < 288;) e.lens[t++] = 8;
                                                                for (D(1, e.lens, 0, 288, N, 0, e.work, {
                                                                        bits: 9
                                                                    }), t = 0; t < 32;) e.lens[t++] = 5;
                                                                D(2, e.lens, 0, 32, U, 0, e.work, {
                                                                    bits: 5
                                                                }), j = !1
                                                            }
                                                            e.lencode = N, e.lenbits = 9, e.distcode = U, e.distbits = 5
                                                        }(r), r.mode = 20, 6 !== t) break;
                                                    l >>>= 2, c -= 2;
                                                    break e;
                                                case 2:
                                                    r.mode = 17;
                                                    break;
                                                case 3:
                                                    e.msg = "invalid block type", r.mode = 30
                                            }
                                            l >>>= 2, c -= 2;
                                            break;
                                        case 14:
                                            for (l >>>= 7 & c, c -= 7 & c; c < 32;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            if ((65535 & l) != (l >>> 16 ^ 65535)) {
                                                e.msg = "invalid stored block lengths", r.mode = 30;
                                                break
                                            }
                                            if (r.length = 65535 & l, c = l = 0, r.mode = 15, 6 === t) break e;
                                        case 15:
                                            r.mode = 16;
                                        case 16:
                                            if (d = r.length) {
                                                if (0 === (d = u < (d = s < d ? s : d) ? u : d)) break e;
                                                x.arraySet(i, n, o, d, a), s -= d, o += d, u -= d, a += d, r.length -= d;
                                                break
                                            }
                                            r.mode = 12;
                                            break;
                                        case 17:
                                            for (; c < 14;) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            if (r.nlen = 257 + (31 & l), l >>>= 5, c -= 5, r.ndist = 1 + (31 & l), l >>>= 5, c -= 5, r.ncode = 4 + (15 & l), l >>>= 4, c -= 4, 286 < r.nlen || 30 < r.ndist) {
                                                e.msg = "too many length or distance symbols", r.mode = 30;
                                                break
                                            }
                                            r.have = 0, r.mode = 18;
                                        case 18:
                                            for (; r.have < r.ncode;) {
                                                for (; c < 3;) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                r.lens[k[r.have++]] = 7 & l, l >>>= 3, c -= 3
                                            }
                                            for (; r.have < 19;) r.lens[k[r.have++]] = 0;
                                            if (r.lencode = r.lendyn, r.lenbits = 7, I = {
                                                    bits: r.lenbits
                                                }, C = D(0, r.lens, 0, 19, r.lencode, 0, r.work, I), r.lenbits = I.bits, C) {
                                                e.msg = "invalid code lengths set", r.mode = 30;
                                                break
                                            }
                                            r.have = 0, r.mode = 19;
                                        case 19:
                                            for (; r.have < r.nlen + r.ndist;) {
                                                for (; y = (P = r.lencode[l & (1 << r.lenbits) - 1]) >>> 16 & 255, g = 65535 & P, !((m = P >>> 24) <= c);) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                if (g < 16) l >>>= m, c -= m, r.lens[r.have++] = g;
                                                else {
                                                    if (16 === g) {
                                                        for (O = m + 2; c < O;) {
                                                            if (0 === s) break e;
                                                            s--, l += n[o++] << c, c += 8
                                                        }
                                                        if (l >>>= m, c -= m, 0 === r.have) {
                                                            e.msg = "invalid bit length repeat", r.mode = 30;
                                                            break
                                                        }
                                                        S = r.lens[r.have - 1], d = 3 + (3 & l), l >>>= 2, c -= 2
                                                    } else if (17 === g) {
                                                        for (O = m + 3; c < O;) {
                                                            if (0 === s) break e;
                                                            s--, l += n[o++] << c, c += 8
                                                        }
                                                        c -= m, S = 0, d = 3 + (7 & (l >>>= m)), l >>>= 3, c -= 3
                                                    } else {
                                                        for (O = m + 7; c < O;) {
                                                            if (0 === s) break e;
                                                            s--, l += n[o++] << c, c += 8
                                                        }
                                                        c -= m, S = 0, d = 11 + (127 & (l >>>= m)), l >>>= 7, c -= 7
                                                    }
                                                    if (r.have + d > r.nlen + r.ndist) {
                                                        e.msg = "invalid bit length repeat", r.mode = 30;
                                                        break
                                                    }
                                                    for (; d--;) r.lens[r.have++] = S
                                                }
                                            }
                                            if (30 === r.mode) break;
                                            if (0 === r.lens[256]) {
                                                e.msg = "invalid code -- missing end-of-block", r.mode = 30;
                                                break
                                            }
                                            if (r.lenbits = 9, I = {
                                                    bits: r.lenbits
                                                }, C = D(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, I), r.lenbits = I.bits, C) {
                                                e.msg = "invalid literal/lengths set", r.mode = 30;
                                                break
                                            }
                                            if (r.distbits = 6, r.distcode = r.distdyn, I = {
                                                    bits: r.distbits
                                                }, C = D(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, I), r.distbits = I.bits, C) {
                                                e.msg = "invalid distances set", r.mode = 30;
                                                break
                                            }
                                            if (r.mode = 20, 6 === t) break e;
                                        case 20:
                                            r.mode = 21;
                                        case 21:
                                            if (6 <= s && 258 <= u) {
                                                e.next_out = a, e.avail_out = u, e.next_in = o, e.avail_in = s, r.hold = l, r.bits = c, A(e, h), a = e.next_out, i = e.output, u = e.avail_out, o = e.next_in, n = e.input, s = e.avail_in, l = r.hold, c = r.bits, 12 === r.mode && (r.back = -1);
                                                break
                                            }
                                            for (r.back = 0; y = (P = r.lencode[l & (1 << r.lenbits) - 1]) >>> 16 & 255, g = 65535 & P, !((m = P >>> 24) <= c);) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            if (y && 0 == (240 & y)) {
                                                for (b = m, w = y, v = g; y = (P = r.lencode[v + ((l & (1 << b + w) - 1) >> b)]) >>> 16 & 255, g = 65535 & P, !(b + (m = P >>> 24) <= c);) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                l >>>= b, c -= b, r.back += b
                                            }
                                            if (l >>>= m, c -= m, r.back += m, r.length = g, 0 === y) {
                                                r.mode = 26;
                                                break
                                            }
                                            if (32 & y) {
                                                r.back = -1, r.mode = 12;
                                                break
                                            }
                                            if (64 & y) {
                                                e.msg = "invalid literal/length code", r.mode = 30;
                                                break
                                            }
                                            r.extra = 15 & y, r.mode = 22;
                                        case 22:
                                            if (r.extra) {
                                                for (O = r.extra; c < O;) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                r.length += l & (1 << r.extra) - 1, l >>>= r.extra, c -= r.extra, r.back += r.extra
                                            }
                                            r.was = r.length, r.mode = 23;
                                        case 23:
                                            for (; y = (P = r.distcode[l & (1 << r.distbits) - 1]) >>> 16 & 255, g = 65535 & P, !((m = P >>> 24) <= c);) {
                                                if (0 === s) break e;
                                                s--, l += n[o++] << c, c += 8
                                            }
                                            if (0 == (240 & y)) {
                                                for (b = m, w = y, v = g; y = (P = r.distcode[v + ((l & (1 << b + w) - 1) >> b)]) >>> 16 & 255, g = 65535 & P, !(b + (m = P >>> 24) <= c);) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                l >>>= b, c -= b, r.back += b
                                            }
                                            if (l >>>= m, c -= m, r.back += m, 64 & y) {
                                                e.msg = "invalid distance code", r.mode = 30;
                                                break
                                            }
                                            r.offset = g, r.extra = 15 & y, r.mode = 24;
                                        case 24:
                                            if (r.extra) {
                                                for (O = r.extra; c < O;) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                r.offset += l & (1 << r.extra) - 1, l >>>= r.extra, c -= r.extra, r.back += r.extra
                                            }
                                            if (r.offset > r.dmax) {
                                                e.msg = "invalid distance too far back", r.mode = 30;
                                                break
                                            }
                                            r.mode = 25;
                                        case 25:
                                            if (0 === u) break e;
                                            if (r.offset > (d = h - u)) {
                                                if ((d = r.offset - d) > r.whave && r.sane) {
                                                    e.msg = "invalid distance too far back", r.mode = 30;
                                                    break
                                                }
                                                p = d > r.wnext ? (d -= r.wnext, r.wsize - d) : r.wnext - d, d > r.length && (d = r.length), _ = r.window
                                            } else _ = i, p = a - r.offset, d = r.length;
                                            for (u -= d = u < d ? u : d, r.length -= d; i[a++] = _[p++], --d;);
                                            0 === r.length && (r.mode = 21);
                                            break;
                                        case 26:
                                            if (0 === u) break e;
                                            i[a++] = r.length, u--, r.mode = 21;
                                            break;
                                        case 27:
                                            if (r.wrap) {
                                                for (; c < 32;) {
                                                    if (0 === s) break e;
                                                    s--, l |= n[o++] << c, c += 8
                                                }
                                                if (h -= u, e.total_out += h, r.total += h, h && (e.adler = r.check = (r.flags ? T : B)(r.check, i, h, a - h)), h = u, (r.flags ? l : R(l)) !== r.check) {
                                                    e.msg = "incorrect data check", r.mode = 30;
                                                    break
                                                }
                                                c = l = 0
                                            }
                                            r.mode = 28;
                                        case 28:
                                            if (r.wrap && r.flags) {
                                                for (; c < 32;) {
                                                    if (0 === s) break e;
                                                    s--, l += n[o++] << c, c += 8
                                                }
                                                if (l !== (4294967295 & r.total)) {
                                                    e.msg = "incorrect length check", r.mode = 30;
                                                    break
                                                }
                                                c = l = 0
                                            }
                                            r.mode = 29;
                                        case 29:
                                            C = 1;
                                            break e;
                                        case 30:
                                            C = -3;
                                            break e;
                                        case 31:
                                            return -4;
                                        default:
                                            return F
                                    }
                                    return e.next_out = a, e.avail_out = u, e.next_in = o, e.avail_in = s, r.hold = l, r.bits = c, (r.wsize || h !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t)) && L(e, e.output, e.next_out, h - e.avail_out) ? (r.mode = 31, -4) : (f -= e.avail_in, h -= e.avail_out, e.total_in += f, e.total_out += h, r.total += h, r.wrap && h && (e.adler = r.check = (r.flags ? T : B)(r.check, i, h, e.next_out - h)), e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), C = (0 == f && 0 === h || 4 === t) && C === M ? -5 : C)
                                }, r.inflateEnd = function(e) {
                                    if (!e || !e.state) return F;
                                    var t = e.state;
                                    return t.window && (t.window = null), e.state = null, M
                                }, r.inflateGetHeader = function(e, t) {
                                    var r;
                                    return !e || !e.state || 0 == (2 & (r = e.state).wrap) ? F : ((r.head = t).done = !1, M)
                                }, r.inflateSetDictionary = function(e, t) {
                                    var r, n = t.length;
                                    return !e || !e.state || 0 !== (r = e.state).wrap && 11 !== r.mode ? F : 11 === r.mode && B(1, t, n, 0) !== r.check ? -3 : L(e, t, n, n) ? (r.mode = 31, -4) : (r.havedict = 1, M)
                                }, r.inflateInfo = "pako inflate (from Nodeca project)"
                            }, {
                                "../utils/common": 41,
                                "./adler32": 43,
                                "./crc32": 45,
                                "./inffast": 48,
                                "./inftrees": 50
                            }],
                            50: [function(e, t, r) {
                                "use strict";
                                var M = e("../utils/common"),
                                    F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                                    z = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                                    R = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                                    N = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                                t.exports = function(e, t, r, n, i, o, a, s) {
                                    for (var u, l, c, f, h, d, p, _, m, y = s.bits, g = 0, b = 0, w = 0, v = 0, S = 0, C = 0, I = 0, O = 0, P = 0, E = 0, k = null, x = 0, B = new M.Buf16(16), T = new M.Buf16(16), A = null, D = 0, g = 0; g <= 15; g++) B[g] = 0;
                                    for (b = 0; b < n; b++) B[t[r + b]]++;
                                    for (S = y, v = 15; 1 <= v && 0 === B[v]; v--);
                                    if (v < S && (S = v), 0 === v) return i[o++] = 20971520, i[o++] = 20971520, s.bits = 1, 0;
                                    for (w = 1; w < v && 0 === B[w]; w++);
                                    for (S < w && (S = w), g = O = 1; g <= 15; g++)
                                        if (O <<= 1, (O -= B[g]) < 0) return -1;
                                    if (0 < O && (0 === e || 1 !== v)) return -1;
                                    for (T[1] = 0, g = 1; g < 15; g++) T[g + 1] = T[g] + B[g];
                                    for (b = 0; b < n; b++) 0 !== t[r + b] && (a[T[t[r + b]]++] = b);
                                    if (d = 0 === e ? (k = A = a, 19) : 1 === e ? (k = F, x -= 257, A = z, D -= 257, 256) : (k = R, A = N, -1), g = w, h = o, I = b = E = 0, c = -1, f = (P = 1 << (C = S)) - 1, 1 === e && 852 < P || 2 === e && 592 < P) return 1;
                                    for (;;) {
                                        for (m = a[b] < d ? (_ = 0, a[b]) : a[b] > d ? (_ = A[D + a[b]], k[x + a[b]]) : (_ = 96, 0), u = 1 << (p = g - I), w = l = 1 << C; i[h + (E >> I) + (l -= u)] = p << 24 | _ << 16 | m | 0, 0 !== l;);
                                        for (u = 1 << g - 1; E & u;) u >>= 1;
                                        if (0 !== u ? (E &= u - 1, E += u) : E = 0, b++, 0 == --B[g]) {
                                            if (g === v) break;
                                            g = t[r + a[b]]
                                        }
                                        if (S < g && (E & f) !== c) {
                                            for (h += w, O = 1 << (C = g - (I = 0 === I ? S : I)); C + I < v && !((O -= B[C + I]) <= 0);) C++, O <<= 1;
                                            if (P += 1 << C, 1 === e && 852 < P || 2 === e && 592 < P) return 1;
                                            i[c = E & f] = S << 24 | C << 16 | h - o | 0
                                        }
                                    }
                                    return 0 !== E && (i[h + E] = g - I << 24 | 64 << 16 | 0), s.bits = S, 0
                                }
                            }, {
                                "../utils/common": 41
                            }],
                            51: [function(e, t, r) {
                                "use strict";
                                t.exports = {
                                    2: "need dictionary",
                                    1: "stream end",
                                    0: "",
                                    "-1": "file error",
                                    "-2": "stream error",
                                    "-3": "data error",
                                    "-4": "insufficient memory",
                                    "-5": "buffer error",
                                    "-6": "incompatible version"
                                }
                            }, {}],
                            52: [function(e, t, r) {
                                "use strict";
                                var i = e("../utils/common");

                                function n(e) {
                                    for (var t = e.length; 0 <= --t;) e[t] = 0
                                }
                                var o = 16,
                                    u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                                    l = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                                    a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                                    s = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                                    c = new Array(576);
                                n(c);
                                var f = new Array(60);
                                n(f);
                                var h = new Array(512);
                                n(h);
                                var d = new Array(256);
                                n(d);
                                var p = new Array(29);
                                n(p);
                                var _, m, y, g = new Array(30);

                                function b(e, t, r, n, i) {
                                    this.static_tree = e, this.extra_bits = t, this.extra_base = r, this.elems = n, this.max_length = i, this.has_stree = e && e.length
                                }

                                function w(e, t) {
                                    this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
                                }

                                function v(e) {
                                    return e < 256 ? h[e] : h[256 + (e >>> 7)]
                                }

                                function S(e, t) {
                                    e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
                                }

                                function C(e, t, r) {
                                    e.bi_valid > o - r ? (e.bi_buf |= t << e.bi_valid & 65535, S(e, e.bi_buf), e.bi_buf = t >> o - e.bi_valid, e.bi_valid += r - o) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r)
                                }

                                function I(e, t, r) {
                                    C(e, r[2 * t], r[2 * t + 1])
                                }

                                function O(e, t) {
                                    for (var r = 0; r |= 1 & e, e >>>= 1, r <<= 1, 0 < --t;);
                                    return r >>> 1
                                }

                                function P(e, t, r) {
                                    for (var n, i = new Array(16), o = 0, a = 1; a <= 15; a++) i[a] = o = o + r[a - 1] << 1;
                                    for (n = 0; n <= t; n++) {
                                        var s = e[2 * n + 1];
                                        0 !== s && (e[2 * n] = O(i[s]++, s))
                                    }
                                }

                                function E(e) {
                                    for (var t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
                                    for (t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;
                                    for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
                                    e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
                                }

                                function k(e) {
                                    8 < e.bi_valid ? S(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
                                }

                                function x(e, t, r, n) {
                                    var i = 2 * t,
                                        o = 2 * r;
                                    return e[i] < e[o] || e[i] === e[o] && n[t] <= n[r]
                                }

                                function B(e, t, r) {
                                    for (var n = e.heap[r], i = r << 1; i <= e.heap_len && (i < e.heap_len && x(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !x(t, n, e.heap[i], e.depth));) e.heap[r] = e.heap[i], r = i, i <<= 1;
                                    e.heap[r] = n
                                }

                                function T(e, t, r) {
                                    var n, i, o, a, s = 0;
                                    if (0 !== e.last_lit)
                                        for (; n = e.pending_buf[e.d_buf + 2 * s] << 8 | e.pending_buf[e.d_buf + 2 * s + 1], i = e.pending_buf[e.l_buf + s], s++, 0 == n ? I(e, i, t) : (I(e, (o = d[i]) + 256 + 1, t), 0 !== (a = u[o]) && C(e, i -= p[o], a), I(e, o = v(--n), r), 0 !== (a = l[o]) && C(e, n -= g[o], a)), s < e.last_lit;);
                                    I(e, 256, t)
                                }

                                function A(e, _) {
                                    var t, r, n, i = _.dyn_tree,
                                        o = _.stat_desc.static_tree,
                                        a = _.stat_desc.has_stree,
                                        s = _.stat_desc.elems,
                                        u = -1;
                                    for (e.heap_len = 0, e.heap_max = 573, t = 0; t < s; t++) 0 !== i[2 * t] ? (e.heap[++e.heap_len] = u = t, e.depth[t] = 0) : i[2 * t + 1] = 0;
                                    for (; e.heap_len < 2;) i[2 * (n = e.heap[++e.heap_len] = u < 2 ? ++u : 0)] = 1, e.depth[n] = 0, e.opt_len--, a && (e.static_len -= o[2 * n + 1]);
                                    for (_.max_code = u, t = e.heap_len >> 1; 1 <= t; t--) B(e, i, t);
                                    for (n = s; t = e.heap[1], e.heap[1] = e.heap[e.heap_len--], B(e, i, 1), r = e.heap[1], e.heap[--e.heap_max] = t, e.heap[--e.heap_max] = r, i[2 * n] = i[2 * t] + i[2 * r], e.depth[n] = (e.depth[t] >= e.depth[r] ? e.depth[t] : e.depth[r]) + 1, i[2 * t + 1] = i[2 * r + 1] = n, e.heap[1] = n++, B(e, i, 1), 2 <= e.heap_len;);
                                    e.heap[--e.heap_max] = e.heap[1],
                                        function(e) {
                                            for (var t, r, n, i, o, a = _.dyn_tree, s = _.max_code, u = _.stat_desc.static_tree, l = _.stat_desc.has_stree, c = _.stat_desc.extra_bits, f = _.stat_desc.extra_base, h = _.stat_desc.max_length, d = 0, p = 0; p <= 15; p++) e.bl_count[p] = 0;
                                            for (a[2 * e.heap[e.heap_max] + 1] = 0, t = e.heap_max + 1; t < 573; t++) h < (p = a[2 * a[2 * (r = e.heap[t]) + 1] + 1] + 1) && (p = h, d++), a[2 * r + 1] = p, s < r || (e.bl_count[p]++, i = 0, f <= r && (i = c[r - f]), o = a[2 * r], e.opt_len += o * (p + i), l && (e.static_len += o * (u[2 * r + 1] + i)));
                                            if (0 !== d) {
                                                do {
                                                    for (p = h - 1; 0 === e.bl_count[p];) p--
                                                } while (e.bl_count[p]--, e.bl_count[p + 1] += 2, e.bl_count[h]--, 0 < (d -= 2));
                                                for (p = h; 0 !== p; p--)
                                                    for (r = e.bl_count[p]; 0 !== r;) s < (n = e.heap[--t]) || (a[2 * n + 1] !== p && (e.opt_len += (p - a[2 * n + 1]) * a[2 * n], a[2 * n + 1] = p), r--)
                                            }
                                        }(e), P(i, u, e.bl_count)
                                }

                                function D(e, t, r) {
                                    var n, i, o = -1,
                                        a = t[1],
                                        s = 0,
                                        u = 7,
                                        l = 4;
                                    for (0 === a && (u = 138, l = 3), t[2 * (r + 1) + 1] = 65535, n = 0; n <= r; n++) i = a, a = t[2 * (n + 1) + 1], ++s < u && i === a || (s < l ? e.bl_tree[2 * i] += s : 0 !== i ? (i !== o && e.bl_tree[2 * i]++, e.bl_tree[32]++) : s <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, o = i, l = (s = 0) === a ? (u = 138, 3) : i === a ? (u = 6, 3) : (u = 7, 4))
                                }

                                function M(e, t, r) {
                                    var n, i, o = -1,
                                        a = t[1],
                                        s = 0,
                                        u = 7,
                                        l = 4;
                                    for (0 === a && (u = 138, l = 3), n = 0; n <= r; n++)
                                        if (i = a, a = t[2 * (n + 1) + 1], !(++s < u && i === a)) {
                                            if (s < l)
                                                for (; I(e, i, e.bl_tree), 0 != --s;);
                                            else 0 !== i ? (i !== o && (I(e, i, e.bl_tree), s--), I(e, 16, e.bl_tree), C(e, s - 3, 2)) : s <= 10 ? (I(e, 17, e.bl_tree), C(e, s - 3, 3)) : (I(e, 18, e.bl_tree), C(e, s - 11, 7));
                                            o = i, l = (s = 0) === a ? (u = 138, 3) : i === a ? (u = 6, 3) : (u = 7, 4)
                                        }
                                }
                                n(g);
                                var F = !1;

                                function z(e, t, r, n) {
                                    C(e, 0 + (n ? 1 : 0), 3), t = t, r = r, k(e = e), S(e, r), S(e, ~r), i.arraySet(e.pending_buf, e.window, t, r, e.pending), e.pending += r
                                }
                                r._tr_init = function(e) {
                                    F || (function() {
                                        for (var e, t, r, n, i = new Array(16), o = r = 0; o < 28; o++)
                                            for (p[o] = r, e = 0; e < 1 << u[o]; e++) d[r++] = o;
                                        for (d[r - 1] = o, o = n = 0; o < 16; o++)
                                            for (g[o] = n, e = 0; e < 1 << l[o]; e++) h[n++] = o;
                                        for (n >>= 7; o < 30; o++)
                                            for (g[o] = n << 7, e = 0; e < 1 << l[o] - 7; e++) h[256 + n++] = o;
                                        for (t = 0; t <= 15; t++) i[t] = 0;
                                        for (e = 0; e <= 143;) c[2 * e + 1] = 8, e++, i[8]++;
                                        for (; e <= 255;) c[2 * e + 1] = 9, e++, i[9]++;
                                        for (; e <= 279;) c[2 * e + 1] = 7, e++, i[7]++;
                                        for (; e <= 287;) c[2 * e + 1] = 8, e++, i[8]++;
                                        for (P(c, 287, i), e = 0; e < 30; e++) f[2 * e + 1] = 5, f[2 * e] = O(e, 5);
                                        _ = new b(c, u, 257, 286, 15), m = new b(f, l, 0, 30, 15), y = new b(new Array(0), a, 0, 19, 7)
                                    }(), F = !0), e.l_desc = new w(e.dyn_ltree, _), e.d_desc = new w(e.dyn_dtree, m), e.bl_desc = new w(e.bl_tree, y), e.bi_buf = 0, e.bi_valid = 0, E(e)
                                }, r._tr_stored_block = z, r._tr_flush_block = function(e, t, r, n) {
                                    var i, o, a = 0;
                                    0 < e.level ? (2 === e.strm.data_type && (e.strm.data_type = function(e) {
                                        for (var t = 4093624447, r = 0; r <= 31; r++, t >>>= 1)
                                            if (1 & t && 0 !== e.dyn_ltree[2 * r]) return 0;
                                        if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
                                        for (r = 32; r < 256; r++)
                                            if (0 !== e.dyn_ltree[2 * r]) return 1;
                                        return 0
                                    }(e)), A(e, e.l_desc), A(e, e.d_desc), a = function(e) {
                                        var t;
                                        for (D(e, e.dyn_ltree, e.l_desc.max_code), D(e, e.dyn_dtree, e.d_desc.max_code), A(e, e.bl_desc), t = 18; 3 <= t && 0 === e.bl_tree[2 * s[t] + 1]; t--);
                                        return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
                                    }(e), i = e.opt_len + 3 + 7 >>> 3, (o = e.static_len + 3 + 7 >>> 3) <= i && (i = o)) : i = o = r + 5, r + 4 <= i && -1 !== t ? z(e, t, r, n) : 4 === e.strategy || o === i ? (C(e, 2 + (n ? 1 : 0), 3), T(e, c, f)) : (C(e, 4 + (n ? 1 : 0), 3), function(e, t, r, n) {
                                        var i;
                                        for (C(e, t - 257, 5), C(e, r - 1, 5), C(e, n - 4, 4), i = 0; i < n; i++) C(e, e.bl_tree[2 * s[i] + 1], 3);
                                        M(e, e.dyn_ltree, t - 1), M(e, e.dyn_dtree, r - 1)
                                    }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), T(e, e.dyn_ltree, e.dyn_dtree)), E(e), n && k(e)
                                }, r._tr_tally = function(e, t, r) {
                                    return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & r, e.last_lit++, 0 === t ? e.dyn_ltree[2 * r]++ : (e.matches++, t--, e.dyn_ltree[2 * (d[r] + 256 + 1)]++, e.dyn_dtree[2 * v(t)]++), e.last_lit === e.lit_bufsize - 1
                                }, r._tr_align = function(e) {
                                    C(e, 2, 3), I(e, 256, c), 16 === (e = e).bi_valid ? (S(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
                                }
                            }, {
                                "../utils/common": 41
                            }],
                            53: [function(e, t, r) {
                                "use strict";
                                t.exports = function() {
                                    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                                }
                            }, {}],
                            54: [function(e, t, r) {
                                "use strict";
                                t.exports = "function" == typeof n ? n : function() {
                                    var e = [].slice.apply(arguments);
                                    e.splice(1, 0, 0), setTimeout.apply(null, e)
                                }
                            }, {}]
                        }, {}, [10])(10)
                    })
                }.call(this)
            }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, l("timers").setImmediate)
        }, {
            buffer: 22,
            timers: 26
        }],
        25: [function(e, t, r) {
            var n, i, t = t.exports = {};

            function o() {
                throw new Error("setTimeout has not been defined")
            }

            function a() {
                throw new Error("clearTimeout has not been defined")
            }

            function s(t) {
                if (n === setTimeout) return setTimeout(t, 0);
                if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
                try {
                    return n(t, 0)
                } catch (e) {
                    try {
                        return n.call(null, t, 0)
                    } catch (e) {
                        return n.call(this, t, 0)
                    }
                }
            }! function() {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : o
                } catch (e) {
                    n = o
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                    i = a
                }
            }();
            var u, l = [],
                c = !1,
                f = -1;

            function h() {
                c && u && (c = !1, u.length ? l = u.concat(l) : f = -1, l.length && d())
            }

            function d() {
                if (!c) {
                    var e = s(h);
                    c = !0;
                    for (var t = l.length; t;) {
                        for (u = l, l = []; ++f < t;) u && u[f].run();
                        f = -1, t = l.length
                    }
                    u = null, c = !1,
                        function(t) {
                            if (i === clearTimeout) return clearTimeout(t);
                            if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
                            try {
                                i(t)
                            } catch (e) {
                                try {
                                    return i.call(null, t)
                                } catch (e) {
                                    return i.call(this, t)
                                }
                            }
                        }(e)
                }
            }

            function p(e, t) {
                this.fun = e, this.array = t
            }

            function _() {}
            t.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (1 < arguments.length)
                    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                l.push(new p(e, t)), 1 !== l.length || c || s(d)
            }, p.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = _, t.addListener = _, t.once = _, t.off = _, t.removeListener = _, t.removeAllListeners = _, t.emit = _, t.prependListener = _, t.prependOnceListener = _, t.listeners = function(e) {
                return []
            }, t.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, t.cwd = function() {
                return "/"
            }, t.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, t.umask = function() {
                return 0
            }
        }, {}],
        26: [function(u, e, l) {
            ! function(r, s) {
                ! function() {
                    var n = u("process/browser.js").nextTick,
                        e = Function.prototype.apply,
                        i = Array.prototype.slice,
                        o = {},
                        a = 0;

                    function t(e, t) {
                        this._id = e, this._clearFn = t
                    }
                    l.setTimeout = function() {
                        return new t(e.call(setTimeout, window, arguments), clearTimeout)
                    }, l.setInterval = function() {
                        return new t(e.call(setInterval, window, arguments), clearInterval)
                    }, l.clearTimeout = l.clearInterval = function(e) {
                        e.close()
                    }, t.prototype.unref = t.prototype.ref = function() {}, t.prototype.close = function() {
                        this._clearFn.call(window, this._id)
                    }, l.enroll = function(e, t) {
                        clearTimeout(e._idleTimeoutId), e._idleTimeout = t
                    }, l.unenroll = function(e) {
                        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
                    }, l._unrefActive = l.active = function(e) {
                        clearTimeout(e._idleTimeoutId);
                        var t = e._idleTimeout;
                        0 <= t && (e._idleTimeoutId = setTimeout(function() {
                            e._onTimeout && e._onTimeout()
                        }, t))
                    }, l.setImmediate = "function" == typeof r ? r : function(e) {
                        var t = a++,
                            r = !(arguments.length < 2) && i.call(arguments, 1);
                        return o[t] = !0, n(function() {
                            o[t] && (r ? e.apply(null, r) : e.call(null), l.clearImmediate(t))
                        }), t
                    }, l.clearImmediate = "function" == typeof s ? s : function(e) {
                        delete o[e]
                    }
                }.call(this)
            }.call(this, u("timers").setImmediate, u("timers").clearImmediate)
        }, {
            "process/browser.js": 25,
            timers: 26
        }]
    }, {}, [8])(8)
});
