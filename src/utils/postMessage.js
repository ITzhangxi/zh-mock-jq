export const ORIGIN = {
  CONTENT: "content_script",
  PROXY: "proxy_ajax",
};
export const ACTION = {
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
export function createMessage(origin, action, data = {}) {
  return { origin, action, data };
}

/**
 * 获取配置
 * @param {*} timeout
 * @returns
 */
export function getConfig(timeout = 1000) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        window.removeEventListener("message", handler);
        reject("timeout to get config");
      }, timeout);
      function handler(e) {
        const message = e.data || {};
        if (message.origin === ORIGIN.CONTENT) {
          if (message.ACTION === ORIGIN.SEND_CONFIG) {
            resolve(message.data || {});
            window.removeEventListener("message", handler);
          }
        }
      }
      window.addEventListener("message", handler, false);
      window.postMessage(
        createMessage(ORIGIN.PROXY, ACTION.GET_CONFIG),
        document.location.origin
      );
    } catch (error) {
      reject(error);
    }
  });
}
