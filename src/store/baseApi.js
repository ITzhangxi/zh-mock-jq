import { isObject } from "../utils/utils";

/**
 * 向storage 设置数据
 * @param {*} data
 * @returns
 */
export function storageSyncSet(data = {}) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(data, () => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 根据 key 从 storage 获取数据
 * @param {*} key
 * @returns
 */
export function storageSyncGet(key = null) {
  return new Promise((resolve, reject) => {
    try {
      if (![null, undefined].includes(key)) key = key + "";
      chrome.storage.sync.get(key, (item) => {
        if (isObject(item) && Object.keys(items).length) {
          resolve(item);
        } else {
          resolve(null);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 从 storage 中将 key 给 删除
 * @param {*} key
 * @returns
 */
export function storageSyncRemove(key) {
  return new Promise((resolve, reject) => {
    try {
      if (![null, undefined].includes(key)) key = key + "";
      chrome.storage.sync.remove(key, () => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 清除storage所有数据
 * @returns
 */
export function storageSyncClear() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.clear(() => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}
