<template>
  <el-container class="app">
    <el-header>
      <img src="./assets/logo.png" class="logo" />
      欢迎使用 MOCK 数据管理平台
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Dir></Dir>
      </el-aside>
      <el-container>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { defineComponent } from "vue";
import Dir from "@/components/dir";
import Main from "@/components/main";

export default defineComponent({
  name: "App",
  components: { Dir, Main },
  setup() {
    return {};
  },
});
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.app {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .el-header {
    background-color: #1e2c46;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-weight: 700;
    font-size: 25px;
  }

  .el-aside {
    background-color: #d3dce6;
    text-align: center;
    line-height: 200px;
  }
  .logo {
    position: absolute;
    left: 0;
    height: 60px;
    width: 60px;
  }
}
</style>
