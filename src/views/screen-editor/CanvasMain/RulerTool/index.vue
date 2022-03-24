<template>
  <div class="canvas-ruler-wp">
    <div
      ref="hRulerWpRef"
      class="ruler-wrapper h-container"
      :style="`transform: translateX(-${hScroll}px);`"
    ></div>
    <div
      ref="vRulerWpRef"
      class="ruler-wrapper v-container"
      :style="`transform: rotate(90deg) translateX(-${vScroll}px);`"
    ></div>
    <div title="切换参考线" class="ruler-corner" @click="toggleGuides(!visible)">
      <n-icon>
        <IconLineShow v-if="visible" style="z-index: 10" />
        <IconLineHide v-else />
      </n-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { IconLineShow, IconLineHide } from '@/icons'
  import { useEditorComStore } from '@/store/modules/editorCom'
  import { ComputedRef } from 'vue'
  import { useBoolean } from 'vue3-hooks-plus'
  import useRulerTool, { RulerOption } from './useRulerTool'

  const hScroll = ref(0)
  const vScroll = ref(0)

  const editorComStore = useEditorComStore()
  const [visible, { set: setVisible }] = useBoolean(true)

  const scale = computed(() => editorComStore.getCanvasScale)
  const canvasHeight = computed(() => editorComStore.getCanvasHeight)
  const canvasWidth = computed(() => editorComStore.getCanvasWidth)

  const cw = document.documentElement.clientWidth
  const hWidth = computed(() => Math.max(canvasWidth.value, cw))
  const vHeight = computed(() => canvasHeight.value)

  const hOptions = computed(() => ({
    direction: 'TB',
    width: hWidth.value,
    scale: scale.value,
  }))

  const vOptions = computed(() => ({
    direction: 'LR',
    width: canvasHeight.value,
    scale: scale.value,
  }))

  const {
    container: hRulerWpRef,
    createArithmeticScale: createArithmeticHScale,
    setSize: setHSize,
    toggleGuide: toggleHGuide,
  } = useRulerTool(hOptions as ComputedRef<RulerOption>)
  const {
    container: vRulerWpRef,
    createArithmeticScale: createArithmeticVScale,
    setSize: setVSize,
    toggleGuide: toggleVGuide,
  } = useRulerTool(vOptions as ComputedRef<RulerOption>)

  watchEffect(() => {
    if (hRulerWpRef.value) {
      setHSize(hWidth.value, 20, scale.value)
    } else {
      createArithmeticHScale()
    }
  })

  watchEffect(() => {
    if (vRulerWpRef.value) {
      setVSize(vHeight.value, 20, scale.value)
    } else {
      createArithmeticVScale()
    }
  })

  onMounted(() => {
    createArithmeticHScale()
    createArithmeticVScale()
  })

  const toggleGuides = (visible: boolean) => {
    setVisible(visible)
    toggleHGuide(visible)
    toggleVGuide(visible)
  }

  const onScroll = (ev: Event) => {
    const dom = ev.target as HTMLElement
    hScroll.value = dom.scrollLeft
    vScroll.value = dom.scrollTop
  }

  onMounted(() => {
    const canvasWp = document.getElementById('canvas-wp')
    canvasWp?.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    const canvasWp = document.getElementById('canvas-wp')
    canvasWp?.removeEventListener('scroll', onScroll)
  })
</script>

<style lang="scss">
  $line-border-1: 1px solid rgb(0 173 255 / 84%);
  $line-border-2: 1px dashed rgb(0 173 255 / 84%);
  $line-border-3: 1px solid rgb(161 174 179 / 80%);

  .canvas-ruler-wp {
    position: fixed;
    z-index: 1;

    .ruler-wrapper {
      position: absolute;
      height: 20px;
    }

    .ruler-line {
      position: absolute;

      .line-action {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        color: #fff;
        padding: 0 4px;
        border-radius: 1px;
        box-shadow: 0 0 5px -3px #000;
        background: rgb(64 116 180 / 100%);

        .line-value {
          pointer-events: none;
          color: #e6f7ff;
          font-size: 12px;
          font-weight: 400;
          text-shadow: 0 0 10px #0270ff;
        }
      }
    }

    .ruler-indicator {
      position: absolute;
      pointer-events: none;

      .indicator-value {
        position: absolute;
        background: rgb(64 116 180 / 100%);
        color: #fff;
        border-radius: 1px;
        padding: 0 4px;
      }
    }

    .h-container {
      left: 20px;
      cursor: ew-resize;
      transform: translateX(0);

      .ruler-line {
        top: 0;
        height: 100vh;
        padding-left: 5px;
        border-left: $line-border-1;

        .line-action {
          top: 5px;
        }
      }

      .ruler-indicator {
        border-left: $line-border-2;
        top: 0;
        height: 100vw;

        .indicator-value {
          left: 10px;
          top: 5px;
        }
      }
    }

    .v-container {
      cursor: ns-resize;
      transform: rotate(90deg) translateX(0);
      transform-origin: 0 100% 0;

      .lines-wrapper {
        transform: rotate(-90deg);
        transform-origin: 0 100% 0;
      }

      .ruler-line {
        left: 3px;
        width: 100vw;
        border-top: $line-border-1;

        .line-action {
          top: 10px;
          left: 5px;
          transform: rotate(90deg);
        }
      }

      .ruler-indicator {
        border-bottom: $line-border-2;
        width: 100vw;
        bottom: 1px;
        transform: rotate(-90deg);
        transform-origin: 1px 100% 0;

        .indicator-value {
          transform-origin: 0 0;
          transform: rotate(90deg);
          top: 10px;
          left: 25px;
        }
      }
    }

    .ruler-corner {
      position: fixed;
      z-index: 999;
      display: flex;
      width: 20px;
      height: 20px;
      font-size: 16px;
      color: var(--abstractv-font-color);
      cursor: pointer;
      background: var(--datav-data-form-bgcolor);
      border-right: $line-border-3;
      border-bottom: $line-border-3;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #fff;
      }
    }
  }
</style>
