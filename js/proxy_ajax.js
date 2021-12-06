(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function t(t, r) {
    var e = {};
    for (var n in t) e[n] = t[n];
    return (e.target = e.currentTarget = r), e;
  }
  function r(r) {
    function e(t) {
      return function () {
        var e = this.hasOwnProperty(t + "_") ? this[t + "_"] : this.xhr[t],
          n = (r[t] || {}).getter;
        return (n && n(e, this)) || e;
      };
    }
    function n(e) {
      return function (n) {
        var o = this.xhr,
          s = this,
          i = r[e];
        if ("on" === e.substring(0, 2))
          (s[e + "_"] = n),
            (o[e] = function (i) {
              (i = t(i, s)), (r[e] && r[e].call(s, o, i)) || n.call(s, i);
            });
        else {
          var a = (i || {}).setter;
          (n = (a && a(n, s)) || n), (this[e + "_"] = n);
          try {
            o[e] = n;
          } catch (t) {}
        }
      };
    }
    function o(t) {
      return function () {
        var e = [].slice.call(arguments);
        if (r[t]) {
          var n = r[t].call(this, e, this.xhr);
          if (n) return n;
        }
        return this.xhr[t].apply(this.xhr, e);
      };
    }
    return (
      (window._rxhr = window._rxhr || XMLHttpRequest),
      (XMLHttpRequest = function () {
        var t = new window._rxhr();
        for (var r in t) {
          var s = "";
          try {
            s = typeof t[r];
          } catch (t) {}
          "function" === s
            ? (this[r] = o(r))
            : Object.defineProperty(this, r, {
                get: e(r),
                set: n(r),
                enumerable: !0,
              });
        }
        var i = this;
        (t.getProxy = function () {
          return i;
        }),
          (this.xhr = t);
      }),
      window._rxhr
    );
  }
  var n,
    o = ["load", "loadend", "timeout", "error", "readystatechange", "abort"],
    s = o[0],
    i = o[1],
    a = o[2],
    u = o[3],
    c = o[4],
    h = o[5];
  function f(t) {
    if (n) throw "Proxy already exists";
    return (n = new H(t));
  }
  function v(t) {
    return t.watcher || (t.watcher = document.createElement("a"));
  }
  function x(r, e) {
    var n,
      o = r.getProxy(),
      s = "on" + e + "_",
      i = t({ type: e }, o);
    o[s] && o[s](i),
      "function" == typeof Event
        ? (n = new Event(e, { bubbles: !1 }))
        : (n = document.createEvent("Event")).initEvent(e, !1, !0),
      v(r).dispatchEvent(n);
  }
  function l(t) {
    (this.xhr = t), (this.xhrProxy = t.getProxy());
  }
  function p(t) {
    function r(t) {
      l.call(this, t);
    }
    return (r.prototype = Object.create(l.prototype)), (r.prototype.next = t), r;
  }
  l.prototype = Object.create({
    resolve: function (t) {
      if (t) {
        var r = this.xhrProxy,
          e = this.xhr;
        (r.readyState = 4),
          (e.resHeader = t.headers),
          (r.response = r.responseText = t.response),
          (r.statusText = t.statusText),
          (r.status = t.status),
          x(e, c),
          x(e, s),
          x(e, i);
      }
    },
    reject: function (t) {
      (this.xhrProxy.status = 0), x(this.xhr, t.type), x(this.xhr, i);
    },
  });
  var y = p(function (t) {
      var r = this.xhr;
      for (var e in ((t = t || r.config),
      (r.withCredentials = t.withCredentials),
      r.open(t.method, t.url, !1 !== t.async, t.user, t.password),
      t.headers))
        r.setRequestHeader(e, t.headers[e]);
      r.send(t.body);
    }),
    w = p(function (t) {
      this.resolve(t);
    }),
    g = p(function (t) {
      this.reject(t);
    });
  function H(e) {
    var n = e.onRequest,
      s = e.onResponse,
      i = e.onError;
    function f(t, r, e) {
      var n = new g(t),
        o = { config: t.config, error: e };
      i ? i(o, n) : n.next(o);
    }
    function d() {
      return !0;
    }
    function l(t, r) {
      return f(t, 0, r), !0;
    }
    function p(t, r) {
      return (
        4 === t.readyState && 0 !== t.status
          ? (function (t, r) {
              var e = new w(t);
              if (!s) return e.resolve();
              var n = {
                response: r.response,
                status: r.status,
                statusText: r.statusText,
                config: t.config,
                headers:
                  t.resHeader ||
                  t
                    .getAllResponseHeaders()
                    .split("\r\n")
                    .reduce(function (t, r) {
                      if ("" === r) return t;
                      var e = r.split(":");
                      return (
                        (t[e.shift()] = (function (t) {
                          return t.replace(/^\s+|\s+$/g, "");
                        })(e.join(":"))),
                        t
                      );
                    }, {}),
              };
              s(n, e);
            })(t, r)
          : 4 !== t.readyState && x(t, c),
        !0
      );
    }
    return r({
      onload: d,
      onloadend: d,
      onerror: l,
      ontimeout: l,
      onabort: l,
      onreadystatechange: function (t) {
        return p(t, this);
      },
      open: function (r, e) {
        var o = this,
          s = (e.config = { headers: {} });
        (s.method = r[0]),
          (s.url = r[1]),
          (s.async = r[2]),
          (s.user = r[3]),
          (s.password = r[4]),
          (s.xhr = e);
        var i = "on" + c;
        e[i] ||
          (e[i] = function () {
            return p(e, o);
          });
        var d = function (r) {
          f(e, 0, t(r, o));
        };
        if (
          ([u, a, h].forEach(function (t) {
            var r = "on" + t;
            e[r] || (e[r] = d);
          }),
          n)
        )
          return !0;
      },
      send: function (t, r) {
        var e = r.config;
        if (((e.withCredentials = r.withCredentials), (e.body = t[0]), n)) {
          var o = function () {
            return n(e, new y(r));
          };
          return !1 === e.async ? o() : setTimeout(o);
        }
      },
      setRequestHeader: function (t, r) {
        return (r.config.headers[t[0].toLowerCase()] = t[1]), !0;
      },
      addEventListener: function (r, e) {
        var n = this;
        if (-1 !== o.indexOf(r[0])) {
          var s = r[1];
          return (
            v(e).addEventListener(r[0], function (e) {
              var o = t(e, n);
              (o.type = r[0]), (o.isTrusted = !0), s.call(n, o);
            }),
            !0
          );
        }
      },
      getAllResponseHeaders: function (t, r) {
        var e = r.resHeader;
        if (e) {
          var n = "";
          for (var o in e) n += o + ": " + e[o] + "\r\n";
          return n;
        }
      },
      getResponseHeader: function (t, r) {
        var e = r.resHeader;
        if (e) return e[(t[0] || "").toLowerCase()];
      },
    });
  }

  const ORIGIN = {
    CONTENT: "content_script",
    PROXY: "proxy_ajax",
  };
  const ACTION = {
    GET_CONFIG: "get_config",
    SEND_CONFIG: "send_config",
  };

  /**
   * 创建 postMessage 消息体
   * @param {*} origin
   * @param {*} action
   * @param {*} data
   * @returns
   */
  function createMessage(origin, action, data = {}) {
    return { origin, action, data };
  }

  /**
   * 获取配置
   * @param {*} timeout
   * @returns
   */
  function getConfig(timeout = 1000) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          window.removeEventListener("message", handler);
          reject("timeout to get config");
        }, timeout);
        function handler(e) {
          const message = e.data || {};
          if (message.origin === ORIGIN.CONTENT) {
            if (message.ACTION === ORIGIN.SEND_CONFIG) {
              resolve(message.data || {});
              window.removeEventListener("message", handler);
            }
          }
        }
        window.addEventListener("message", handler, false);
        window.postMessage(
          createMessage(ORIGIN.PROXY, ACTION.GET_CONFIG),
          document.location.origin
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  function proxy(url, config, resolve, reject) {
    return getConfig()
      .then((response) => {
        let pathname = "",
          protocol = "",
          urlIns = "";
        if (url.startsWith("/")) {
          urlIns = document.location;
          pathname = url;
        }
        try {
          urlIns = new URL(url);
        } catch (error) {}
        if (urlIns) {
          pathname = pathname || urlIns.pathname;
          protocol = urlIns.protocol;
          urlIns.port === "" ? (protocol === "https" ? 443 : 80) : urlIns.port;
        }
        response = Object.values(response);
        const find = response.find((item = {}) => {
          if (Object.prototype.toString.call(item) !== "[object Object]")
            return false;
          return (
            item.url.toUpperCase() === pathname.toUpperCase() &&
            item.method.toUpperCase() === config.method.toUpperCase() &&
            item.enable
          );
        });
        if (find) {
          resolve({ response: find.response });
        } else {
          reject();
        }
      })
      .catch((error) => reject(error));
  }

  function proxyApi(url, config) {
    return new Promise((resolve, reject) => {
      proxy(url, config, resolve, reject);
    });
  }

  f({
    onRequest: (config, handler) =>
      proxyApi(config.url, config)
        .then(({ response }) => {
          return handler.resolve({
            config,
            status: 200,
            headers: new Headers(config.headers || {}),
            response,
          });
        })
        .catch(() => handler.next(config)),
    onResponse: (response, handler) => {
      handler.resolve(response);
    },
  });

  if (window.fetch) {
    const f = window.fetch;
    window.fetch = (req, config) => {
      return proxyApi(req, config)
        .then(({ response }) => {
          return new Response(response, {
            headers: new Headers(config.headers || {}),
            status: 200,
          });
        })
        .catch((e) => {
          return f(req, config);
        });
    };
  }

}));
