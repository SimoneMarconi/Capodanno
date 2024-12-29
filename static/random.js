(() => {
  "use strict";
  var t = {
      d: (e, s) => {
        for (var n in s)
          t.o(s, n) &&
            !t.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: s[n] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      },
    },
    e = {};
  t.r(e),
    t.d(e, {
      Decoder: () => dt,
      Encoder: () => ut,
      PacketType: () => pt,
      protocol: () => ct,
    });
  const s = Object.create(null);
  (s.open = "0"),
    (s.close = "1"),
    (s.ping = "2"),
    (s.pong = "3"),
    (s.message = "4"),
    (s.upgrade = "5"),
    (s.noop = "6");
  const n = Object.create(null);
  Object.keys(s).forEach((t) => {
    n[s[t]] = t;
  });
  const i = { type: "error", data: "parser error" },
    r =
      "function" == typeof Blob ||
      ("undefined" != typeof Blob &&
        "[object BlobConstructor]" === Object.prototype.toString.call(Blob)),
    o = "function" == typeof ArrayBuffer,
    a = (t) =>
      "function" == typeof ArrayBuffer.isView
        ? ArrayBuffer.isView(t)
        : t && t.buffer instanceof ArrayBuffer,
    h = ({ type: t, data: e }, n, i) =>
      r && e instanceof Blob
        ? n
          ? i(e)
          : c(e, i)
        : o && (e instanceof ArrayBuffer || a(e))
          ? n
            ? i(e)
            : c(new Blob([e]), i)
          : i(s[t] + (e || "")),
    c = (t, e) => {
      const s = new FileReader();
      return (
        (s.onload = function () {
          const t = s.result.split(",")[1];
          e("b" + (t || ""));
        }),
        s.readAsDataURL(t)
      );
    };
  function p(t) {
    return t instanceof Uint8Array
      ? t
      : t instanceof ArrayBuffer
        ? new Uint8Array(t)
        : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  }
  let u;
  const l = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
  for (let t = 0; t < 64; t++)
    l[
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(
        t,
      )
    ] = t;
  const d = "function" == typeof ArrayBuffer,
    f = (t, e) => {
      if ("string" != typeof t) return { type: "message", data: g(t, e) };
      const s = t.charAt(0);
      return "b" === s
        ? { type: "message", data: y(t.substring(1), e) }
        : n[s]
          ? t.length > 1
            ? { type: n[s], data: t.substring(1) }
            : { type: n[s] }
          : i;
    },
    y = (t, e) => {
      if (d) {
        const s = ((t) => {
          let e,
            s,
            n,
            i,
            r,
            o = 0.75 * t.length,
            a = t.length,
            h = 0;
          "=" === t[t.length - 1] && (o--, "=" === t[t.length - 2] && o--);
          const c = new ArrayBuffer(o),
            p = new Uint8Array(c);
          for (e = 0; e < a; e += 4)
            (s = l[t.charCodeAt(e)]),
              (n = l[t.charCodeAt(e + 1)]),
              (i = l[t.charCodeAt(e + 2)]),
              (r = l[t.charCodeAt(e + 3)]),
              (p[h++] = (s << 2) | (n >> 4)),
              (p[h++] = ((15 & n) << 4) | (i >> 2)),
              (p[h++] = ((3 & i) << 6) | (63 & r));
          return c;
        })(t);
        return g(s, e);
      }
      return { base64: !0, data: t };
    },
    g = (t, e) =>
      "blob" === e
        ? t instanceof Blob
          ? t
          : new Blob([t])
        : t instanceof ArrayBuffer
          ? t
          : t.buffer,
    m = String.fromCharCode(30);
  let _;
  function b(t) {
    return t.reduce((t, e) => t + e.length, 0);
  }
  function v(t, e) {
    if (t[0].length === e) return t.shift();
    const s = new Uint8Array(e);
    let n = 0;
    for (let i = 0; i < e; i++)
      (s[i] = t[0][n++]), n === t[0].length && (t.shift(), (n = 0));
    return t.length && n < t[0].length && (t[0] = t[0].slice(n)), s;
  }
  function w(t) {
    if (t)
      return (function (t) {
        for (var e in w.prototype) t[e] = w.prototype[e];
        return t;
      })(t);
  }
  (w.prototype.on = w.prototype.addEventListener =
    function (t, e) {
      return (
        (this._callbacks = this._callbacks || {}),
        (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
        this
      );
    }),
    (w.prototype.once = function (t, e) {
      function s() {
        this.off(t, s), e.apply(this, arguments);
      }
      return (s.fn = e), this.on(t, s), this;
    }),
    (w.prototype.off =
      w.prototype.removeListener =
      w.prototype.removeAllListeners =
      w.prototype.removeEventListener =
        function (t, e) {
          if (
            ((this._callbacks = this._callbacks || {}), 0 == arguments.length)
          )
            return (this._callbacks = {}), this;
          var s,
            n = this._callbacks["$" + t];
          if (!n) return this;
          if (1 == arguments.length)
            return delete this._callbacks["$" + t], this;
          for (var i = 0; i < n.length; i++)
            if ((s = n[i]) === e || s.fn === e) {
              n.splice(i, 1);
              break;
            }
          return 0 === n.length && delete this._callbacks["$" + t], this;
        }),
    (w.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      for (
        var e = new Array(arguments.length - 1),
          s = this._callbacks["$" + t],
          n = 1;
        n < arguments.length;
        n++
      )
        e[n - 1] = arguments[n];
      if (s) {
        n = 0;
        for (var i = (s = s.slice(0)).length; n < i; ++n) s[n].apply(this, e);
      }
      return this;
    }),
    (w.prototype.emitReserved = w.prototype.emit),
    (w.prototype.listeners = function (t) {
      return (
        (this._callbacks = this._callbacks || {}),
        this._callbacks["$" + t] || []
      );
    }),
    (w.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    });
  const k =
      "function" == typeof Promise && "function" == typeof Promise.resolve
        ? (t) => Promise.resolve().then(t)
        : (t, e) => e(t, 0),
    E =
      "undefined" != typeof self
        ? self
        : "undefined" != typeof window
          ? window
          : Function("return this")();
  function A(t, ...e) {
    return e.reduce((e, s) => (t.hasOwnProperty(s) && (e[s] = t[s]), e), {});
  }
  const T = E.setTimeout,
    O = E.clearTimeout;
  function C(t, e) {
    e.useNativeTimers
      ? ((t.setTimeoutFn = T.bind(E)), (t.clearTimeoutFn = O.bind(E)))
      : ((t.setTimeoutFn = E.setTimeout.bind(E)),
        (t.clearTimeoutFn = E.clearTimeout.bind(E)));
  }
  function R() {
    return (
      Date.now().toString(36).substring(3) +
      Math.random().toString(36).substring(2, 5)
    );
  }
  class B extends Error {
    constructor(t, e, s) {
      super(t),
        (this.description = e),
        (this.context = s),
        (this.type = "TransportError");
    }
  }
  class S extends w {
    constructor(t) {
      super(),
        (this.writable = !1),
        C(this, t),
        (this.opts = t),
        (this.query = t.query),
        (this.socket = t.socket),
        (this.supportsBinary = !t.forceBase64);
    }
    onError(t, e, s) {
      return super.emitReserved("error", new B(t, e, s)), this;
    }
    open() {
      return (this.readyState = "opening"), this.doOpen(), this;
    }
    close() {
      return (
        ("opening" !== this.readyState && "open" !== this.readyState) ||
          (this.doClose(), this.onClose()),
        this
      );
    }
    send(t) {
      "open" === this.readyState && this.write(t);
    }
    onOpen() {
      (this.readyState = "open"),
        (this.writable = !0),
        super.emitReserved("open");
    }
    onData(t) {
      const e = f(t, this.socket.binaryType);
      this.onPacket(e);
    }
    onPacket(t) {
      super.emitReserved("packet", t);
    }
    onClose(t) {
      (this.readyState = "closed"), super.emitReserved("close", t);
    }
    pause(t) {}
    createUri(t, e = {}) {
      return (
        t +
        "://" +
        this._hostname() +
        this._port() +
        this.opts.path +
        this._query(e)
      );
    }
    _hostname() {
      const t = this.opts.hostname;
      return -1 === t.indexOf(":") ? t : "[" + t + "]";
    }
    _port() {
      return this.opts.port &&
        ((this.opts.secure && Number(443 !== this.opts.port)) ||
          (!this.opts.secure && 80 !== Number(this.opts.port)))
        ? ":" + this.opts.port
        : "";
    }
    _query(t) {
      const e = (function (t) {
        let e = "";
        for (let s in t)
          t.hasOwnProperty(s) &&
            (e.length && (e += "&"),
            (e += encodeURIComponent(s) + "=" + encodeURIComponent(t[s])));
        return e;
      })(t);
      return e.length ? "?" + e : "";
    }
  }
  class x extends S {
    constructor() {
      super(...arguments), (this._polling = !1);
    }
    get name() {
      return "polling";
    }
    doOpen() {
      this._poll();
    }
    pause(t) {
      this.readyState = "pausing";
      const e = () => {
        (this.readyState = "paused"), t();
      };
      if (this._polling || !this.writable) {
        let t = 0;
        this._polling &&
          (t++,
          this.once("pollComplete", function () {
            --t || e();
          })),
          this.writable ||
            (t++,
            this.once("drain", function () {
              --t || e();
            }));
      } else e();
    }
    _poll() {
      (this._polling = !0), this.doPoll(), this.emitReserved("poll");
    }
    onData(t) {
      ((t, e) => {
        const s = t.split(m),
          n = [];
        for (let t = 0; t < s.length; t++) {
          const i = f(s[t], e);
          if ((n.push(i), "error" === i.type)) break;
        }
        return n;
      })(t, this.socket.binaryType).forEach((t) => {
        if (
          ("opening" === this.readyState && "open" === t.type && this.onOpen(),
          "close" === t.type)
        )
          return (
            this.onClose({ description: "transport closed by the server" }), !1
          );
        this.onPacket(t);
      }),
        "closed" !== this.readyState &&
          ((this._polling = !1),
          this.emitReserved("pollComplete"),
          "open" === this.readyState && this._poll());
    }
    doClose() {
      const t = () => {
        this.write([{ type: "close" }]);
      };
      "open" === this.readyState ? t() : this.once("open", t);
    }
    write(t) {
      (this.writable = !1),
        ((t, e) => {
          const s = t.length,
            n = new Array(s);
          let i = 0;
          t.forEach((t, r) => {
            h(t, !1, (t) => {
              (n[r] = t), ++i === s && e(n.join(m));
            });
          });
        })(t, (t) => {
          this.doWrite(t, () => {
            (this.writable = !0), this.emitReserved("drain");
          });
        });
    }
    uri() {
      const t = this.opts.secure ? "https" : "http",
        e = this.query || {};
      return (
        !1 !== this.opts.timestampRequests &&
          (e[this.opts.timestampParam] = R()),
        this.supportsBinary || e.sid || (e.b64 = 1),
        this.createUri(t, e)
      );
    }
  }
  let N = !1;
  try {
    N =
      "undefined" != typeof XMLHttpRequest &&
      "withCredentials" in new XMLHttpRequest();
  } catch (t) {}
  const L = N;
  function q() {}
  class P extends x {
    constructor(t) {
      if ((super(t), "undefined" != typeof location)) {
        const e = "https:" === location.protocol;
        let s = location.port;
        s || (s = e ? "443" : "80"),
          (this.xd =
            ("undefined" != typeof location &&
              t.hostname !== location.hostname) ||
            s !== t.port);
      }
    }
    doWrite(t, e) {
      const s = this.request({ method: "POST", data: t });
      s.on("success", e),
        s.on("error", (t, e) => {
          this.onError("xhr post error", t, e);
        });
    }
    doPoll() {
      const t = this.request();
      t.on("data", this.onData.bind(this)),
        t.on("error", (t, e) => {
          this.onError("xhr poll error", t, e);
        }),
        (this.pollXhr = t);
    }
  }
  class j extends w {
    constructor(t, e, s) {
      super(),
        (this.createRequest = t),
        C(this, s),
        (this._opts = s),
        (this._method = s.method || "GET"),
        (this._uri = e),
        (this._data = void 0 !== s.data ? s.data : null),
        this._create();
    }
    _create() {
      var t;
      const e = A(
        this._opts,
        "agent",
        "pfx",
        "key",
        "passphrase",
        "cert",
        "ca",
        "ciphers",
        "rejectUnauthorized",
        "autoUnref",
      );
      e.xdomain = !!this._opts.xd;
      const s = (this._xhr = this.createRequest(e));
      try {
        s.open(this._method, this._uri, !0);
        try {
          if (this._opts.extraHeaders) {
            s.setDisableHeaderCheck && s.setDisableHeaderCheck(!0);
            for (let t in this._opts.extraHeaders)
              this._opts.extraHeaders.hasOwnProperty(t) &&
                s.setRequestHeader(t, this._opts.extraHeaders[t]);
          }
        } catch (t) {}
        if ("POST" === this._method)
          try {
            s.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (t) {}
        try {
          s.setRequestHeader("Accept", "*/*");
        } catch (t) {}
        null === (t = this._opts.cookieJar) || void 0 === t || t.addCookies(s),
          "withCredentials" in s &&
            (s.withCredentials = this._opts.withCredentials),
          this._opts.requestTimeout && (s.timeout = this._opts.requestTimeout),
          (s.onreadystatechange = () => {
            var t;
            3 === s.readyState &&
              (null === (t = this._opts.cookieJar) ||
                void 0 === t ||
                t.parseCookies(s.getResponseHeader("set-cookie"))),
              4 === s.readyState &&
                (200 === s.status || 1223 === s.status
                  ? this._onLoad()
                  : this.setTimeoutFn(() => {
                      this._onError("number" == typeof s.status ? s.status : 0);
                    }, 0));
          }),
          s.send(this._data);
      } catch (t) {
        return void this.setTimeoutFn(() => {
          this._onError(t);
        }, 0);
      }
      "undefined" != typeof document &&
        ((this._index = j.requestsCount++), (j.requests[this._index] = this));
    }
    _onError(t) {
      this.emitReserved("error", t, this._xhr), this._cleanup(!0);
    }
    _cleanup(t) {
      if (void 0 !== this._xhr && null !== this._xhr) {
        if (((this._xhr.onreadystatechange = q), t))
          try {
            this._xhr.abort();
          } catch (t) {}
        "undefined" != typeof document && delete j.requests[this._index],
          (this._xhr = null);
      }
    }
    _onLoad() {
      const t = this._xhr.responseText;
      null !== t &&
        (this.emitReserved("data", t),
        this.emitReserved("success"),
        this._cleanup());
    }
    abort() {
      this._cleanup();
    }
  }
  function U() {
    for (let t in j.requests)
      j.requests.hasOwnProperty(t) && j.requests[t].abort();
  }
  (j.requestsCount = 0),
    (j.requests = {}),
    "undefined" != typeof document &&
      ("function" == typeof attachEvent
        ? attachEvent("onunload", U)
        : "function" == typeof addEventListener &&
          addEventListener("onpagehide" in E ? "pagehide" : "unload", U, !1));
  const I = (function () {
    const t = D({ xdomain: !1 });
    return t && null !== t.responseType;
  })();
  function D(t) {
    const e = t.xdomain;
    try {
      if ("undefined" != typeof XMLHttpRequest && (!e || L))
        return new XMLHttpRequest();
    } catch (t) {}
    if (!e)
      try {
        return new E[["Active"].concat("Object").join("X")](
          "Microsoft.XMLHTTP",
        );
      } catch (t) {}
  }
  const F =
    "undefined" != typeof navigator &&
    "string" == typeof navigator.product &&
    "reactnative" === navigator.product.toLowerCase();
  class M extends S {
    get name() {
      return "websocket";
    }
    doOpen() {
      const t = this.uri(),
        e = this.opts.protocols,
        s = F
          ? {}
          : A(
              this.opts,
              "agent",
              "perMessageDeflate",
              "pfx",
              "key",
              "passphrase",
              "cert",
              "ca",
              "ciphers",
              "rejectUnauthorized",
              "localAddress",
              "protocolVersion",
              "origin",
              "maxPayload",
              "family",
              "checkServerIdentity",
            );
      this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
      try {
        this.ws = this.createSocket(t, e, s);
      } catch (t) {
        return this.emitReserved("error", t);
      }
      (this.ws.binaryType = this.socket.binaryType), this.addEventListeners();
    }
    addEventListeners() {
      (this.ws.onopen = () => {
        this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
      }),
        (this.ws.onclose = (t) =>
          this.onClose({
            description: "websocket connection closed",
            context: t,
          })),
        (this.ws.onmessage = (t) => this.onData(t.data)),
        (this.ws.onerror = (t) => this.onError("websocket error", t));
    }
    write(t) {
      this.writable = !1;
      for (let e = 0; e < t.length; e++) {
        const s = t[e],
          n = e === t.length - 1;
        h(s, this.supportsBinary, (t) => {
          try {
            this.doWrite(s, t);
          } catch (t) {}
          n &&
            k(() => {
              (this.writable = !0), this.emitReserved("drain");
            }, this.setTimeoutFn);
        });
      }
    }
    doClose() {
      void 0 !== this.ws &&
        ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
    }
    uri() {
      const t = this.opts.secure ? "wss" : "ws",
        e = this.query || {};
      return (
        this.opts.timestampRequests && (e[this.opts.timestampParam] = R()),
        this.supportsBinary || (e.b64 = 1),
        this.createUri(t, e)
      );
    }
  }
  const V = E.WebSocket || E.MozWebSocket,
    H = {
      websocket: class extends M {
        createSocket(t, e, s) {
          return F ? new V(t, e, s) : e ? new V(t, e) : new V(t);
        }
        doWrite(t, e) {
          this.ws.send(e);
        }
      },
      webtransport: class extends S {
        get name() {
          return "webtransport";
        }
        doOpen() {
          try {
            this._transport = new WebTransport(
              this.createUri("https"),
              this.opts.transportOptions[this.name],
            );
          } catch (t) {
            return this.emitReserved("error", t);
          }
          this._transport.closed
            .then(() => {
              this.onClose();
            })
            .catch((t) => {
              this.onError("webtransport error", t);
            }),
            this._transport.ready.then(() => {
              this._transport.createBidirectionalStream().then((t) => {
                const e = (function (t, e) {
                    _ || (_ = new TextDecoder());
                    const s = [];
                    let n = 0,
                      r = -1,
                      o = !1;
                    return new TransformStream({
                      transform(a, h) {
                        for (s.push(a); ; ) {
                          if (0 === n) {
                            if (b(s) < 1) break;
                            const t = v(s, 1);
                            (o = !(128 & ~t[0])),
                              (r = 127 & t[0]),
                              (n = r < 126 ? 3 : 126 === r ? 1 : 2);
                          } else if (1 === n) {
                            if (b(s) < 2) break;
                            const t = v(s, 2);
                            (r = new DataView(
                              t.buffer,
                              t.byteOffset,
                              t.length,
                            ).getUint16(0)),
                              (n = 3);
                          } else if (2 === n) {
                            if (b(s) < 8) break;
                            const t = v(s, 8),
                              e = new DataView(
                                t.buffer,
                                t.byteOffset,
                                t.length,
                              ),
                              o = e.getUint32(0);
                            if (o > Math.pow(2, 21) - 1) {
                              h.enqueue(i);
                              break;
                            }
                            (r = o * Math.pow(2, 32) + e.getUint32(4)), (n = 3);
                          } else {
                            if (b(s) < r) break;
                            const t = v(s, r);
                            h.enqueue(f(o ? t : _.decode(t), e)), (n = 0);
                          }
                          if (0 === r || r > t) {
                            h.enqueue(i);
                            break;
                          }
                        }
                      },
                    });
                  })(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
                  s = t.readable.pipeThrough(e).getReader(),
                  n = new TransformStream({
                    transform(t, e) {
                      !(function (t, e) {
                        r && t.data instanceof Blob
                          ? t.data.arrayBuffer().then(p).then(e)
                          : o && (t.data instanceof ArrayBuffer || a(t.data))
                            ? e(p(t.data))
                            : h(t, !1, (t) => {
                                u || (u = new TextEncoder()), e(u.encode(t));
                              });
                      })(t, (s) => {
                        const n = s.length;
                        let i;
                        if (n < 126)
                          (i = new Uint8Array(1)),
                            new DataView(i.buffer).setUint8(0, n);
                        else if (n < 65536) {
                          i = new Uint8Array(3);
                          const t = new DataView(i.buffer);
                          t.setUint8(0, 126), t.setUint16(1, n);
                        } else {
                          i = new Uint8Array(9);
                          const t = new DataView(i.buffer);
                          t.setUint8(0, 127), t.setBigUint64(1, BigInt(n));
                        }
                        t.data && "string" != typeof t.data && (i[0] |= 128),
                          e.enqueue(i),
                          e.enqueue(s);
                      });
                    },
                  });
                n.readable.pipeTo(t.writable),
                  (this._writer = n.writable.getWriter());
                const c = () => {
                  s.read()
                    .then(({ done: t, value: e }) => {
                      t || (this.onPacket(e), c());
                    })
                    .catch((t) => {});
                };
                c();
                const l = { type: "open" };
                this.query.sid && (l.data = `{"sid":"${this.query.sid}"}`),
                  this._writer.write(l).then(() => this.onOpen());
              });
            });
        }
        write(t) {
          this.writable = !1;
          for (let e = 0; e < t.length; e++) {
            const s = t[e],
              n = e === t.length - 1;
            this._writer.write(s).then(() => {
              n &&
                k(() => {
                  (this.writable = !0), this.emitReserved("drain");
                }, this.setTimeoutFn);
            });
          }
        }
        doClose() {
          var t;
          null === (t = this._transport) || void 0 === t || t.close();
        }
      },
      polling: class extends P {
        constructor(t) {
          super(t);
          const e = t && t.forceBase64;
          this.supportsBinary = I && !e;
        }
        request(t = {}) {
          return (
            Object.assign(t, { xd: this.xd }, this.opts),
            new j(D, this.uri(), t)
          );
        }
      },
    },
    K =
      /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    W = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor",
    ];
  function Y(t) {
    if (t.length > 8e3) throw "URI too long";
    const e = t,
      s = t.indexOf("["),
      n = t.indexOf("]");
    -1 != s &&
      -1 != n &&
      (t =
        t.substring(0, s) +
        t.substring(s, n).replace(/:/g, ";") +
        t.substring(n, t.length));
    let i = K.exec(t || ""),
      r = {},
      o = 14;
    for (; o--; ) r[W[o]] = i[o] || "";
    return (
      -1 != s &&
        -1 != n &&
        ((r.source = e),
        (r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":")),
        (r.authority = r.authority
          .replace("[", "")
          .replace("]", "")
          .replace(/;/g, ":")),
        (r.ipv6uri = !0)),
      (r.pathNames = (function (t, e) {
        const s = e.replace(/\/{2,9}/g, "/").split("/");
        return (
          ("/" != e.slice(0, 1) && 0 !== e.length) || s.splice(0, 1),
          "/" == e.slice(-1) && s.splice(s.length - 1, 1),
          s
        );
      })(0, r.path)),
      (r.queryKey = (function (t, e) {
        const s = {};
        return (
          e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
            e && (s[e] = n);
          }),
          s
        );
      })(0, r.query)),
      r
    );
  }
  const z =
      "function" == typeof addEventListener &&
      "function" == typeof removeEventListener,
    $ = [];
  z &&
    addEventListener(
      "offline",
      () => {
        $.forEach((t) => t());
      },
      !1,
    );
  class J extends w {
    constructor(t, e) {
      if (
        (super(),
        (this.binaryType = "arraybuffer"),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0),
        (this._pingInterval = -1),
        (this._pingTimeout = -1),
        (this._maxPayload = -1),
        (this._pingTimeoutTime = 1 / 0),
        t && "object" == typeof t && ((e = t), (t = null)),
        t)
      ) {
        const s = Y(t);
        (e.hostname = s.host),
          (e.secure = "https" === s.protocol || "wss" === s.protocol),
          (e.port = s.port),
          s.query && (e.query = s.query);
      } else e.host && (e.hostname = Y(e.host).host);
      C(this, e),
        (this.secure =
          null != e.secure
            ? e.secure
            : "undefined" != typeof location && "https:" === location.protocol),
        e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
        (this.hostname =
          e.hostname ||
          ("undefined" != typeof location ? location.hostname : "localhost")),
        (this.port =
          e.port ||
          ("undefined" != typeof location && location.port
            ? location.port
            : this.secure
              ? "443"
              : "80")),
        (this.transports = []),
        (this._transportsByName = {}),
        e.transports.forEach((t) => {
          const e = t.prototype.name;
          this.transports.push(e), (this._transportsByName[e] = t);
        }),
        (this.opts = Object.assign(
          {
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            addTrailingSlash: !0,
            rejectUnauthorized: !0,
            perMessageDeflate: { threshold: 1024 },
            transportOptions: {},
            closeOnBeforeunload: !1,
          },
          e,
        )),
        (this.opts.path =
          this.opts.path.replace(/\/$/, "") +
          (this.opts.addTrailingSlash ? "/" : "")),
        "string" == typeof this.opts.query &&
          (this.opts.query = (function (t) {
            let e = {},
              s = t.split("&");
            for (let t = 0, n = s.length; t < n; t++) {
              let n = s[t].split("=");
              e[decodeURIComponent(n[0])] = decodeURIComponent(n[1]);
            }
            return e;
          })(this.opts.query)),
        z &&
          (this.opts.closeOnBeforeunload &&
            ((this._beforeunloadEventListener = () => {
              this.transport &&
                (this.transport.removeAllListeners(), this.transport.close());
            }),
            addEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1,
            )),
          "localhost" !== this.hostname &&
            ((this._offlineEventListener = () => {
              this._onClose("transport close", {
                description: "network connection lost",
              });
            }),
            $.push(this._offlineEventListener))),
        this.opts.withCredentials && (this._cookieJar = void 0),
        this._open();
    }
    createTransport(t) {
      const e = Object.assign({}, this.opts.query);
      (e.EIO = 4), (e.transport = t), this.id && (e.sid = this.id);
      const s = Object.assign(
        {},
        this.opts,
        {
          query: e,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port,
        },
        this.opts.transportOptions[t],
      );
      return new this._transportsByName[t](s);
    }
    _open() {
      if (0 === this.transports.length)
        return void this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
      const t =
        this.opts.rememberUpgrade &&
        J.priorWebsocketSuccess &&
        -1 !== this.transports.indexOf("websocket")
          ? "websocket"
          : this.transports[0];
      this.readyState = "opening";
      const e = this.createTransport(t);
      e.open(), this.setTransport(e);
    }
    setTransport(t) {
      this.transport && this.transport.removeAllListeners(),
        (this.transport = t),
        t
          .on("drain", this._onDrain.bind(this))
          .on("packet", this._onPacket.bind(this))
          .on("error", this._onError.bind(this))
          .on("close", (t) => this._onClose("transport close", t));
    }
    onOpen() {
      (this.readyState = "open"),
        (J.priorWebsocketSuccess = "websocket" === this.transport.name),
        this.emitReserved("open"),
        this.flush();
    }
    _onPacket(t) {
      if (
        "opening" === this.readyState ||
        "open" === this.readyState ||
        "closing" === this.readyState
      )
        switch (
          (this.emitReserved("packet", t),
          this.emitReserved("heartbeat"),
          t.type)
        ) {
          case "open":
            this.onHandshake(JSON.parse(t.data));
            break;
          case "ping":
            this._sendPacket("pong"),
              this.emitReserved("ping"),
              this.emitReserved("pong"),
              this._resetPingTimeout();
            break;
          case "error":
            const e = new Error("server error");
            (e.code = t.data), this._onError(e);
            break;
          case "message":
            this.emitReserved("data", t.data),
              this.emitReserved("message", t.data);
        }
    }
    onHandshake(t) {
      this.emitReserved("handshake", t),
        (this.id = t.sid),
        (this.transport.query.sid = t.sid),
        (this._pingInterval = t.pingInterval),
        (this._pingTimeout = t.pingTimeout),
        (this._maxPayload = t.maxPayload),
        this.onOpen(),
        "closed" !== this.readyState && this._resetPingTimeout();
    }
    _resetPingTimeout() {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      const t = this._pingInterval + this._pingTimeout;
      (this._pingTimeoutTime = Date.now() + t),
        (this._pingTimeoutTimer = this.setTimeoutFn(() => {
          this._onClose("ping timeout");
        }, t)),
        this.opts.autoUnref && this._pingTimeoutTimer.unref();
    }
    _onDrain() {
      this.writeBuffer.splice(0, this._prevBufferLen),
        (this._prevBufferLen = 0),
        0 === this.writeBuffer.length
          ? this.emitReserved("drain")
          : this.flush();
    }
    flush() {
      if (
        "closed" !== this.readyState &&
        this.transport.writable &&
        !this.upgrading &&
        this.writeBuffer.length
      ) {
        const t = this._getWritablePackets();
        this.transport.send(t),
          (this._prevBufferLen = t.length),
          this.emitReserved("flush");
      }
    }
    _getWritablePackets() {
      if (
        !(
          this._maxPayload &&
          "polling" === this.transport.name &&
          this.writeBuffer.length > 1
        )
      )
        return this.writeBuffer;
      let t = 1;
      for (let s = 0; s < this.writeBuffer.length; s++) {
        const n = this.writeBuffer[s].data;
        if (
          (n &&
            (t +=
              "string" == typeof (e = n)
                ? (function (t) {
                    let e = 0,
                      s = 0;
                    for (let n = 0, i = t.length; n < i; n++)
                      (e = t.charCodeAt(n)),
                        e < 128
                          ? (s += 1)
                          : e < 2048
                            ? (s += 2)
                            : e < 55296 || e >= 57344
                              ? (s += 3)
                              : (n++, (s += 4));
                    return s;
                  })(e)
                : Math.ceil(1.33 * (e.byteLength || e.size))),
          s > 0 && t > this._maxPayload)
        )
          return this.writeBuffer.slice(0, s);
        t += 2;
      }
      var e;
      return this.writeBuffer;
    }
    _hasPingExpired() {
      if (!this._pingTimeoutTime) return !0;
      const t = Date.now() > this._pingTimeoutTime;
      return (
        t &&
          ((this._pingTimeoutTime = 0),
          k(() => {
            this._onClose("ping timeout");
          }, this.setTimeoutFn)),
        t
      );
    }
    write(t, e, s) {
      return this._sendPacket("message", t, e, s), this;
    }
    send(t, e, s) {
      return this._sendPacket("message", t, e, s), this;
    }
    _sendPacket(t, e, s, n) {
      if (
        ("function" == typeof e && ((n = e), (e = void 0)),
        "function" == typeof s && ((n = s), (s = null)),
        "closing" === this.readyState || "closed" === this.readyState)
      )
        return;
      (s = s || {}).compress = !1 !== s.compress;
      const i = { type: t, data: e, options: s };
      this.emitReserved("packetCreate", i),
        this.writeBuffer.push(i),
        n && this.once("flush", n),
        this.flush();
    }
    close() {
      const t = () => {
          this._onClose("forced close"), this.transport.close();
        },
        e = () => {
          this.off("upgrade", e), this.off("upgradeError", e), t();
        },
        s = () => {
          this.once("upgrade", e), this.once("upgradeError", e);
        };
      return (
        ("opening" !== this.readyState && "open" !== this.readyState) ||
          ((this.readyState = "closing"),
          this.writeBuffer.length
            ? this.once("drain", () => {
                this.upgrading ? s() : t();
              })
            : this.upgrading
              ? s()
              : t()),
        this
      );
    }
    _onError(t) {
      if (
        ((J.priorWebsocketSuccess = !1),
        this.opts.tryAllTransports &&
          this.transports.length > 1 &&
          "opening" === this.readyState)
      )
        return this.transports.shift(), this._open();
      this.emitReserved("error", t), this._onClose("transport error", t);
    }
    _onClose(t, e) {
      if (
        "opening" === this.readyState ||
        "open" === this.readyState ||
        "closing" === this.readyState
      ) {
        if (
          (this.clearTimeoutFn(this._pingTimeoutTimer),
          this.transport.removeAllListeners("close"),
          this.transport.close(),
          this.transport.removeAllListeners(),
          z &&
            (this._beforeunloadEventListener &&
              removeEventListener(
                "beforeunload",
                this._beforeunloadEventListener,
                !1,
              ),
            this._offlineEventListener))
        ) {
          const t = $.indexOf(this._offlineEventListener);
          -1 !== t && $.splice(t, 1);
        }
        (this.readyState = "closed"),
          (this.id = null),
          this.emitReserved("close", t, e),
          (this.writeBuffer = []),
          (this._prevBufferLen = 0);
      }
    }
  }
  J.protocol = 4;
  class Q extends J {
    constructor() {
      super(...arguments), (this._upgrades = []);
    }
    onOpen() {
      if ((super.onOpen(), "open" === this.readyState && this.opts.upgrade))
        for (let t = 0; t < this._upgrades.length; t++)
          this._probe(this._upgrades[t]);
    }
    _probe(t) {
      let e = this.createTransport(t),
        s = !1;
      J.priorWebsocketSuccess = !1;
      const n = () => {
        s ||
          (e.send([{ type: "ping", data: "probe" }]),
          e.once("packet", (t) => {
            if (!s)
              if ("pong" === t.type && "probe" === t.data) {
                if (
                  ((this.upgrading = !0), this.emitReserved("upgrading", e), !e)
                )
                  return;
                (J.priorWebsocketSuccess = "websocket" === e.name),
                  this.transport.pause(() => {
                    s ||
                      ("closed" !== this.readyState &&
                        (c(),
                        this.setTransport(e),
                        e.send([{ type: "upgrade" }]),
                        this.emitReserved("upgrade", e),
                        (e = null),
                        (this.upgrading = !1),
                        this.flush()));
                  });
              } else {
                const t = new Error("probe error");
                (t.transport = e.name), this.emitReserved("upgradeError", t);
              }
          }));
      };
      function i() {
        s || ((s = !0), c(), e.close(), (e = null));
      }
      const r = (t) => {
        const s = new Error("probe error: " + t);
        (s.transport = e.name), i(), this.emitReserved("upgradeError", s);
      };
      function o() {
        r("transport closed");
      }
      function a() {
        r("socket closed");
      }
      function h(t) {
        e && t.name !== e.name && i();
      }
      const c = () => {
        e.removeListener("open", n),
          e.removeListener("error", r),
          e.removeListener("close", o),
          this.off("close", a),
          this.off("upgrading", h);
      };
      e.once("open", n),
        e.once("error", r),
        e.once("close", o),
        this.once("close", a),
        this.once("upgrading", h),
        -1 !== this._upgrades.indexOf("webtransport") && "webtransport" !== t
          ? this.setTimeoutFn(() => {
              s || e.open();
            }, 200)
          : e.open();
    }
    onHandshake(t) {
      (this._upgrades = this._filterUpgrades(t.upgrades)), super.onHandshake(t);
    }
    _filterUpgrades(t) {
      const e = [];
      for (let s = 0; s < t.length; s++)
        ~this.transports.indexOf(t[s]) && e.push(t[s]);
      return e;
    }
  }
  class X extends Q {
    constructor(t, e = {}) {
      const s = "object" == typeof t ? t : e;
      (!s.transports || (s.transports && "string" == typeof s.transports[0])) &&
        (s.transports = (
          s.transports || ["polling", "websocket", "webtransport"]
        )
          .map((t) => H[t])
          .filter((t) => !!t)),
        super(t, s);
    }
  }
  const G = "function" == typeof ArrayBuffer,
    Z = Object.prototype.toString,
    tt =
      "function" == typeof Blob ||
      ("undefined" != typeof Blob &&
        "[object BlobConstructor]" === Z.call(Blob)),
    et =
      "function" == typeof File ||
      ("undefined" != typeof File &&
        "[object FileConstructor]" === Z.call(File));
  function st(t) {
    return (
      (G &&
        (t instanceof ArrayBuffer ||
          ((t) =>
            "function" == typeof ArrayBuffer.isView
              ? ArrayBuffer.isView(t)
              : t.buffer instanceof ArrayBuffer)(t))) ||
      (tt && t instanceof Blob) ||
      (et && t instanceof File)
    );
  }
  function nt(t, e) {
    if (!t || "object" != typeof t) return !1;
    if (Array.isArray(t)) {
      for (let e = 0, s = t.length; e < s; e++) if (nt(t[e])) return !0;
      return !1;
    }
    if (st(t)) return !0;
    if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
      return nt(t.toJSON(), !0);
    for (const e in t)
      if (Object.prototype.hasOwnProperty.call(t, e) && nt(t[e])) return !0;
    return !1;
  }
  function it(t) {
    const e = [],
      s = t.data,
      n = t;
    return (
      (n.data = rt(s, e)), (n.attachments = e.length), { packet: n, buffers: e }
    );
  }
  function rt(t, e) {
    if (!t) return t;
    if (st(t)) {
      const s = { _placeholder: !0, num: e.length };
      return e.push(t), s;
    }
    if (Array.isArray(t)) {
      const s = new Array(t.length);
      for (let n = 0; n < t.length; n++) s[n] = rt(t[n], e);
      return s;
    }
    if ("object" == typeof t && !(t instanceof Date)) {
      const s = {};
      for (const n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (s[n] = rt(t[n], e));
      return s;
    }
    return t;
  }
  function ot(t, e) {
    return (t.data = at(t.data, e)), delete t.attachments, t;
  }
  function at(t, e) {
    if (!t) return t;
    if (t && !0 === t._placeholder) {
      if ("number" == typeof t.num && t.num >= 0 && t.num < e.length)
        return e[t.num];
      throw new Error("illegal attachments");
    }
    if (Array.isArray(t)) for (let s = 0; s < t.length; s++) t[s] = at(t[s], e);
    else if ("object" == typeof t)
      for (const s in t)
        Object.prototype.hasOwnProperty.call(t, s) && (t[s] = at(t[s], e));
    return t;
  }
  const ht = [
      "connect",
      "connect_error",
      "disconnect",
      "disconnecting",
      "newListener",
      "removeListener",
    ],
    ct = 5;
  var pt;
  !(function (t) {
    (t[(t.CONNECT = 0)] = "CONNECT"),
      (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
      (t[(t.EVENT = 2)] = "EVENT"),
      (t[(t.ACK = 3)] = "ACK"),
      (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
      (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
      (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
  })(pt || (pt = {}));
  class ut {
    constructor(t) {
      this.replacer = t;
    }
    encode(t) {
      return (t.type !== pt.EVENT && t.type !== pt.ACK) || !nt(t)
        ? [this.encodeAsString(t)]
        : this.encodeAsBinary({
            type: t.type === pt.EVENT ? pt.BINARY_EVENT : pt.BINARY_ACK,
            nsp: t.nsp,
            data: t.data,
            id: t.id,
          });
    }
    encodeAsString(t) {
      let e = "" + t.type;
      return (
        (t.type !== pt.BINARY_EVENT && t.type !== pt.BINARY_ACK) ||
          (e += t.attachments + "-"),
        t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
        null != t.id && (e += t.id),
        null != t.data && (e += JSON.stringify(t.data, this.replacer)),
        e
      );
    }
    encodeAsBinary(t) {
      const e = it(t),
        s = this.encodeAsString(e.packet),
        n = e.buffers;
      return n.unshift(s), n;
    }
  }
  function lt(t) {
    return "[object Object]" === Object.prototype.toString.call(t);
  }
  class dt extends w {
    constructor(t) {
      super(), (this.reviver = t);
    }
    add(t) {
      let e;
      if ("string" == typeof t) {
        if (this.reconstructor)
          throw new Error("got plaintext data when reconstructing a packet");
        e = this.decodeString(t);
        const s = e.type === pt.BINARY_EVENT;
        s || e.type === pt.BINARY_ACK
          ? ((e.type = s ? pt.EVENT : pt.ACK),
            (this.reconstructor = new ft(e)),
            0 === e.attachments && super.emitReserved("decoded", e))
          : super.emitReserved("decoded", e);
      } else {
        if (!st(t) && !t.base64) throw new Error("Unknown type: " + t);
        if (!this.reconstructor)
          throw new Error("got binary data when not reconstructing a packet");
        (e = this.reconstructor.takeBinaryData(t)),
          e && ((this.reconstructor = null), super.emitReserved("decoded", e));
      }
    }
    decodeString(t) {
      let e = 0;
      const s = { type: Number(t.charAt(0)) };
      if (void 0 === pt[s.type])
        throw new Error("unknown packet type " + s.type);
      if (s.type === pt.BINARY_EVENT || s.type === pt.BINARY_ACK) {
        const n = e + 1;
        for (; "-" !== t.charAt(++e) && e != t.length; );
        const i = t.substring(n, e);
        if (i != Number(i) || "-" !== t.charAt(e))
          throw new Error("Illegal attachments");
        s.attachments = Number(i);
      }
      if ("/" === t.charAt(e + 1)) {
        const n = e + 1;
        for (; ++e && "," !== t.charAt(e) && e !== t.length; );
        s.nsp = t.substring(n, e);
      } else s.nsp = "/";
      const n = t.charAt(e + 1);
      if ("" !== n && Number(n) == n) {
        const n = e + 1;
        for (; ++e; ) {
          const s = t.charAt(e);
          if (null == s || Number(s) != s) {
            --e;
            break;
          }
          if (e === t.length) break;
        }
        s.id = Number(t.substring(n, e + 1));
      }
      if (t.charAt(++e)) {
        const n = this.tryParse(t.substr(e));
        if (!dt.isPayloadValid(s.type, n)) throw new Error("invalid payload");
        s.data = n;
      }
      return s;
    }
    tryParse(t) {
      try {
        return JSON.parse(t, this.reviver);
      } catch (t) {
        return !1;
      }
    }
    static isPayloadValid(t, e) {
      switch (t) {
        case pt.CONNECT:
          return lt(e);
        case pt.DISCONNECT:
          return void 0 === e;
        case pt.CONNECT_ERROR:
          return "string" == typeof e || lt(e);
        case pt.EVENT:
        case pt.BINARY_EVENT:
          return (
            Array.isArray(e) &&
            ("number" == typeof e[0] ||
              ("string" == typeof e[0] && -1 === ht.indexOf(e[0])))
          );
        case pt.ACK:
        case pt.BINARY_ACK:
          return Array.isArray(e);
      }
    }
    destroy() {
      this.reconstructor &&
        (this.reconstructor.finishedReconstruction(),
        (this.reconstructor = null));
    }
  }
  class ft {
    constructor(t) {
      (this.packet = t), (this.buffers = []), (this.reconPack = t);
    }
    takeBinaryData(t) {
      if (
        (this.buffers.push(t),
        this.buffers.length === this.reconPack.attachments)
      ) {
        const t = ot(this.reconPack, this.buffers);
        return this.finishedReconstruction(), t;
      }
      return null;
    }
    finishedReconstruction() {
      (this.reconPack = null), (this.buffers = []);
    }
  }
  function yt(t, e, s) {
    return (
      t.on(e, s),
      function () {
        t.off(e, s);
      }
    );
  }
  const gt = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1,
  });
  class mt extends w {
    constructor(t, e, s) {
      super(),
        (this.connected = !1),
        (this.recovered = !1),
        (this.receiveBuffer = []),
        (this.sendBuffer = []),
        (this._queue = []),
        (this._queueSeq = 0),
        (this.ids = 0),
        (this.acks = {}),
        (this.flags = {}),
        (this.io = t),
        (this.nsp = e),
        s && s.auth && (this.auth = s.auth),
        (this._opts = Object.assign({}, s)),
        this.io._autoConnect && this.open();
    }
    get disconnected() {
      return !this.connected;
    }
    subEvents() {
      if (this.subs) return;
      const t = this.io;
      this.subs = [
        yt(t, "open", this.onopen.bind(this)),
        yt(t, "packet", this.onpacket.bind(this)),
        yt(t, "error", this.onerror.bind(this)),
        yt(t, "close", this.onclose.bind(this)),
      ];
    }
    get active() {
      return !!this.subs;
    }
    connect() {
      return (
        this.connected ||
          (this.subEvents(),
          this.io._reconnecting || this.io.open(),
          "open" === this.io._readyState && this.onopen()),
        this
      );
    }
    open() {
      return this.connect();
    }
    send(...t) {
      return t.unshift("message"), this.emit.apply(this, t), this;
    }
    emit(t, ...e) {
      var s, n, i;
      if (gt.hasOwnProperty(t))
        throw new Error('"' + t.toString() + '" is a reserved event name');
      if (
        (e.unshift(t),
        this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      )
        return this._addToQueue(e), this;
      const r = { type: pt.EVENT, data: e, options: {} };
      if (
        ((r.options.compress = !1 !== this.flags.compress),
        "function" == typeof e[e.length - 1])
      ) {
        const t = this.ids++,
          s = e.pop();
        this._registerAckCallback(t, s), (r.id = t);
      }
      const o =
          null ===
            (n =
              null === (s = this.io.engine) || void 0 === s
                ? void 0
                : s.transport) || void 0 === n
            ? void 0
            : n.writable,
        a =
          this.connected &&
          !(null === (i = this.io.engine) || void 0 === i
            ? void 0
            : i._hasPingExpired());
      return (
        (this.flags.volatile && !o) ||
          (a
            ? (this.notifyOutgoingListeners(r), this.packet(r))
            : this.sendBuffer.push(r)),
        (this.flags = {}),
        this
      );
    }
    _registerAckCallback(t, e) {
      var s;
      const n =
        null !== (s = this.flags.timeout) && void 0 !== s
          ? s
          : this._opts.ackTimeout;
      if (void 0 === n) return void (this.acks[t] = e);
      const i = this.io.setTimeoutFn(() => {
          delete this.acks[t];
          for (let e = 0; e < this.sendBuffer.length; e++)
            this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
          e.call(this, new Error("operation has timed out"));
        }, n),
        r = (...t) => {
          this.io.clearTimeoutFn(i), e.apply(this, t);
        };
      (r.withError = !0), (this.acks[t] = r);
    }
    emitWithAck(t, ...e) {
      return new Promise((s, n) => {
        const i = (t, e) => (t ? n(t) : s(e));
        (i.withError = !0), e.push(i), this.emit(t, ...e);
      });
    }
    _addToQueue(t) {
      let e;
      "function" == typeof t[t.length - 1] && (e = t.pop());
      const s = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: !1,
        args: t,
        flags: Object.assign({ fromQueue: !0 }, this.flags),
      };
      t.push((t, ...n) => {
        if (s === this._queue[0])
          return (
            null !== t
              ? s.tryCount > this._opts.retries &&
                (this._queue.shift(), e && e(t))
              : (this._queue.shift(), e && e(null, ...n)),
            (s.pending = !1),
            this._drainQueue()
          );
      }),
        this._queue.push(s),
        this._drainQueue();
    }
    _drainQueue(t = !1) {
      if (!this.connected || 0 === this._queue.length) return;
      const e = this._queue[0];
      (e.pending && !t) ||
        ((e.pending = !0),
        e.tryCount++,
        (this.flags = e.flags),
        this.emit.apply(this, e.args));
    }
    packet(t) {
      (t.nsp = this.nsp), this.io._packet(t);
    }
    onopen() {
      "function" == typeof this.auth
        ? this.auth((t) => {
            this._sendConnectPacket(t);
          })
        : this._sendConnectPacket(this.auth);
    }
    _sendConnectPacket(t) {
      this.packet({
        type: pt.CONNECT,
        data: this._pid
          ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
          : t,
      });
    }
    onerror(t) {
      this.connected || this.emitReserved("connect_error", t);
    }
    onclose(t, e) {
      (this.connected = !1),
        delete this.id,
        this.emitReserved("disconnect", t, e),
        this._clearAcks();
    }
    _clearAcks() {
      Object.keys(this.acks).forEach((t) => {
        if (!this.sendBuffer.some((e) => String(e.id) === t)) {
          const e = this.acks[t];
          delete this.acks[t],
            e.withError &&
              e.call(this, new Error("socket has been disconnected"));
        }
      });
    }
    onpacket(t) {
      if (t.nsp === this.nsp)
        switch (t.type) {
          case pt.CONNECT:
            t.data && t.data.sid
              ? this.onconnect(t.data.sid, t.data.pid)
              : this.emitReserved(
                  "connect_error",
                  new Error(
                    "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)",
                  ),
                );
            break;
          case pt.EVENT:
          case pt.BINARY_EVENT:
            this.onevent(t);
            break;
          case pt.ACK:
          case pt.BINARY_ACK:
            this.onack(t);
            break;
          case pt.DISCONNECT:
            this.ondisconnect();
            break;
          case pt.CONNECT_ERROR:
            this.destroy();
            const e = new Error(t.data.message);
            (e.data = t.data.data), this.emitReserved("connect_error", e);
        }
    }
    onevent(t) {
      const e = t.data || [];
      null != t.id && e.push(this.ack(t.id)),
        this.connected
          ? this.emitEvent(e)
          : this.receiveBuffer.push(Object.freeze(e));
    }
    emitEvent(t) {
      if (this._anyListeners && this._anyListeners.length) {
        const e = this._anyListeners.slice();
        for (const s of e) s.apply(this, t);
      }
      super.emit.apply(this, t),
        this._pid &&
          t.length &&
          "string" == typeof t[t.length - 1] &&
          (this._lastOffset = t[t.length - 1]);
    }
    ack(t) {
      const e = this;
      let s = !1;
      return function (...n) {
        s || ((s = !0), e.packet({ type: pt.ACK, id: t, data: n }));
      };
    }
    onack(t) {
      const e = this.acks[t.id];
      "function" == typeof e &&
        (delete this.acks[t.id],
        e.withError && t.data.unshift(null),
        e.apply(this, t.data));
    }
    onconnect(t, e) {
      (this.id = t),
        (this.recovered = e && this._pid === e),
        (this._pid = e),
        (this.connected = !0),
        this.emitBuffered(),
        this.emitReserved("connect"),
        this._drainQueue(!0);
    }
    emitBuffered() {
      this.receiveBuffer.forEach((t) => this.emitEvent(t)),
        (this.receiveBuffer = []),
        this.sendBuffer.forEach((t) => {
          this.notifyOutgoingListeners(t), this.packet(t);
        }),
        (this.sendBuffer = []);
    }
    ondisconnect() {
      this.destroy(), this.onclose("io server disconnect");
    }
    destroy() {
      this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
        this.io._destroy(this);
    }
    disconnect() {
      return (
        this.connected && this.packet({ type: pt.DISCONNECT }),
        this.destroy(),
        this.connected && this.onclose("io client disconnect"),
        this
      );
    }
    close() {
      return this.disconnect();
    }
    compress(t) {
      return (this.flags.compress = t), this;
    }
    get volatile() {
      return (this.flags.volatile = !0), this;
    }
    timeout(t) {
      return (this.flags.timeout = t), this;
    }
    onAny(t) {
      return (
        (this._anyListeners = this._anyListeners || []),
        this._anyListeners.push(t),
        this
      );
    }
    prependAny(t) {
      return (
        (this._anyListeners = this._anyListeners || []),
        this._anyListeners.unshift(t),
        this
      );
    }
    offAny(t) {
      if (!this._anyListeners) return this;
      if (t) {
        const e = this._anyListeners;
        for (let s = 0; s < e.length; s++)
          if (t === e[s]) return e.splice(s, 1), this;
      } else this._anyListeners = [];
      return this;
    }
    listenersAny() {
      return this._anyListeners || [];
    }
    onAnyOutgoing(t) {
      return (
        (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
        this._anyOutgoingListeners.push(t),
        this
      );
    }
    prependAnyOutgoing(t) {
      return (
        (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
        this._anyOutgoingListeners.unshift(t),
        this
      );
    }
    offAnyOutgoing(t) {
      if (!this._anyOutgoingListeners) return this;
      if (t) {
        const e = this._anyOutgoingListeners;
        for (let s = 0; s < e.length; s++)
          if (t === e[s]) return e.splice(s, 1), this;
      } else this._anyOutgoingListeners = [];
      return this;
    }
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    notifyOutgoingListeners(t) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const e = this._anyOutgoingListeners.slice();
        for (const s of e) s.apply(this, t.data);
      }
    }
  }
  function _t(t) {
    (t = t || {}),
      (this.ms = t.min || 100),
      (this.max = t.max || 1e4),
      (this.factor = t.factor || 2),
      (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
      (this.attempts = 0);
  }
  (_t.prototype.duration = function () {
    var t = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var e = Math.random(),
        s = Math.floor(e * this.jitter * t);
      t = 1 & Math.floor(10 * e) ? t + s : t - s;
    }
    return 0 | Math.min(t, this.max);
  }),
    (_t.prototype.reset = function () {
      this.attempts = 0;
    }),
    (_t.prototype.setMin = function (t) {
      this.ms = t;
    }),
    (_t.prototype.setMax = function (t) {
      this.max = t;
    }),
    (_t.prototype.setJitter = function (t) {
      this.jitter = t;
    });
  class bt extends w {
    constructor(t, s) {
      var n;
      super(),
        (this.nsps = {}),
        (this.subs = []),
        t && "object" == typeof t && ((s = t), (t = void 0)),
        ((s = s || {}).path = s.path || "/socket.io"),
        (this.opts = s),
        C(this, s),
        this.reconnection(!1 !== s.reconnection),
        this.reconnectionAttempts(s.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(s.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(s.reconnectionDelayMax || 5e3),
        this.randomizationFactor(
          null !== (n = s.randomizationFactor) && void 0 !== n ? n : 0.5,
        ),
        (this.backoff = new _t({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor(),
        })),
        this.timeout(null == s.timeout ? 2e4 : s.timeout),
        (this._readyState = "closed"),
        (this.uri = t);
      const i = s.parser || e;
      (this.encoder = new i.Encoder()),
        (this.decoder = new i.Decoder()),
        (this._autoConnect = !1 !== s.autoConnect),
        this._autoConnect && this.open();
    }
    reconnection(t) {
      return arguments.length
        ? ((this._reconnection = !!t), t || (this.skipReconnect = !0), this)
        : this._reconnection;
    }
    reconnectionAttempts(t) {
      return void 0 === t
        ? this._reconnectionAttempts
        : ((this._reconnectionAttempts = t), this);
    }
    reconnectionDelay(t) {
      var e;
      return void 0 === t
        ? this._reconnectionDelay
        : ((this._reconnectionDelay = t),
          null === (e = this.backoff) || void 0 === e || e.setMin(t),
          this);
    }
    randomizationFactor(t) {
      var e;
      return void 0 === t
        ? this._randomizationFactor
        : ((this._randomizationFactor = t),
          null === (e = this.backoff) || void 0 === e || e.setJitter(t),
          this);
    }
    reconnectionDelayMax(t) {
      var e;
      return void 0 === t
        ? this._reconnectionDelayMax
        : ((this._reconnectionDelayMax = t),
          null === (e = this.backoff) || void 0 === e || e.setMax(t),
          this);
    }
    timeout(t) {
      return arguments.length ? ((this._timeout = t), this) : this._timeout;
    }
    maybeReconnectOnOpen() {
      !this._reconnecting &&
        this._reconnection &&
        0 === this.backoff.attempts &&
        this.reconnect();
    }
    open(t) {
      if (~this._readyState.indexOf("open")) return this;
      this.engine = new X(this.uri, this.opts);
      const e = this.engine,
        s = this;
      (this._readyState = "opening"), (this.skipReconnect = !1);
      const n = yt(e, "open", function () {
          s.onopen(), t && t();
        }),
        i = (e) => {
          this.cleanup(),
            (this._readyState = "closed"),
            this.emitReserved("error", e),
            t ? t(e) : this.maybeReconnectOnOpen();
        },
        r = yt(e, "error", i);
      if (!1 !== this._timeout) {
        const t = this._timeout,
          s = this.setTimeoutFn(() => {
            n(), i(new Error("timeout")), e.close();
          }, t);
        this.opts.autoUnref && s.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(s);
          });
      }
      return this.subs.push(n), this.subs.push(r), this;
    }
    connect(t) {
      return this.open(t);
    }
    onopen() {
      this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
      const t = this.engine;
      this.subs.push(
        yt(t, "ping", this.onping.bind(this)),
        yt(t, "data", this.ondata.bind(this)),
        yt(t, "error", this.onerror.bind(this)),
        yt(t, "close", this.onclose.bind(this)),
        yt(this.decoder, "decoded", this.ondecoded.bind(this)),
      );
    }
    onping() {
      this.emitReserved("ping");
    }
    ondata(t) {
      try {
        this.decoder.add(t);
      } catch (t) {
        this.onclose("parse error", t);
      }
    }
    ondecoded(t) {
      k(() => {
        this.emitReserved("packet", t);
      }, this.setTimeoutFn);
    }
    onerror(t) {
      this.emitReserved("error", t);
    }
    socket(t, e) {
      let s = this.nsps[t];
      return (
        s
          ? this._autoConnect && !s.active && s.connect()
          : ((s = new mt(this, t, e)), (this.nsps[t] = s)),
        s
      );
    }
    _destroy(t) {
      const e = Object.keys(this.nsps);
      for (const t of e) if (this.nsps[t].active) return;
      this._close();
    }
    _packet(t) {
      const e = this.encoder.encode(t);
      for (let s = 0; s < e.length; s++) this.engine.write(e[s], t.options);
    }
    cleanup() {
      this.subs.forEach((t) => t()),
        (this.subs.length = 0),
        this.decoder.destroy();
    }
    _close() {
      (this.skipReconnect = !0),
        (this._reconnecting = !1),
        this.onclose("forced close");
    }
    disconnect() {
      return this._close();
    }
    onclose(t, e) {
      var s;
      this.cleanup(),
        null === (s = this.engine) || void 0 === s || s.close(),
        this.backoff.reset(),
        (this._readyState = "closed"),
        this.emitReserved("close", t, e),
        this._reconnection && !this.skipReconnect && this.reconnect();
    }
    reconnect() {
      if (this._reconnecting || this.skipReconnect) return this;
      const t = this;
      if (this.backoff.attempts >= this._reconnectionAttempts)
        this.backoff.reset(),
          this.emitReserved("reconnect_failed"),
          (this._reconnecting = !1);
      else {
        const e = this.backoff.duration();
        this._reconnecting = !0;
        const s = this.setTimeoutFn(() => {
          t.skipReconnect ||
            (this.emitReserved("reconnect_attempt", t.backoff.attempts),
            t.skipReconnect ||
              t.open((e) => {
                e
                  ? ((t._reconnecting = !1),
                    t.reconnect(),
                    this.emitReserved("reconnect_error", e))
                  : t.onreconnect();
              }));
        }, e);
        this.opts.autoUnref && s.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(s);
          });
      }
    }
    onreconnect() {
      const t = this.backoff.attempts;
      (this._reconnecting = !1),
        this.backoff.reset(),
        this.emitReserved("reconnect", t);
    }
  }
  const vt = {};
  function wt(t, e) {
    "object" == typeof t && ((e = t), (t = void 0));
    const s = (function (t, e = "", s) {
        let n = t;
        (s = s || ("undefined" != typeof location && location)),
          null == t && (t = s.protocol + "//" + s.host),
          "string" == typeof t &&
            ("/" === t.charAt(0) &&
              (t = "/" === t.charAt(1) ? s.protocol + t : s.host + t),
            /^(https?|wss?):\/\//.test(t) ||
              (t = void 0 !== s ? s.protocol + "//" + t : "https://" + t),
            (n = Y(t))),
          n.port ||
            (/^(http|ws)$/.test(n.protocol)
              ? (n.port = "80")
              : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
          (n.path = n.path || "/");
        const i = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
        return (
          (n.id = n.protocol + "://" + i + ":" + n.port + e),
          (n.href =
            n.protocol +
            "://" +
            i +
            (s && s.port === n.port ? "" : ":" + n.port)),
          n
        );
      })(t, (e = e || {}).path || "/socket.io"),
      n = s.source,
      i = s.id,
      r = s.path,
      o = vt[i] && r in vt[i].nsps;
    let a;
    return (
      e.forceNew || e["force new connection"] || !1 === e.multiplex || o
        ? (a = new bt(n, e))
        : (vt[i] || (vt[i] = new bt(n, e)), (a = vt[i])),
      s.query && !e.query && (e.query = s.queryKey),
      a.socket(s.path, e)
    );
  }
  Object.assign(wt, { Manager: bt, Socket: mt, io: wt, connect: wt });
  var kt = wt();
  const Et = document.getElementById("subscribeB"),
    At = document.getElementById("shuffleB"),
    Tt = document.getElementById("nameInput"),
    Ot = document.getElementById("nameContainer"),
    Ct = document.getElementById("pairContainer");
  function Rt(t) {
    let e = Math.floor(3 * Math.random() + 1);
    const s = document.createElement("div");
    return (s.className = `nameCard${e}`), (s.textContent = t), s;
  }
  Et.addEventListener("click", () => {
    let t = Tt.value;
    "" !== t && kt.emit("addUser", { name: t }), (Tt.value = "");
  }),
    At.addEventListener("click", () => {
      kt.emit("getPairs", {});
    }),
    kt.on("connect", () => {
      console.log("connected to server"),
        kt.emit("client_connected", { sid: kt.id });
    }),
    kt.on("firstUpdate", (t) => {
      let e = t.names;
      console.log(t.names);
      for (let t in e) {
        let s = Rt(e[t]);
        Ot.appendChild(s);
      }
    }),
    kt.on("updateUsers", (t) => {
      let e = t.name;
      Ot.appendChild(Rt(e));
    }),
    kt.on("pairsRes", (t) => {
      Ot.remove(), (Ct.style.display = "grid");
      for (const e in t) {
        let s = e,
          n = t[e];
        const i = document.createElement("div");
        let r = Rt(s),
          o = Rt(n);
        i.appendChild(r), i.appendChild(o), Ct.appendChild(i);
      }
    });
})();
