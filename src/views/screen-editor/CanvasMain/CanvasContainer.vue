<template>
  <div class="canvas-container" :style="CanvasContainerStyle" :class="canvasContainerClass">
    <div
      :class="['datav-scale', { hovered: isHover }]"
      :style="hideStyle"
      ref="containScaleRef"
      @mousedown.prevent.stop="onMove"
    >
      <div class="transform-handler" :class="handlerClass" :style="handlerStyle">
        <div class="datav-com">
          <slot></slot>
          <div class="datav-wrapper-event-disable" :style="wrapperStyle"></div>
        </div>
        <ControlPoint
          :component="component"
          :scale="scale"
          :selectCom="selectCom"
          :instance="instance"
        />
        <div class="transform-bg"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useCanvasScale from '@/hooks/useCanvasScale'
  import { useEditorComStore } from '@/store/modules/editorCom'
  import { useEventEmitter, useHover } from 'vue3-hooks-plus'
  import { handleMove } from './utils'
  import ControlPoint from './ControlPoint.vue'
  const editorComStore = useEditorComStore()
  const event = useEventEmitter({ global: true })
  const instance = getCurrentInstance()
  const props = defineProps<{
    component: {
      attr: {
        w: number
        h: number
        x: number
        y: number
        deg: 0
      }
      selected: boolean
      locked: boolean
      hided: boolean
      hovered: boolean
      componentId: string
    }
  }>()

  event.useSubscription('select', (data: any) => {
    const id = data?.params?.[0]?.componentId
    if (id === props.component.componentId) editorComStore.setComponentSelect(props.component)
    else editorComStore.cancelComponentSelect(props.component)
  })

  const { canvasScale: scale } = useCanvasScale()

  const containScaleRef = ref()
  const isHover = useHover(containScaleRef)

  const CanvasContainerStyle = computed(() => ({
    top: 0,
    left: 0,
    width: `${props.component.attr.w}px`,
    height: `${props.component.attr.h}px`,
    transform: `translate(${props.component.attr.x}px, ${props.component.attr.y}px)`,
  }))

  const canvasContainerClass = computed(() => ({
    selected: props.component.selected,
    hided: props.component.hided,
    locked: props.component.locked,
  }))
  const hideStyle = computed(() => ({
    display: props.component.hided ? 'none' : 'block',
  }))
  const handlerClass = computed(() => ({
    hided: !props.component.selected || props.component.locked,
  }))

  const handlerStyle = computed(() => ({
    cursor: 'move',
    transform: `rotate(${props.component.attr.deg}deg)`,
  }))
  const wrapperStyle = computed(() => ({
    width: `${props.component.attr.w}px`,
    height: `${props.component.attr.h}px`,
  }))

  const selectCom = () => {
    if (props.component.selected) {
      return
    }
    event.emit('select', { componentId: props.component.componentId })
  }

  const onMove = (e: MouseEvent) => {
    handleMove({
      component: props.component,
      mouseStartEvent: e,
      grid: 8,
      scale: scale.value,
    })
    selectCom()
  }
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
