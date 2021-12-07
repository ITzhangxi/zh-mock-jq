import { createMessage, ORIGIN, ACTION } from "../utils/postMessage";
import {
  storageSyncGet,
  storageSyncClear,
  storageSyncSet,
  storageSyncRemove,
  storageSyncUpdate,
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
  },
  false
);

// storageSyncClear().then((res) => {
//   storageSyncGet().then((res) => {
//     console.log(res);
//   });
// });
// storageSyncClear();
// storageSyncRemove(0);

storageSyncGet().then((res) => {
  console.log("storageSyncGet---->", res);
});

// storageSyncGet(0).then((res) => {
//   console.log(res);
// });
// storageSyncUpdate(0, {
//   createTime: 1638383096336,
//   desc: "这是一个描述1234",
//   enable: true,
//   id: 0,
//   method: "GET",
//   response: "{code:0,msg:'success',data:[]}",
//   updateTime: 1638383096336,
//   url: "/get/list/0",
// });
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
