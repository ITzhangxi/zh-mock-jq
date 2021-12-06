<template>
  <div class="main">
    <Search />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100px" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="method" label="method" width="100px" />
      <el-table-column prop="enable" label="enable" />
      <el-table-column prop="desc" label="desc" />
      <el-table-column prop="response" label="response" show-overflow-tooltip>
        <!-- <template #default="{ row }">
          <div>{{ JSONStringify(row.response) }}</div>
        </template> -->
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="handleDel(row)">
            删除
          </el-button>
          <el-button type="text" size="small" @click="handleCopy(row)">
            复制
          </el-button>
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
  <Update v-model="updateVisible" :id="id" :itemData="itemData" />
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
    const itemData = ref({});

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
              response:
                '{"data":{"allFuleValue":100000000332,"awardMoney":11123,"businessLine":1,"currentTime":1606794373067,"dayOfActivity":1,"endTime":1606794373067,"hasCompletedOrder":true,"id":0,"isActAccess":true,"isClickLotteryButton":false,"isHitRisk":false,"isPopUpShow":true,"isTodayFirstIn":true,"lotteryTime":1232322123,"name":"","personalFuelPackageCount":3,"personalFuelValue":300,"personalSuperDoubleFuelPackageCount":10,"popUpContent":{"fuelPackageCount":5,"fuelPackageDetail":{"completeOrder":2,"free":3},"superDoubleFuelPackageCount":6,"superDoubleFuelPackageDetail":{"completeOrder":3,"free":3}},"result":"SUCCESS","rewards":{"0":{"fuelValue":10,"money":50},"1":{"fuelValue":20,"money":70},"2":{"fuelValue":30,"money":90},"3":{"fuelValue":40,"money":100}},"startTime":1606794373067,"status":1,"taskInfos":{"0":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"first_login","taskId":1,"taskName":"test","userId":1,"userType":1},"1":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"order_complete_n","taskId":1,"taskName":"test","userId":1,"userType":1},"2":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"virtual_reward_exchange","taskId":1,"taskName":"test","userId":1,"userType":1},"3":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"arrive_activity_prize_time","taskId":1,"taskName":"test","userId":1,"userType":1}},"type":1,"userType":1},"msg":"success","ret":0}',
              updateTime: 1638383096336,
              url: "/get/list/0",
            },
            {
              createTime: 1638383106692,
              desc: "我是假数据0",
              enable: true,
              id: 1,
              method: "GET",
              response:
                '{"data":{"allFuleValue":100000000332,"awardMoney":11123,"businessLine":1,"currentTime":1606794373067,"dayOfActivity":1,"endTime":1606794373067,"hasCompletedOrder":true,"id":0,"isActAccess":true,"isClickLotteryButton":false,"isHitRisk":false,"isPopUpShow":true,"isTodayFirstIn":true,"lotteryTime":1232322123,"name":"","personalFuelPackageCount":3,"personalFuelValue":300,"personalSuperDoubleFuelPackageCount":10,"popUpContent":{"fuelPackageCount":5,"fuelPackageDetail":{"completeOrder":2,"free":3},"superDoubleFuelPackageCount":6,"superDoubleFuelPackageDetail":{"completeOrder":3,"free":3}},"result":"SUCCESS","rewards":{"0":{"fuelValue":10,"money":50},"1":{"fuelValue":20,"money":70},"2":{"fuelValue":30,"money":90},"3":{"fuelValue":40,"money":100}},"startTime":1606794373067,"status":1,"taskInfos":{"0":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"first_login","taskId":1,"taskName":"test","userId":1,"userType":1},"1":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"order_complete_n","taskId":1,"taskName":"test","userId":1,"userType":1},"2":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"virtual_reward_exchange","taskId":1,"taskName":"test","userId":1,"userType":1},"3":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"arrive_activity_prize_time","taskId":1,"taskName":"test","userId":1,"userType":1}},"type":1,"userType":1},"msg":"success","ret":0}',
              updateTime: 1638383106692,
              url: "/get/list/0",
            },
            {
              createTime: 1638383129330,
              desc: "我是假数据j",
              enable: true,
              id: 2,
              method: "GET",
              response:
                '{"data":{"allFuleValue":100000000332,"awardMoney":11123,"businessLine":1,"currentTime":1606794373067,"dayOfActivity":1,"endTime":1606794373067,"hasCompletedOrder":true,"id":0,"isActAccess":true,"isClickLotteryButton":false,"isHitRisk":false,"isPopUpShow":true,"isTodayFirstIn":true,"lotteryTime":1232322123,"name":"","personalFuelPackageCount":3,"personalFuelValue":300,"personalSuperDoubleFuelPackageCount":10,"popUpContent":{"fuelPackageCount":5,"fuelPackageDetail":{"completeOrder":2,"free":3},"superDoubleFuelPackageCount":6,"superDoubleFuelPackageDetail":{"completeOrder":3,"free":3}},"result":"SUCCESS","rewards":{"0":{"fuelValue":10,"money":50},"1":{"fuelValue":20,"money":70},"2":{"fuelValue":30,"money":90},"3":{"fuelValue":40,"money":100}},"startTime":1606794373067,"status":1,"taskInfos":{"0":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"first_login","taskId":1,"taskName":"test","userId":1,"userType":1},"1":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"order_complete_n","taskId":1,"taskName":"test","userId":1,"userType":1},"2":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"virtual_reward_exchange","taskId":1,"taskName":"test","userId":1,"userType":1},"3":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"arrive_activity_prize_time","taskId":1,"taskName":"test","userId":1,"userType":1}},"type":1,"userType":1},"msg":"success","ret":0}',
              updateTime: 1638383129330,
              url: "kkjj/kk",
            },
            {
              createTime: 1638676113629,
              desc: "我是假数据w",
              enable: true,
              id: 3,
              method: "GET",
              response:
                '{"data":{"allFuleValue":100000000332,"awardMoney":11123,"businessLine":1,"currentTime":1606794373067,"dayOfActivity":1,"endTime":1606794373067,"hasCompletedOrder":true,"id":0,"isActAccess":true,"isClickLotteryButton":false,"isHitRisk":false,"isPopUpShow":true,"isTodayFirstIn":true,"lotteryTime":1232322123,"name":"","personalFuelPackageCount":3,"personalFuelValue":300,"personalSuperDoubleFuelPackageCount":10,"popUpContent":{"fuelPackageCount":5,"fuelPackageDetail":{"completeOrder":2,"free":3},"superDoubleFuelPackageCount":6,"superDoubleFuelPackageDetail":{"completeOrder":3,"free":3}},"result":"SUCCESS","rewards":{"0":{"fuelValue":10,"money":50},"1":{"fuelValue":20,"money":70},"2":{"fuelValue":30,"money":90},"3":{"fuelValue":40,"money":100}},"startTime":1606794373067,"status":1,"taskInfos":{"0":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"first_login","taskId":1,"taskName":"test","userId":1,"userType":1},"1":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"order_complete_n","taskId":1,"taskName":"test","userId":1,"userType":1},"2":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"virtual_reward_exchange","taskId":1,"taskName":"test","userId":1,"userType":1},"3":{"businessLine":1,"category":0,"currentTime":123232,"endTime":212312323,"startTime":1232323123,"status":1,"taskCode":"arrive_activity_prize_time","taskId":1,"taskName":"test","userId":1,"userType":1}},"type":1,"userType":1},"msg":"success","ret":0}',
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
      itemData.value = row;
    };
    const handleCopy = (row) => {
      store.commit("setUpdateVisible", true);
      id.value = "";
      itemData.value = row;
    };
    watch(
      () => updateVisible.value,
      (val) => {
        if (!val) {
          id.value = "";
          itemData.value = "";
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
      handleCopy,
      id,
      itemData,
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
