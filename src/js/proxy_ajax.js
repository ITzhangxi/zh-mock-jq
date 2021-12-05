import { xhrProxy } from "../../plugins/ajax-proxy";
import { getConfig } from "../utils/postMessage";

function proxy(url, config, resolve, reject) {
  return getConfig()
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
      .then(({ response }) => {
        return {
          config,
          status: 200,
          headers: [],
          response,
        };
      })
      .catch((e) => {
        console.error(e);
        f(req, config);
      });
  };
}
