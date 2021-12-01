import { createMessage, ORIGIN, ACTION } from "../utils/postMessage";
import {
  storageSyncGet,
  storageSyncClear,
  storageSyncSet,
  storageSyncRemove,
} from "../utils/storage";

document.addEventListener("DOMContentLoaded", function () {
  injectJsToDom("js/proxy_ajax.js");
});

function injectJsToDom(path) {
  path = path || "js/inject.js";
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.src = chrome.extension.getURL(path);
  document.body.appendChild(script);
}

window.addEventListener(
  "message",
  function (e) {
    const origin = e.target.origin;
    const message = e.data || {};
    if (message.origin !== ORIGIN.CONTENT) {
      const action = message.action;
      switch (action) {
        case ACTION.GET_CONFIG: {
          storageSyncGet(null).then((data) => {
            window.postMessage(
              createMessage(ORIGIN.CONTENT, ACTION.SEND_CONFIG, data),
              origin
            );
          });
        }
      }
    }
    sendMessageToBackground(e.data);
  },
  false
);

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
  chrome.runtime.sendMessage({
    greeting: message || "你好，我是content-script呀，我主动发消息给后台！",
  });
}

// storageSyncClear().then((res) => {
//   storageSyncGet().then((res) => {
//     debugger;
//     console.log(res);
//   });
// });

storageSyncGet().then((res) => {
  debugger;
  console.log(res);
});
// storageSyncClear().then(() => {
// for (let index = 0; index < 1; index++) {
//   storageSyncSet({
//     url: `/get/list/${index}`,
//     method: "GET",
//     enable: true,
//     response: `{code:0,msg:'success',data:[]}`,
//     desc: "这是一个描述" + index,
//   });
// }
// });
