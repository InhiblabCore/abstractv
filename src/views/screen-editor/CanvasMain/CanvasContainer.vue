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
        <template v-for="(v, k) in points" :key="k">
          <i v-if="v.rotateStyle" :class="`${v.name}-handler`" data-html2canvas-ignore>
            <span class="rotate-handler" :style="v.rotateStyle" @mousedown.prevent.stop="onRotate">
              <span
                class="control-point"
                :style="v.style"
                @mousedown.prevent.stop="onZoom($event, k)"
              ></span>
            </span>
          </i>
          <i v-else :class="`${v.name}-handler`" data-html2canvas-ignore>
            <span
              class="control-point"
              :style="v.style"
              @mousedown.prevent.stop="onZoom($event, k)"
            ></span>
          </i>
        </template>
        <div class="transform-bg"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useCanvasScale from '@/hooks/useCanvasScale'
  import { useEditorComStore } from '@/store/modules/editorCom'
  import { CSSProperties } from 'vue'
  import { useEventEmitter, useHover } from 'vue3-hooks-plus'
  import { Direction, getCursors, handleMove, handleRotate } from './utils'
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

  const cursor = computed(() => getCursors(props.component.attr.deg))
  const points = computed<{
    [k in Direction]: {
      name: string
      style: Partial<CSSProperties>
      rotateStyle?: Partial<CSSProperties>
    }
  }>(() => {
    const transform = `scale(${1 / scale.value}, ${1 / scale.value})`
    return {
      t: {
        name: 'top',
        style: { cursor: cursor.value.t, transform },
      },
      rt: {
        name: 'top-right',
        style: { cursor: cursor.value.rt },
        rotateStyle: { 'transform-origin': '25% 75%', transform },
      },
      r: {
        name: 'right',
        style: { cursor: cursor.value.r, transform },
      },
      rb: {
        name: 'bottom-right',
        style: { cursor: cursor.value.rb },
        rotateStyle: { 'transform-origin': '25% 25%', transform },
      },
      b: {
        name: 'bottom',
        style: { cursor: cursor.value.b, transform },
      },
      lb: {
        name: 'bottom-left',
        style: { cursor: cursor.value.lb },
        rotateStyle: { 'transform-origin': '75% 25%', transform },
      },
      l: {
        name: 'left',
        style: { cursor: cursor.value.l, transform },
      },
      lt: {
        name: 'top-left',
        style: { cursor: cursor.value.lt },
        rotateStyle: { 'transform-origin': '75% 75%', transform },
      },
    }
  })
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
  const onRotate = (ev: MouseEvent) => {
    handleRotate(ev, instance?.vnode.el as HTMLElement, props.component)
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
  const onZoom = (ev: MouseEvent, dir: Direction) => {
    selectCom()
    console.log(ev, dir)

    //   handleZoom(ev, dir, props.com, scale.value);
  }
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
