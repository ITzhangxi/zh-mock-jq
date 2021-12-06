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

  const isObject = (target) =>
    Object.prototype.toString.call(target) === "[object Object]";

  /* 查询数据 value */
  function storageSyncGet(key = null) {
    return new Promise((resolve, reject) => {
      try {
        // eslint-disable-next-line no-undef
        if (![null, undefined].includes(key)) key = key + "";
        // eslint-disable-next-line no-undef
        chrome.storage.sync.get(key, (items) => {
          if (isObject(items)) {
            if (Object.keys(items).length) {
              if (key) {
                return resolve(Object.values(items)[0]);
              }
              return resolve(Object.values(items));
            } else {
              if (key) {
                resolve(null);
              } else {
                resolve([]);
              }
            }
          } else {
            if (key) {
              resolve(null);
            } else {
              resolve([]);
            }
          }
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
    console.log(res);
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

}));
