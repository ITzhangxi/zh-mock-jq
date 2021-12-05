<template>
  <el-dialog v-model="dialogVisible" title="Tips" class="update">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="domain"
        prop="domain"
        :rules="[{ required: true, message: 'domain is required' }]"
      >
        <el-input v-model="formModel.domain" placeholder="请输入domain地址" />
      </el-form-item>
      <el-form-item
        label="URL"
        prop="url"
        :rules="[{ required: true, message: 'url is required' }]"
      >
        <el-input v-model="formModel.url" placeholder="请输入api地址" />
      </el-form-item>
      <el-form-item
        label="method"
        prop="method"
        :rules="[{ required: true, message: 'method is required' }]"
      >
        <el-radio-group v-model="formModel.method">
          <el-radio label="GET">GET</el-radio>
          <el-radio label="POST">POST</el-radio>
          <el-radio label="PUT">PUT</el-radio>
          <el-radio label="DELETE">DELETE</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="是否生效"
        prop="enable"
        :rules="[{ required: true, message: '是否生效 is required' }]"
      >
        <el-switch v-model="formModel.enable" />
      </el-form-item>
      <el-form-item
        label="response"
        prop="response"
        :rules="[{ required: true, message: 'response is required' }]"
      >
        <EditorVue v-model="formModel.response" />
      </el-form-item>
      <el-form-item
        label="接口描述"
        prop="desc"
        :rules="[{ required: true, message: '接口描述 is required' }]"
      >
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
        if (props.id !== "") {
          storageSyncGet(props.id)
            .then((res = {}) => {
              formModel.domain = res.domain;
              formModel.url = res.url;
              formModel.method = res.method;
              formModel.enable = res.enable;
              formModel.response = res.response;
              formModel.desc = res.desc;
            })
            .catch((error) => ElMessage.error("查询失败：" + error));
        }
      },
      { immediate: true }
    );
    watch(
      () => dialogVisible.value,
      (val) => {
        emit("update:modelValue", val);
        if (!val) formRef.value.resetFields();
      }
    );

    const rules = [];
    const formModel = reactive({
      domain: "",
      url: "",
      method: "GET",
      enable: true,
      response: `{
  "ret": 0,
  "data": null,
  "msg": "success"
}`,
      desc: "",
    });
    const formRef = ref(null);
    const handleSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          if (!["", undefined, null].includes(props.id)) {
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
    const handleCancel = () => {
      dialogVisible.value = false;
    };
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
