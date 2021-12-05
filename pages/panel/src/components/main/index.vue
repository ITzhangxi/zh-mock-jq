<template>
  <div class="main">
    <Search />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100px" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="method" label="method" width="100px" />
      <el-table-column prop="enable" label="enable" />
      <el-table-column prop="desc" label="desc" />
      <el-table-column prop="response" label="response">
        <template #default="{ row }">
          <div>{{ JSONStringify(row.response) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="handleDel(row)"
            >删除</el-button
          >
          <el-switch
            v-model="row.enable"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="handleEnableChange(row, arguments)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Update v-model="updateVisible" :id="id" />
</template>
<script>
import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  ref,
  watch,
} from "vue";
import { Check, Close } from "@element-plus/icons";
import { useStore } from "vuex";
import Update from "@/components/main/Update";
import Search from "./Search.vue";
import { storageSyncGet, storageSyncUpdate, storageSyncRemove } from "@/utils";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: { Search, Update },
  name: "Main",
  setup() {
    const tableData = reactive([]);
    const store = useStore();
    const id = ref("");

    function getList() {
      storageSyncGet()
        .then((data) => {
          tableData.splice(0, tableData.length, ...data);
        })
        .catch(() => {
          const data = [
            {
              createTime: 1638383096336,
              desc: "我是假数据0",
              enable: true,
              id: 0,
              method: "GET",
              response: "{code:0,msg:'success',data:[]}",
              updateTime: 1638383096336,
              url: "/get/list/0",
            },
            {
              createTime: 1638383106692,
              desc: "我是假数据0",
              enable: true,
              id: 1,
              method: "GET",
              response: "{code:0,msg:'success',data:[]}",
              updateTime: 1638383106692,
              url: "/get/list/0",
            },
            {
              createTime: 1638383129330,
              desc: "我是假数据j",
              enable: true,
              id: 2,
              method: "GET",
              response: "{resCode:2}",
              updateTime: 1638383129330,
              url: "kkjj/kk",
            },
            {
              createTime: 1638676113629,
              desc: "我是假数据w",
              enable: true,
              id: 3,
              method: "GET",
              response: "{resCode:2}",
              updateTime: 1638676113629,
              url: "/ed/es/fe",
            },
          ];
          // tableData.splice(0, tableData.length);
          tableData.splice(0, tableData.length, ...data);
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
    const handleEdit = (row) => {
      store.commit("setUpdateVisible", true);
      id.value = row.id;
    };
    watch(
      () => updateVisible.value,
      (val) => {
        if (!val) {
          id.value = "";
          getList();
        }
      }
    );
    const handleEnableChange = (row) => {
      storageSyncUpdate(row.id, row)
        .then(() => {
          ElMessage.success("操作成功");
        })
        .catch((error) => ElMessage.error("操作失败：" + error))
        .finally(() => {
          getList();
        });
    };
    const JSONStringify = (response) => {
      try {
        return JSON.stringify(response);
      } catch (error) {
        return response;
      }
    };
    const handleDel = (row) => {
      storageSyncRemove(row.id)
        .then(() => {
          ElMessage.success("操作成功");
        })
        .catch((error) => ElMessage.error("操作失败：" + error))
        .finally(() => {
          getList();
        });
    };
    return {
      tableData,
      updateVisible,
      handleEdit,
      id,
      Check,
      Close,
      handleEnableChange,
      JSONStringify,
      handleDel,
    };
  },
});
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  overflow: auto;
}
</style>
