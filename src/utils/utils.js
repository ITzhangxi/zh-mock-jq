import { storageSyncRemove } from "../store/baseApi";
// 判断是不是Object
export const isObject = (target) =>
  Object.prototype.toString.call(target) === "[object Object]";

// 自增id
export const increaseId = (ids) => {
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
      .sort((a, b) => a - b);
    if (idsNum.length) return ++idsNum.slice(-1)[0];
  }
  return 0;
};

/**
 * 从数组中根据id查找数据
 * @param {*} id
 * @param {*} arr
 * @returns
 */
export const findIdFromArr = (id, arr = []) => {
  let index = undefined;
  let itemData = arr.find((item, i) => {
    if (item.id === id) {
      index = i;
      return true;
    } else {
      return false;
    }
  });
  return {
    id,
    arr,
    index,
    itemData,
  };
};

/* 设置分页数据 */
export const setPageData = (
  current = 1,
  pageSize = 10,
  total = 0,
  data = []
) => {
  return { current, pageSize, total, data };
};
