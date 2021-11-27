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
