chrome.devtools.panels.create(
  "ZH-MOCK",
  "img/icon.png",
  "pages/panel/index.html",
  function (panel) {
    console.log("自定义面板创建成功！"); // 注意这个log一般看不到
  }
);
