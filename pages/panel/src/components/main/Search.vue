<template>
  <el-form ref="form" :model="data" class="Search">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-form-item label="名称:">
          <el-input v-model="data.name" placeholder="请根据名称搜索" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜 索</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Search",
  setup() {
    const data = reactive({ name: "" });
    function handleSearch() {}
    return { data, handleSearch };
  },
});
</script>
<style lang="less" scoped>
.Search {
}
</style>
