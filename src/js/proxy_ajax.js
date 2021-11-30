import { xhrProxy } from "../../plugins/ajax-proxy";
import { getConfig } from "../utils/postMessage";

function hijack(url, { method }) {
  return new Promise((resolve, reject) => {
    getConfig()
      .then((response) => {
        resolve({ response });
      })
      .catch((error) => reject(error));
  });
}

xhrProxy({
  onRequest: (config, handler) =>
    hijack(config.url, config)
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
    return hijack(req, config)
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
