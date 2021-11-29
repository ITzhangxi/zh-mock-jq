<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    :before-close="handleClose"
    class="update"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="formModel.url" placeholder="请输入URL" />
      </el-form-item>
      <el-form-item label="method" prop="method">
        <el-select v-model="formModel.method" placeholder="请输入URL">
          <el-option
            v-for="item in methodsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效" prop="url">
        <el-switch v-model="formModel.enable" />
      </el-form-item>
      <el-form-item label="response" prop="response">
        <EditorVue v-model="formModel.response" />
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
import { ElMessageBox } from "element-plus";
import EditorVue from "./Editor.vue";
EditorVue;

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
  },
  emits: ["update:modelValue"],
  components: { EditorVue },
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    watch(
      () => props.modelValue,
      (val) => {
        dialogVisible.value = val;
      },
      { immediate: true }
    );
    watch(
      () => dialogVisible.value,
      (val) => {
        emit("update:modelValue", val);
      }
    );

    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    const rules = [];
    const formModel = reactive({
      name: "",
      url: "",
      method: "",
      enable: true,
      response: "rqewrqw",
    });
    const handleSubmit = () => {};
    const handleCancel = () => {};
    return {
      dialogVisible,
      handleClose,
      formModel,
      rules,
      methodsOptions,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>
<style lang="less" scoped>
.update {
}
</style>
