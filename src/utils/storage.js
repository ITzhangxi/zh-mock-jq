/* 获取数据 */
export function storageSyncSet(data = {}) {
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
export function storageSyncGet(key = null) {
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
