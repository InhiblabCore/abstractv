<template>
  <div class="g-layout is-vertical edit-container">
    <div class="g-header text-white">
      <header-tool />
    </div>
    <div id="edit-main-wp" class="g-layout edit-main-wp">
      <layer-area />
      <MaterialArea />
      <!-- <filter-manager-drawer /> -->
      <div class="g-layout edit-main text-white">
        <!-- <toolbox-panel /> -->
        <g-loading :spinning="false">
          <canvas-main />
        </g-loading>
        <footer-tool />
      </div>
      <config-tool />
    </div>
  </div>
  <context-menu />
  <!-- <editor-context-menu /> -->
</template>

<script lang="ts" setup>
  import HeaderTool from './HeaderTool/index.vue'
  import MaterialArea from './MaterialArea/index.vue'
  import ConfigTool from './ConfigTool/index.vue'
  import LayerArea from './LayerArea/index.vue'
  import FooterTool from './FooterTool/index.vue'
  import CanvasMain from './CanvasMain/index.vue'
  import ContextMenu from './ContextMenu/index.vue'
</script>

<style scoped lang="scss">
  .edit-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .edit-main-wp {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow: hidden;
    background: url('/images/bg-canvas.png');
    flex-wrap: nowrap;
  }

  .edit-main {
    position: relative;
    z-index: 2;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
  }
</style>
