import { createMessage, ORIGIN, ACTION } from "../utils/postMessage";
import { storageSyncGet } from "../utils/storage";
import {
  createTable,
  delTable,
  getTables,
  insertStorageDataToTable,
  updateStorageDataToTable,
  delSoftIdToTable,
  delSyncIdToTable,
  clearTableData,
  getTableDataForQuery,
  getTableDataPage,
} from "../store/syncApi";

function init() {
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
}
init();

async function run() {
  // await getTables()
  //   .then((table) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await createTable("testTable")
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await insertStorageDataToTable("testTable", { a: 1, d: 2 })
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await updateStorageDataToTable("testTable", 1, { a: "a", c: "3" })
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await delSoftIdToTable("testTable", 1)
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await delSyncIdToTable("testTable", 1)
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await clearTableData("testTable");
  // for (let i = 0; i <= 1000; i++) {
  //   await insertStorageDataToTable("testTable", { i });
  // }
  // await insertStorageDataToTable("testTable", { i: 89 });
  // await getTableDataForQuery("testTable")
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await getTableDataPage("testTable", { current: 9, pageSize: 10 })
  //   .then((res) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
  // await getTables()
  //   .then((table) => {
  //     debugger;
  //   })
  //   .catch((error) => {
  //     debugger;
  //   });
}

run();
