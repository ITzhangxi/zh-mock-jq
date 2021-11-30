import { xhrProxy } from "../../plugins/ajax-proxy";
import { createMessage, ORIGIN, ACTION } from "../utils/postMessage";
console.log(xhrProxy);
window.addEventListener(
  "message",
  function (e) {
    const message = e.data || {};
    debugger;
    if (message.origin === ORIGIN.CONTENT) {
      if (message.ACTION === ORIGIN.SEND_CONFIG) {
        debugger;
      }
    }
  },
  false
);

function hijack(url, { method }) {
  return new Promise((resolve, reject) => {
    window.postMessage(
      createMessage(ORIGIN.PROXY, ACTION.GET_CONFIG),
      document.location.origin
    );
    resolve({
      response: [1, 2, 3, 4],
    });
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
