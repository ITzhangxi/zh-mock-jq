// const proxy = window.ah.proxy;

// function hijack(url, { method }) {
//   return new Promise((resolve, reject) => {
//     window.postMessage({ cmd: `Hello, I am 拦截请求 ${method} ${url}` }, "*");
//     resolve({
//       response: [1, 2, 3, 4],
//     });
//   });
// }

// proxy({
//   onRequest: (config, handler) =>
//     hijack(config.url, config)
//       .then(({ response }) => {
//         return handler.resolve({
//           config,
//           status: 200,
//           headers: [],
//           response,
//         });
//       })
//       .catch(() => handler.next(config)),
//   onResponse: (response, handler) => {
//     handler.resolve(response);
//   },
// });

// if (window.fetch) {
//   const f = window.fetch;
//   window.fetch = (req, config) => {
//     return hijack(req, config)
//       .then((res) => {
//         console.log(res);
//         return new Response(res, {
//           headers: new Headers([]),
//           status: 200,
//         });
//       })
//       .catch((e) => {
//         console.error(e);
//         f(req, config);
//       });
//   };
// }
