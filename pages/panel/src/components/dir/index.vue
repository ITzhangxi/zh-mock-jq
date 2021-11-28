<template>
  <el-tree
    class="dir"
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
  />
</template>
<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "dir",
  setup() {
    const data = reactive([
      {
        label: "Level one 1",
        children: [
          {
            label: "Level two 1-1",
            children: [
              {
                label: "Level three 1-1-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level one 2",
        children: [
          {
            label: "Level two 2-1",
            children: [
              {
                label: "Level three 2-1-1",
              },
            ],
          },
          {
            label: "Level two 2-2",
            children: [
              {
                label: "Level three 2-2-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level one 3",
        children: [
          {
            label: "Level two 3-1",
            children: [
              {
                label: "Level three 3-1-1",
              },
            ],
          },
          {
            label: "Level two 3-2",
            children: [
              {
                label: "Level three 3-2-1",
              },
            ],
          },
        ],
      },
    ]);
    const defaultProps = reactive({
      children: "children",
      label: "label",
    });
    function handleNodeClick(data) {
      console.log(data);
    }
    return { data, defaultProps, handleNodeClick };
  },
});
</script>
<style lang="less" scoped>
.dir {
  height: 100%;
  background-color: #e9eef3;
}
</style>
