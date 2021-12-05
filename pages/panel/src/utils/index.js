const isObject = (target) =>
  Object.prototype.toString.call(target) === "[object Object]";
const increaseId = (ids) => {
  if (Array.isArray(ids)) {
    const idsNum = ids
      .map((id) => {
        try {
          return parseInt(id);
        } catch (error) {
          storageSyncRemove(id);
        }
      })
      .filter((id) => typeof id === "number")
      .sort();
    if (idsNum.length) return ++idsNum.slice(-1)[0];
  }
  return 0;
};
/* 新增数据 */
export function storageSyncSet(value) {
  return new Promise((resolve, reject) => {
    try {
      storageSyncGetOfKey().then((items) => {
        items = items === null ? {} : items;
        if (isObject(items)) {
          let key = increaseId(Object.keys(items));
          const data = {};
          data[key] = {
            ...value,
            id: key,
            createTime: Date.now(),
            updateTime: Date.now(),
          };
          // eslint-disable-next-line no-undef
          chrome.storage.sync.set(data, () => {
            resolve(data);
          });
        } else {
          storageSyncClear();
          reject("storage 数据有脏数据，已经清楚，请重新添加");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/* 更新数据 */
export function storageSyncUpdate(key, value) {
  return new Promise((resolve, reject) => {
    try {
      storageSyncGet(key).then((res) => {
        if (isObject(res) && Object.keys(res).length) {
          const data = {};
          data[key] = { ...res, ...value, id: key, updateTime: Date.now() };
          // eslint-disable-next-line no-undef
          chrome.storage.sync.set(data, () => {
            resolve(data);
          });
        } else {
          reject(`${key}:${value}数据不存在`);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/* 查询数据key-value */
export function storageSyncGetOfKey(key = null) {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.get(key, (items) => {
        if (isObject(items)) {
          if (Object.keys(items).length) {
            return resolve(items);
          }
        }
        resolve(null);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/* 查询数据 value */
export function storageSyncGet(key = null) {
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

/* 删除数据 */
export function storageSyncRemove(key) {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line no-undef
      if (![null, undefined].includes(key)) key = key + "";
      // eslint-disable-next-line no-undef
      chrome.storage.sync.remove(key, (items) => {
        resolve(items);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/* 清空 */
export function storageSyncClear() {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.clear(() => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 设置分页返回数据
 * @param {*} current
 * @param {*} pageSize
 * @param {*} total
 * @param {*} data
 * @returns
 */
export function setPageData(current = 1, pageSize = 10, total = 0, data = []) {
  return { current, pageSize, total, data };
}

/**
 * 分页查询
 * @param {*} param0
 * @returns
 */
export function storageSyncGetPage({ current = 1, pageSize = 10 }) {
  return new Promise((resolve, reject) => {
    try {
      storageSyncGet().then((data) => {
        if (Array.isArray(data)) {
          const total = data.length;
          const preTotal = (current - 1) * pageSize;
          if (current * pageSize > total) {
            if (preTotal > total) {
              resolve(
                setPageData(current, pageSize, total, data.splice(preTotal))
              );
            } else {
              resolve(setPageData(current, pageSize, total));
            }
          } else {
            resolve(
              setPageData(
                current,
                pageSize,
                total,
                data.splice(preTotal, pageSize)
              )
            );
          }
        } else {
          storageSyncClear().finally(() => resolve(setPageData(1, pageSize)));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
