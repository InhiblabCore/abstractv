<template>
  <div v-if="alignLine.enable && alignLine.show" class="ident-line-wp">
    <div
      class="ident-line x-line"
      :style="{ width: `${canvas.width}px`, top: `${alignLine.top}px` }"
    ></div>
    <div
      class="ident-line x-line"
      :style="{ width: `${canvas.width}px`, top: `${alignLine.horizontal}px` }"
    ></div>
    <div
      class="ident-line x-line"
      :style="{ width: `${canvas.width}px`, top: `${alignLine.bottom}px` }"
    ></div>
    <div
      class="ident-line y-line"
      :style="{ height: `${canvas.height}px`, left: `${alignLine.left}px` }"
    ></div>
    <div
      class="ident-line y-line"
      :style="{ height: `${canvas.height}px`, left: `${alignLine.vertical}px` }"
    ></div>
    <div
      class="ident-line y-line"
      :style="{ height: `${canvas.height}px`, left: `${alignLine.right}px` }"
    ></div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AlignLine',
  }
</script>

<script lang="ts" setup>
  import { computed } from 'vue'

  import { useEditorComStore } from '@/store/modules/editorCom'

  const editorComStore = useEditorComStore()
  const alignLine = computed(() => editorComStore.alignLine)
  const canvas = computed(() => editorComStore.canvas)
</script>

<style lang="scss" scoped>
  .ident-line {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  .x-line {
    border-top: 1px dashed #e8e8e8;
  }

  .y-line {
    border-left: 1px dashed #e8e8e8;
  }
</style>
