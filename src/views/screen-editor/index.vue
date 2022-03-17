<template>
  <div class="g-layout is-vertical edit-container">
    <div class="g-header text-white">
      <Header />
    </div>
    <div id="edit-main-wp" class="g-layout edit-main-wp">
      <MaterialArea />
      <!-- <layer-panel /> -->
      <!-- <components-panel /> -->
      <!-- <filter-manager-drawer /> -->
      <div class="g-layout edit-main text-white">
        <!-- <toolbox-panel /> -->
        <g-loading :spinning="false">
          <CanvasMain />
        </g-loading>
        <Footer />
      </div>
      <!-- <ConfigPanel /> -->
    </div>
  </div>
  <!-- <editor-context-menu /> -->
</template>

<script lang="ts" setup>
  import Header from './Header/index.vue';
  import MaterialArea from './MaterialArea/index.vue';
  // import ConfigPanel from './ConfigPanel/index.vue';
  import Footer from './Footer/index.vue';
  import CanvasMain from './CanvasMain/index.vue';
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
