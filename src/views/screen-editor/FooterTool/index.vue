<template>
  <div class="g-footer bottom-sider">
    <n-popover
      :width="235"
      placement="top"
      trigger="hover"
      raw
      :style="{
        '--n-color': 'var(--datav-component-bg)',
      }"
    >
      <template #trigger>
        <n-icon class="shortcut-btn">
          <IconKeyboard />
        </n-icon>
      </template>
      <div class="shortcut-wp">
        <div class="shortcut-item">
          <div class="shortcut-title">开关图层面板</div>
          <div class="shortcut-value">Ctrl/Cmd + ←</div>
        </div>
        <div class="shortcut-item">
          <div class="shortcut-title">切换组件面板</div>
          <div class="shortcut-value">Ctrl/Cmd + ↑</div>
        </div>
        <div class="shortcut-item">
          <div class="shortcut-title">切换右侧面板</div>
          <div class="shortcut-value">Ctrl/Cmd + →</div>
        </div>
        <div class="shortcut-item">
          <div class="shortcut-title">画布缩放到最佳位置</div>
          <div class="shortcut-value">Ctrl/Cmd + a</div>
        </div>
      </div>
    </n-popover>
    <div class="scale-input-wp">
      <input v-model="scale" type="number" class="scale-input" @keydown.enter="submitScale(0)" />
      <span class="percent">%</span>
      <n-popover
        :width="56"
        placement="top"
        trigger="click"
        :show-arrow="false"
        raw
        :style="{
          '--n-color': 'var(--datav-component-bg)',
        }"
      >
        <template #trigger>
          <n-icon class="open-icon">
            <IconArrowDown />
          </n-icon>
        </template>
        <div class="scale-value-list">
          <div
            v-for="s in scaleList"
            :key="s.value"
            class="scale-value-item"
            @click="submitScale(s.value)"
          >
            {{ s.label }}
          </div>
        </div>
      </n-popover>
    </div>
    <div class="scale-slider-wp">
      <div class="btn" @click="changeScale(-1)">
        <i class="base-icon"> - </i>
      </div>
      <div class="silder">
        <n-slider
          v-model:value="scale"
          :min="10"
          :max="200"
          :step="5"
          :tooltip="false"
          @update:value="submitScale"
        />
      </div>
      <div class="btn" @click="changeScale(1)">
        <i class="base-plus-icon">
          <IconPlus style="width: 100%; height: 100%" />
        </i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useCanvasScale from '@/hooks/useCanvasScale'
  import { IconArrowDown, IconKeyboard, IconPlus } from '@/icons'
  import { useEditorComStore } from '@/store/modules/editorCom'
  const scaleList = [
    { label: '200%', value: 200 },
    { label: '150%', value: 150 },
    { label: '100%', value: 100 },
    { label: '50%', value: 50 },
    { label: '自适应', value: -1 },
  ]
  const editorComStore = useEditorComStore()
  const { handleScale: autoScale } = useCanvasScale()
  const scale = computed(() => parseInt((editorComStore.getCanvasScale * 100).toFixed(2)))

  const submitScale = async (val: number) => {
    if (val === -1) autoScale()
    else editorComStore.setCanvasScale(val / 100)
  }

  const changeScale = async (val: number) => {
    if (scale.value > 10) editorComStore.setCanvasScale((scale.value + val) / 100)
  }
</script>

<style scoped lang="scss">
  .bottom-sider {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    width: 100%;
    height: 32px;
    background: #222528;
    box-shadow: 0 -1px #000;
    user-select: none;
    align-items: center;
    justify-content: flex-end;

    .shortcut-btn {
      margin-right: 20px;
      font-size: 18px;
      color: var(--abstractv-font-color);
      cursor: pointer;
    }

    .scale-input-wp {
      position: relative;
      display: block;
      width: 58px;
      height: 20px;
      line-height: 18px;
      margin-right: 20px;
      overflow: hidden;
      cursor: pointer;
      background: var(--datav-dark-color);
      border: var(--datav-outline);

      .scale-input {
        width: 27px;
        padding-left: 5px;
        font-size: 12px;
        color: var(--abstractv-font-color);
        text-align: right;
        background: transparent;
        user-select: none;
        caret-color: var(--abstractv-font-color);

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          margin: 0;
          appearance: none;
        }
      }

      .percent {
        margin-left: 1px;
        color: var(--abstractv-font-color);
      }

      .open-icon {
        position: absolute;
        font-weight: bold;
        color: var(--abstractv-font-color);
        transform: scale(0.6);
        margin-top: 2px;
      }
    }

    .scale-slider-wp {
      display: flex;
      width: 216px;

      .silder {
        flex: 1;
      }

      .btn {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .base-plus-icon {
          height: 1em;
          width: 1em;
          line-height: 1em;
          text-align: center;
          display: inline-block;
          position: relative;
          fill: currentColor;
          background-color: #262b33;
          transform: translateY(-1px) translateX(6px) translateZ(0);
          cursor: pointer;
        }

        .base-icon {
          height: 1em;
          width: 1em;
          line-height: 1em;
          text-align: center;
          display: inline-block;
          position: relative;
          fill: currentColor;
          background-color: #262b33;
          transform: translateY(-1px) translateX(-6px) translateZ(0);
          cursor: pointer;
        }
      }
    }
  }

  .shortcut-wp {
    position: relative;
    padding: 5px 10px;
    font-size: 12px;
    background: var(--datav-component-bg);
    box-shadow: 0 0 8px -4px #000;
    user-select: none;

    .shortcut-item {
      display: flex;
      margin: 5px 0;
      justify-content: space-between;
      align-items: center;
    }

    .shortcut-title {
      padding-right: 15px;
      color: var(--abstractv-font-color);
    }

    .shortcut-value {
      padding: 4px 6px;
      font-weight: 700;
      color: #08a1db;
      background: #262b33;
      border-radius: 2px;
    }
  }

  .scale-value-list {
    font-size: 12px;
    background: #262b33;
    border: var(--datav-outline);
    user-select: none;

    .scale-value-item {
      width: 54px;
      padding: 5px 0;
      color: var(--abstractv-font-color);
      text-align: center;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        color: var(--datav-main-hover-color);
        background: var(--datav-bgcolor-1);
      }

      &:not(:first-child) {
        border-top: var(--datav-outline);
      }
    }
  }
</style>
