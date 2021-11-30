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
