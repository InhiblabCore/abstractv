<template>
  <div class="canvas-main">
    <div id="canvas-wp" class="canvas-panel-wrap" @mousedown.stop="cancelSelectCom">
      <div class="screen-shot" :style="screenStyle">
        <align-line />
        <ruler-tool />
        <div
          id="canvas-coms"
          class="canvas-panel"
          @dragover="dragOver"
          @drop="dropToAddCom"
          :style="canvasStyle"
        >
          <canvas-container
            v-for="component in componentsListDate"
            :key="component.id"
            :component="component"
          >
            <component
              :is="component.name"
              :component="component"
              :style="{
                transform: 'translateZ(0px)',
                opacity: 1,
              }"
            />
          </canvas-container> </div
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import createComponent from '@/components/createComponent'
  import useCanvasScale from '@/hooks/useCanvasScale'
  import { useEditorComStore } from '@/store/modules/editorCom'
  import { CSSProperties } from 'vue'
  import backgroundImage from '@/assets/background.png'
  import CanvasContainer from './CanvasContainer.vue'
  import RulerTool from './RulerTool/index.vue'
  import AlignLine from './RulerTool/align-line.vue'
  import { AbstractvComponent } from '@/components/componentFactory'

  useCanvasScale()
  const editorComStore = useEditorComStore()
  const componentsListDate = computed(() => editorComStore.getComponentsListDate)

  const canvasScale = computed(() => editorComStore.getCanvasScale)
  const canvasHeight = computed(() => editorComStore.getCanvasHeight)
  const canvasWidth = computed(() => editorComStore.getCanvasWidth)

  // 固定外部宽高
  const screenStyle = computed(() => {
    return {
      width: canvasWidth.value + 'px',
      height: canvasHeight.value + 'px',
    } as CSSProperties
  })

  // canvas等宽缩放
  const canvasStyle = computed(() => {
    return {
      backgroundColor: editorComStore.page.bgcolor,
      backgroundImage: `url(${backgroundImage})`,
      height: `${editorComStore.page.height}px`,
      position: 'absolute',
      width: `${editorComStore.page.width}px`,
      transform: `scale(${editorComStore.getCanvasScale}) translate(0px, 0px)`,
    } as CSSProperties
  })

  const dropToAddCom = async (event: any) => {
    event.preventDefault()

    try {
      const name = (event.dataTransfer.getData('text') as string).replace('V', '')
      if (name) {
        // ToolbarModule.addLoading();
        // 创建一个组件
        let component: AbstractvComponent = await createComponent(name)!

        // 获取缩放
        const scale = canvasScale.value

        // X方向减去左边的工具宽度 加 画布间隙
        const offsetX = (event.clientX - 384) / scale

        // y方向减去顶部的工具宽度 加 画布间隙
        const offsetY = (event.clientY - 140) / scale

        // 为了让元素中心点跟随鼠标，所以不能减去元素全宽高，需要除2
        component.attr.x = Math.round(offsetX - component.attr.w / 2)
        component.attr.y = Math.round(offsetY - component.attr.h / 2)

        // 调整组件层级
        // TODO 暂时不支持智能调整层级
        component.attr.zIndex = editorComStore.getComponentZindex

        // 每次新增组件的时候选中该组件
        editorComStore.addComponent(component)
        editorComStore.selectComponentActive(component.id)
      }
    } catch {
      // TODO
      console.log('error')
    }
  }

  // 拖拽结束
  const dragOver = (ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = 'copy'
  }

  // 点击背景取消选择组件，展示背景参数配置项
  const cancelSelectCom = () => {
    editorComStore.selectComponentActive('page')
  }
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
