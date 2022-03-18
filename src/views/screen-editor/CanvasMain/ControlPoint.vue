<template>
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
</template>

<script lang="ts" setup>
  import { CSSProperties } from 'vue'
  import { Direction, getCursors, handleRotate } from './utils'

  const props = defineProps<{
    component: any
    scale: number
    selectCom: () => void
    instance: any
  }>()

  const cursor = computed(() => getCursors(props.component.attr.deg))
  const scale = computed(() => props.scale)
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

  const onRotate = (ev: MouseEvent) => {
    handleRotate(ev, props.instance?.vnode.el as HTMLElement, props.component)
  }
  const onZoom = (ev: MouseEvent, dir: Direction) => {
    props.selectCom()
    console.log(ev, dir)

    //   handleZoom(ev, dir, props.com, scale.value);
  }
</script>

<style scoped lang="scss">
  @import './style.scss';
</style>
