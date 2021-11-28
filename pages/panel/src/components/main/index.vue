<template>
  <div class="main">
    <Search />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100px" />
      <el-table-column prop="name" label="name" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="method" label="method" width="100px" />
      <el-table-column prop="response" label="response" />
    </el-table>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import Search from "./Search.vue";

export default defineComponent({
  components: { Search },
  name: "main",
  setup() {
    const tableData = reactive([
      {
        id: "1",
        name: "获取菜单列表1",
        url: "/get/menu/list",
        method: "GET",
        response: "{code:2,data:[],msg:''}",
      },
      {
        id: "2",
        name: "获取菜单列表2",
        url: "/get/menu/list",
        method: "GET",
        response: "{code:2,data:[],msg:''}",
      },
      {
        id: "3",
        name: "获取菜单列表3",
        url: "/get/menu/list",
        method: "GET",
        response: "{code:2,data:[],msg:''}",
      },
      {
        id: "4",
        name: "获取菜单列表4",
        url: "/get/menu/list",
        method: "GET",
        response: "{code:2,data:[],msg:''}",
      },
      {
        id: "5",
        name: "获取菜单列表5",
        url: "/get/menu/list",
        method: "GET",
        response: "{code:2,data:[],msg:''}",
      },
    ]);
    return { tableData };
  },
});
</script>
<style lang="less" scoped>
.main {
}
</style>
