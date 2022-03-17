<template>
  <div class="canvas-main">
    <div id="canvas-wp" class="canvas-panel-wrap">
      <div id="canvas-wp" class="canvas-panel-wrap" :style="screenStyle">
        <div
          id="canvas-coms"
          class="canvas-panel"
          @dragover="dragOver"
          @drop="dropToAddCom"
          :style="canvasStyle"
        >
          <div
            v-for="com in componentsListDate"
            :key="com.name"
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${com.attr.w}px`,
              height: `${com.attr.h}px`,
              transform: `translate(${com.attr.x}px,${com.attr.y}px)`,
              zIndex: com.attr.zIndex,
            }"
          >
            <component
              :is="com.name"
              :style="{
                transform: 'translateZ(0px)',
                opacity: 1,
              }"
            />
          </div> </div
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import createComponent from '@/components/createComponent';
  import useCanvasScale from '@/hooks/useCanvasScale';
  import { useEditorComStore } from '@/store/modules/editorCom';
  import { CSSProperties } from 'vue';
  import backgroundImage from '@/assets/background.png';

  const editorComStore = useEditorComStore();

  const componentsListDate = computed(() => editorComStore.getComponentsListDate);

  const { canvasScale, pageHeight, pageWidth, canvasHeight, canvasWidth } = useCanvasScale();
  const screenStyle = computed(() => {
    return {
      width: pageWidth,
      height: pageHeight,
    } as CSSProperties;
  });

  const canvasStyle = computed(() => {
    return {
      backgroundColor: 'rgba(13,42,67,0)',
      backgroundImage: `url(${backgroundImage})`,
      height: `${canvasHeight.value}px`,
      position: 'absolute',
      width: `${canvasWidth.value}px`,
      transform: `scale(${canvasScale.value}) translate(0px, 0px)`,
    } as CSSProperties;
  });

  const dropToAddCom = async (event: any) => {
    event.preventDefault();

    try {
      const name = event.dataTransfer.getData('text');
      console.log(event);
      console.log(name);

      if (name) {
        // ToolbarModule.addLoading();
        let component: any = await createComponent(name);
        const scale = canvasScale.value;

        const offsetX = (event.clientX - 384) / scale;
        const offsetY = (event.clientY - 140) / scale;

        component.attr.x = Math.round(offsetX - component.attr.w / 2);
        component.attr.y = Math.round(offsetY - component.attr.h / 2);
        component.attr.zIndex = editorComStore.getComponentZindex;

        editorComStore.addComponent(component);
      }
    } catch {
      // TODO
    }
  };

  const dragOver = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = 'copy';
  };
</script>

<style lang="scss" scoped>
  .canvas-main {
    position: relative;
    display: flex;
    height: 100%;
    padding: 0;
    user-select: none;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
  }

  .canvas-panel-wrap {
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
    overflow: auto;

    .canvas-panel {
      top: 60px;
      left: 60px;
      background-position: center, right bottom;
      background-repeat: no-repeat, no-repeat;
      background-size: cover, contain;
      box-shadow: rgb(0 0 0 / 50%) 0 0 30px 0;
      transition: 0.2s all ease-in-out;
      transform-origin: 0 0;
      // overflow: hidden;
    }
  }
</style>

<style lang="scss">
  .datav-com .datav-wraper,
  .datav-layer .datav-wraper {
    pointer-events: none !important;
  }

  .datav-wraper {
    box-sizing: border-box;
  }
</style>
