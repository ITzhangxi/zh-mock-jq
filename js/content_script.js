document.addEventListener("DOMContentLoaded", function () {
  injectJsToDom("plugins/ajaxhook/ajaxhook.min.js");
  injectJsToDom("js/proxy_ajax.js");
});

function injectJsToDom(path) {
  path = path || "js/inject.js";
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.src = chrome.extension.getURL(path);
  script.classList = ["asdfsa", "asdfas"];
  document.body.appendChild(script);
  //   document.body.innerHTML = "";
}

window.addEventListener(
  "message",
  function (e) {
    console.log("content_script收到proxy_ajax消息：", e.data);
    sendMessageToBackground(e.data);
  },
  false
);

sendMessageToBackground("2314");
// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
  chrome.runtime.sendMessage({
    greeting: message || "你好，我是content-script呀，我主动发消息给后台！",
  });
}

chrome.storage.sync.get(null, function (items) {
  console.log(items.color, items.age);
});
