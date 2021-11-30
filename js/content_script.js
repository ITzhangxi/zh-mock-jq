(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const ORIGIN = {
    CONTENT: "content_script",
    PROXY: "proxy_ajax",
  };
  const ACTION = {
    GET_CONFIG: "get_config",
    SEND_CONFIG: "send_config",
  };

  /**
   * 创建 postMessage 消息体
   * @param {*} origin
   * @param {*} action
   * @param {*} data
   * @returns
   */
  function createMessage(origin, action, data = {}) {
    return { origin, action, data };
  }

  /* 获取数据 */
  function storageSyncSet(data = {}) {
    return new Promise((resolve, reject) => {
      if (Object.prototype.toString.call(data) !== "[object Object]")
        reject("save data must object");
      try {
        chrome.storage.sync.set(data, function (items) {
          resolve(items);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /* 保存数据 */
  function storageSyncGet(key = null) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, function (items) {
          resolve(items);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

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

  chrome.storage.sync.get(null, function (items) {
    console.log(items.color, items.age);
  });

  storageSyncSet({ name: "zhangxi", age: 11 });

}));
