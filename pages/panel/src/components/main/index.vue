<template>
  <div class="main">
    <Search />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100px" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="method" label="method" width="100px" />
      <el-table-column prop="enable" label="enable" />
      <el-table-column prop="desc" label="desc" />
      <el-table-column prop="response" label="response" />
    </el-table>
  </div>
  <Update v-model="updateVisible" />
</template>
<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Update from "@/components/main/Update";
import Search from "./Search.vue";
import { storageSyncGet } from "@/utils";

export default defineComponent({
  components: { Search, Update },
  name: "Main",
  setup() {
    const tableData = reactive([]);
    const store = useStore();

    function getList() {
      storageSyncGet()
        .then((data) => {
          tableData.splice(0, tableData.length, ...data);
        })
        .catch(() => {
          tableData.splice(0, tableData.length);
        });
    }
    onMounted(() => {
      getList();
    });

    const updateVisible = computed({
      get: () => {
        const updateVisible = store.state.updateVisible;
        return updateVisible;
      },
      set: (val) => {
        store.commit("setUpdateVisible", val);
      },
    });
    return { tableData, updateVisible };
  },
});
</script>
<style lang="less" scoped>
.main {
}
</style>
