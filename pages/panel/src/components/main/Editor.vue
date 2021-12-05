<template>
  <div class="editor" ref="editorRef"></div>
</template>
<script>
import { defineComponent, nextTick, ref } from "vue";
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
  // eslint-disable-next-line no-unused-vars
  setup(props, { emit }) {
    const editorRef = ref(null);
    let editorIns;
    nextTick(() => {
      editorIns = monaco.editor.create(editorRef.value, {
        language: "json",
        value: props.modelValue,
        theme: "vs-dark",
      });

      editorIns.onDidChangeModelContent(() => {
        let val = "";
        try {
          val = JSON.parse(editorIns.getValue());
        } catch (error) {
          val = editorIns.getValue();
        }
        emit("update:modelValue", val);
      });
    });

    return { editorRef, editorIns };
  },
});
</script>
<style lang="less" scoped>
.editor {
  height: 250px;
}
</style>
