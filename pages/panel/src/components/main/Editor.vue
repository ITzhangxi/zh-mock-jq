<template>
  <div class="editor" ref="editorRef"></div>
</template>
<script>
import { defineComponent, nextTick, ref, watch } from "vue";
import * as monaco from "monaco-editor";

export default defineComponent({
  name: "Editor",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const editorRef = ref(null);
    let editorIns;
    let edit = false;
    nextTick(() => {
      editorIns = monaco.editor.create(editorRef.value, {
        language: "json",
        value: "",
        theme: "vs-dark",
      });

      editorIns.onDidChangeModelContent(() => {
        let val = "";
        try {
          val = editorIns.getValue();
        } catch (error) {
          val = editorIns.getValue();
        }
        edit = true;
        emit("update:modelValue", val);
      });
    });
    watch(
      () => props.modelValue,
      (val) => {
        nextTick(() => {
          if (!edit) {
            editorIns.setValue(val);
          }
          edit = false;
        });
      },
      {
        immediate: true,
      }
    );

    return { editorRef, editorIns };
  },
});
</script>
<style lang="less" scoped>
.editor {
  height: 250px;
}
</style>
