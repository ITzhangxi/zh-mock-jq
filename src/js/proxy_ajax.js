import { xhrProxy } from "../../plugins/ajax-proxy";
import { getConfig } from "../utils/postMessage";

function proxyApi(url, config) {
  return new Promise((resolve, reject) => {
    getConfig()
      .then((response) => {
        response = Object.values(response);
        const find = response.find((item = {}) => {
          if (Object.prototype.toString.call(item) !== "[object Object]")
            return false;
          return (
            item.url.toUpperCase() === url.toUpperCase() &&
            item.method.toUpperCase() === config.method.toUpperCase() &&
            item.enable
          );
        });
        if (find) {
          resolve({ response });
        } else {
          reject();
        }
      })
      .catch((error) => reject(error));
  });
}

xhrProxy({
  onRequest: (config, handler) =>
    proxyApi(config.url, config)
      .then(({ response }) => {
        return handler.resolve({
          config,
          status: 200,
          headers: [],
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
      .then((res) => {
        return new Response(res, {
          headers: new Headers([]),
          status: 200,
        });
      })
      .catch((e) => {
        console.error(e);
        f(req, config);
      });
  };
}
