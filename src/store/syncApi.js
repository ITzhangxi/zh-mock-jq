import {
  storageSyncSet,
  storageSyncGet,
  storageSyncRemove,
  storageSyncClear,
} from "./baseApi";

import {
  increaseId,
  findIdFromArr,
  setPageData,
  isObject,
} from "../utils/utils";

/* 判断表不存在 */
export function tableNotExists(tableName) {
  return Promise((resolve, reject) => {
    storageSyncGet(tableName)
      .then((res) => {
        if (res) {
          reject(`The ${tableName} table already exists`);
        } else {
          resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
}

/* 判断表存在 */
export function tableExists(tableName) {
  return Promise((resolve, reject) => {
    storageSyncGet(tableName)
      .then((table) => {
        if (table) {
          resolve(true);
        } else {
          reject(`The ${tableName} table does not exist`);
        }
      })
      .catch((err) => reject(err));
  });
}

/* 创建表 */
export function createTable(tableName) {
  return new Promise((resolve, reject) => {
    tableNotExists(tableName)
      .then(() => {
        const table = { [tableName]: [] };
        storageSyncSet(table)
          .then((re) => resolve(re))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

/* 删除表 */
export function delTable(tableName) {
  return new Promise((resolve, reject) => {
    tableExists(tableName)
      .then(() => {
        storageSyncRemove(tableName)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

/* 更新整张表数据 */
export function updateStorageTable(tableName, data) {
  return new Promise((resolve, reject) => {
    tableExists(tableName)
      .then(() => {
        storageSyncSet({ [tableName]: data })
          .then((res) => resolve({ [tableName]: data }))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

/* 获取整张表数据 */
export function getTableData(tableName) {
  return Promise((resolve, reject) => {
    storageSyncGet(tableName)
      .then((table) => {
        if (table) {
          resolve(table);
        } else {
          reject(`The ${tableName} table does not exist`);
        }
      })
      .catch((err) => reject(err));
  });
}

/* 向表插入数据 */
export function insertStorageDataToTable(tableName, data) {
  return new Promise((resolve, reject) => {
    getTableData(tableName)
      .then((table) => {
        const allData = table[tableName] || [];
        const ids = allData.map((item) => item.id);
        const id = increaseId(ids);
        const mergeData = {
          id,
          del: false,
          createTime: Date.now(),
          updateTime: Date.now(),
        };
        Object.assign(data, mergeData);
        updateStorageTable(tableName, allData)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

/* 根据ID更新表数据 */
export function updateStorageDataToTable(tableName, id, data) {
  getTableData((allData) => {
    /* 判断 数据是否存在 */
    const { itemData } = findIdFromArr(id, allData);
    if (!itemData) return reject(`id data ${id} does not exist`);

    const mergeData = {
      id, // 避免 id 被人为修改
      updateTime: Date.now(),
    };

    Object.assign(itemData, data, mergeData);
    updateStorageTable(tableName, allData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  }).catch((err) => reject(err));
}

/* 根据ID软删除数据 */
export function delSoftIdToTable(tableName, id) {
  return new Promise((resolve, reject) => {
    getTableData(tableName)
      .then((allData) => {
        const { index, itemData } = findIdFromArr(id, allData);
        if (index === undefined) return reject(`id data ${id} does not exist`);

        const mergeData = {
          id, // 避免 id 被人为修改
          updateTime: Date.now(),
          del: true,
        };

        Object.assign(itemData, data, mergeData);
        updateStorageTable(tableName, allData)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

/* 根据ID硬删除 */
export function delSyncIdToTable(tableName, id) {
  return new Promise((resolve, reject) => {
    getTableData(tableName)
      .then((allData) => {
        const { index } = findIdFromArr(id, allData);
        if (index === undefined) return reject(`id data ${id} does not exist`);
        allData.splice(index, 1);
        updateStorageTable(tableName, allData)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

/* 根据条件获取数据 */
export function getTableDataForQuery(tableName, query = null) {
  return new Promise((resolve, reject) => {
    getTableData(tableName)
      .then((allData) => {
        if (isObject(query)) {
          const keys = Object.keys(query);
          allData = allData.reduce((pre, item) => {
            let flag = 0;
            keys.forEach((key) => {
              if (item[key] === query[key]) flag++;
            });
            if (flag === keys.length) return [...pre, item];
            else return [...pre];
          }, []);
        }
        return resolve(allData);
      })
      .catch((err) => reject(err));
  });
}

/* 分页获取数据 || 支持搜索分页获取数据 */
export function getTableDataPage(
  tableName,
  { current = 1, pageSize = 20, query = null }
) {
  return new Promise((resolve, reject) => {
    getTableDataForQuery(tableName, query)
      .then((allData) => {
        const total = allData.length;
        const preTotal = (current - 1) * pageSize;
        if (current * pageSize > total) {
          if (preTotal > total) {
            resolve(
              setPageData(current, pageSize, total, allData.splice(preTotal))
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
              allData.splice(preTotal, pageSize)
            )
          );
        }
      })
      .catch((err) => reject(err));
  });
}
