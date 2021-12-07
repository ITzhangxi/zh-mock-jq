import { xhrProxy } from "../../plugins/ajax-proxy";
import { getConfig } from "../utils/postMessage";

function proxy(url, config, resolve, reject) {
  return getConfig()
    .then((response) => {
      let pathname = "",
        protocol = "",
        port = "",
        origin = "",
        host = "",
        hostname = "",
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
        port =
          urlIns.port === "" ? (protocol === "https" ? 443 : 80) : urlIns.port;
        origin = urlIns.origin;
        host = urlIns.host;
        hostname = urlIns.hostname;
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

xhrProxy({
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
