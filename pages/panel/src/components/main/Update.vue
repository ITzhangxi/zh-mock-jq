<template>
  <el-dialog v-model="dialogVisible" title="Tips" class="update">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="URL" prop="url">
        <el-input v-model="formModel.url" placeholder="请输入api地址" />
      </el-form-item>
      <el-form-item label="method" prop="method">
        <el-radio-group v-model="formModel.method">
          <el-radio label="GET">GET</el-radio>
          <el-radio label="POST">POST</el-radio>
          <el-radio label="PUT">PUT</el-radio>
          <el-radio label="DELETE">DELETE</el-radio>
        </el-radio-group>
        <!-- <el-select v-model="formModel.method" placeholder="请选择方法">
          <el-option
            v-for="item in methodsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="是否生效" prop="enable">
        <el-switch v-model="formModel.enable" />
      </el-form-item>
      <el-form-item label="response" prop="response">
        <EditorVue v-model="formModel.response" />
      </el-form-item>
      <el-form-item label="接口描述" prop="desc">
        <el-input
          type="textarea"
          v-model="formModel.desc"
          placeholder="请输入描述信息"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 提 交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { storageSyncSet, storageSyncGet, storageSyncUpdate } from "@/utils";
import EditorVue from "./Editor.vue";

const methodsOptions = [
  {
    value: "GET",
    label: "GET",
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUT",
    label: "PUT",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
];

export default defineComponent({
  name: "Update",
  props: {
    modelValue: Boolean,
    id: Number,
  },
  emits: ["update:modelValue"],
  components: { EditorVue },
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    watch(
      () => props.modelValue,
      (val) => {
        dialogVisible.value = val;
        if (props.id) {
          storageSyncGet(props.id)
            .then((res = {}) => {
              formModel.url = res.url;
              formModel.method = res.method;
              formModel.enable = res.enable;
              formModel.response = res.response;
              formModel.desc = res.desc;
            })
            .then(() => ElMessage.success("查询成功"))
            .catch((error) => ElMessage.error("查询失败：" + error));
        }
      },
      { immediate: true }
    );
    watch(
      () => dialogVisible.value,
      (val) => {
        emit("update:modelValue", val);
      }
    );

    const rules = [];
    const formModel = reactive({
      url: "",
      method: "GET",
      enable: true,
      response: "{resCode:2}",
      desc: "",
    });
    const formRef = ref(null);
    const handleSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          if (props.id) {
            storageSyncUpdate(props.id, formModel)
              .then(() => {
                ElMessage.success("操作成功");
                dialogVisible.value = false;
              })
              .catch((error) => ElMessage.error("操作失败：" + error));
          } else {
            storageSyncSet(formModel)
              .then(() => {
                ElMessage.success("操作成功");
                dialogVisible.value = false;
              })
              .catch((error) => ElMessage.error("操作失败：" + error));
          }
        }
      });
    };
    const handleCancel = () => {};
    return {
      dialogVisible,
      formModel,
      rules,
      methodsOptions,
      handleSubmit,
      handleCancel,
      formRef,
    };
  },
});
</script>
<style lang="less" scoped>
.update {
}
</style>
