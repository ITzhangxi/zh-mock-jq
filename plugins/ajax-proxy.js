!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).zhAH =
        e());
})(this, function () {
  "use strict";
  function t(t, e) {
    var r = {};
    for (var n in t) r[n] = t[n];
    return (r.target = r.currentTarget = e), r;
  }
  function e(e) {
    function r(t) {
      return function () {
        var r = this.hasOwnProperty(t + "_") ? this[t + "_"] : this.xhr[t],
          n = (e[t] || {}).getter;
        return (n && n(r, this)) || r;
      };
    }
    function n(r) {
      return function (n) {
        var o = this.xhr,
          i = this,
          s = e[r];
        if ("on" === r.substring(0, 2))
          (i[r + "_"] = n),
            (o[r] = function (s) {
              (s = t(s, i)), (e[r] && e[r].call(i, o, s)) || n.call(i, s);
            });
        else {
          var a = (s || {}).setter;
          (n = (a && a(n, i)) || n), (this[r + "_"] = n);
          try {
            o[r] = n;
          } catch (t) {}
        }
      };
    }
    function o(t) {
      return function () {
        var r = [].slice.call(arguments);
        if (e[t]) {
          var n = e[t].call(this, r, this.xhr);
          if (n) return n;
        }
        return this.xhr[t].apply(this.xhr, r);
      };
    }
    return (
      (window._rxhr = window._rxhr || XMLHttpRequest),
      (XMLHttpRequest = function () {
        var t = new window._rxhr();
        for (var e in t) {
          var i = "";
          try {
            i = typeof t[e];
          } catch (t) {}
          "function" === i
            ? (this[e] = o(e))
            : Object.defineProperty(this, e, {
                get: r(e),
                set: n(e),
                enumerable: !0,
              });
        }
        var s = this;
        (t.getProxy = function () {
          return s;
        }),
          (this.xhr = t);
      }),
      window._rxhr
    );
  }
  function r() {
    window._rxhr && (XMLHttpRequest = window._rxhr), (window._rxhr = void 0);
  }
  var n,
    o = ["load", "loadend", "timeout", "error", "readystatechange", "abort"],
    i = o[0],
    s = o[1],
    a = o[2],
    u = o[3],
    c = o[4],
    f = o[5];
  function h(t) {
    return t.watcher || (t.watcher = document.createElement("a"));
  }
  function d(e, r) {
    var n,
      o = e.getProxy(),
      i = "on" + r + "_",
      s = t({ type: r }, o);
    o[i] && o[i](s),
      "function" == typeof Event
        ? (n = new Event(r, { bubbles: !1 }))
        : (n = document.createEvent("Event")).initEvent(r, !1, !0),
      h(e).dispatchEvent(n);
  }
  function l(t) {
    (this.xhr = t), (this.xhrProxy = t.getProxy());
  }
  function v(t) {
    function e(t) {
      l.call(this, t);
    }
    return (
      (e.prototype = Object.create(l.prototype)), (e.prototype.next = t), e
    );
  }
  l.prototype = Object.create({
    resolve: function (t) {
      if (t) {
        var e = this.xhrProxy,
          r = this.xhr;
        (e.readyState = 4),
          (r.resHeader = t.headers),
          (e.response = e.responseText = t.response),
          (e.statusText = t.statusText),
          (e.status = t.status),
          d(r, c),
          d(r, i),
          d(r, s);
      }
    },
    reject: function (t) {
      (this.xhrProxy.status = 0), d(this.xhr, t.type), d(this.xhr, s);
    },
  });
  var x = v(function (t) {
      var e = this.xhr;
      for (var r in ((t = t || e.config),
      (e.withCredentials = t.withCredentials),
      e.open(t.method, t.url, !1 !== t.async, t.user, t.password),
      t.headers))
        e.setRequestHeader(r, t.headers[r]);
      e.send(t.body);
    }),
    p = v(function (t) {
      this.resolve(t);
    }),
    y = v(function (t) {
      this.reject(t);
    });
  function w(r) {
    var n = r.onRequest,
      i = r.onResponse,
      s = r.onError;
    function l(t, e, r) {
      var n = new y(t),
        o = { config: t.config, error: r };
      s ? s(o, n) : n.next(o);
    }
    function v() {
      return !0;
    }
    function w(t, e) {
      return l(t, 0, e), !0;
    }
    function g(t, e) {
      return (
        4 === t.readyState && 0 !== t.status
          ? (function (t, e) {
              var r = new p(t);
              if (!i) return r.resolve();
              var n = {
                response: e.response,
                status: e.status,
                statusText: e.statusText,
                config: t.config,
                headers:
                  t.resHeader ||
                  t
                    .getAllResponseHeaders()
                    .split("\r\n")
                    .reduce(function (t, e) {
                      if ("" === e) return t;
                      var r = e.split(":");
                      return (
                        (t[r.shift()] = (function (t) {
                          return t.replace(/^\s+|\s+$/g, "");
                        })(r.join(":"))),
                        t
                      );
                    }, {}),
              };
              i(n, r);
            })(t, e)
          : 4 !== t.readyState && d(t, c),
        !0
      );
    }
    return e({
      onload: v,
      onloadend: v,
      onerror: w,
      ontimeout: w,
      onabort: w,
      onreadystatechange: function (t) {
        return g(t, this);
      },
      open: function (e, r) {
        var o = this,
          i = (r.config = { headers: {} });
        (i.method = e[0]),
          (i.url = e[1]),
          (i.async = e[2]),
          (i.user = e[3]),
          (i.password = e[4]),
          (i.xhr = r);
        var s = "on" + c;
        r[s] ||
          (r[s] = function () {
            return g(r, o);
          });
        var h = function (e) {
          l(r, 0, t(e, o));
        };
        if (
          ([u, a, f].forEach(function (t) {
            var e = "on" + t;
            r[e] || (r[e] = h);
          }),
          n)
        )
          return !0;
      },
      send: function (t, e) {
        var r = e.config;
        if (((r.withCredentials = e.withCredentials), (r.body = t[0]), n)) {
          var o = function () {
            return n(r, new x(e));
          };
          return !1 === r.async ? o() : setTimeout(o);
        }
      },
      setRequestHeader: function (t, e) {
        return (e.config.headers[t[0].toLowerCase()] = t[1]), !0;
      },
      addEventListener: function (e, r) {
        var n = this;
        if (-1 !== o.indexOf(e[0])) {
          var i = e[1];
          return (
            h(r).addEventListener(e[0], function (r) {
              var o = t(r, n);
              (o.type = e[0]), (o.isTrusted = !0), i.call(n, o);
            }),
            !0
          );
        }
      },
      getAllResponseHeaders: function (t, e) {
        var r = e.resHeader;
        if (r) {
          var n = "";
          for (var o in r) n += o + ": " + r[o] + "\r\n";
          return n;
        }
      },
      getResponseHeader: function (t, e) {
        var r = e.resHeader;
        if (r) return r[(t[0] || "").toLowerCase()];
      },
    });
  }
  var g = {
    xhrHook: e,
    unXhrHook: r,
    xhrProxy: function (t) {
      if (n) throw "Proxy already exists";
      return (n = new w(t));
    },
    unXhrProxy: function () {
      (n = null), r();
    },
  };
  return g;
});
