<template>
  <div class="header-container">
    <div class="head-btn-group view-btn-group">
      <n-tooltip :delay="500">
        <template #trigger>
          <div class="head-btn --selected">
            <n-icon class="head-btn-icon">
              <IconEditorCanvas />
            </n-icon>
          </div>
        </template>
        画布编辑器
      </n-tooltip>
      <n-tooltip :delay="500">
        <template #trigger>
          <div class="head-btn --disabled">
            <n-icon class="head-btn-icon">
              <IconNodal />
            </n-icon>
          </div>
        </template>
        蓝图编辑器
      </n-tooltip>
    </div>
    <div class="datav-edit-header">
      <div class="editor-header-wp">
        <div class="editor-config">
          <n-tooltip :delay="500">
            <template #trigger>
              <div :class="['head-btn mr4', { '--selected': layer }]" @click="changeLayerPanel">
                <n-icon class="head-btn-icon">
                  <IconLayer />
                </n-icon>
              </div>
            </template>
            图层
          </n-tooltip>
          <n-tooltip :delay="500">
            <template #trigger>
              <div
                :class="['head-btn mr4', { '--selected': components }]"
                @click="changeComponentsPanel"
              >
                <n-icon class="head-btn-icon" :class="{ '--rotate': !components }">
                  <IconBox />
                </n-icon>
              </div>
            </template>
            组件列表
          </n-tooltip>
          <n-tooltip :delay="500">
            <template #trigger>
              <div :class="['head-btn mr4', { '--selected': config }]" @click="changeConfigPanel">
                <n-icon class="head-btn-icon">
                  <IconRpanel />
                </n-icon>
              </div>
            </template>
            右侧面板
          </n-tooltip>
        </div>
      </div>
      <div class="screen-info">
        <n-icon class="workspace-icon">
          <IconWorkspace />
        </n-icon>
        <span>{{ 'AbstaractV 空间 - test' }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    IconBox,
    IconRpanel,
    IconLayer,
    IconEditorCanvas,
    IconNodal,
    IconWorkspace,
  } from '@/icons'
  import { useToolStore } from '@/store/modules/tool'

  const toolStore = useToolStore()
  const components = computed(() => toolStore.getComponentsShow)
  const layer = computed(() => toolStore.getLayerShow)
  const config = computed(() => toolStore.getConfigShow)

  const changeLayerPanel = () => {
    toolStore.layer.show = !layer.value
  }
  const changeComponentsPanel = () => {
    toolStore.components.show = !components.value
  }

  const changeConfigPanel = () => {
    toolStore.config.show = !config.value
  }
</script>

<style scoped lang="less">
  .header-container {
    position: relative;
    height: 41px;
    padding-right: 8px;
    display: flex;
    z-index: 100;
    align-items: center;
    user-select: none;
    color: var(--datav-gui-font-color-base);
    border-bottom: var(--datav-border-dark);
    background: #1d1e1f;

    .view-btn-group {
      margin: 0 15px;
      z-index: 1;
    }
  }

  .head-btn {
    width: 40px;
    height: 24px;
    padding: 4px 0;
    text-align: center;
    cursor: pointer;
    background: var(--datav-component-bg);
    box-shadow: inset 0 0 0 1px rgb(255 235 235 / 10%), 0 0 0 1px #181818;
    transition: 0.2s;

    .head-btn-icon {
      color: #fff;

      &:not(:first-child) {
        border-left: 1px solid rgb(255 235 235 / 10%);
      }

      &.--rotate {
        animation: com-rotate 2s infinite;
        animation-direction: alternate-reverse;
      }
    }

    &:not(.--disabled):hover {
      background: #414750;
    }

    &.--selected {
      background: var(--datav-main-color);

      & + .head-btn {
        border-left-color: transparent;
      }

      &:not(.--disabled):hover {
        background: var(--datav-main-color);
      }
    }

    &.--disabled {
      cursor: not-allowed;

      .head-btn-icon {
        opacity: 0.2;
      }
    }
  }

  .head-btn-group {
    display: flex;
    box-sizing: border-box;
    background: #1d1e1f;
    border: 1px solid rgb(255 235 235 / 10%);
    box-shadow: 0 0 0 1px #181818;

    .head-btn {
      width: 45px;
      border-radius: 0;
      box-shadow: none;
      height: 22px;
      padding: 3px 0;
      border-left: 1px solid transparent;
    }
  }

  .datav-edit-header {
    width: 100%;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    height: 40px;
    z-index: 100;

    .editor-header-wp {
      display: flex;
      overflow: hidden;
      transition: width 0.3s ease;
    }

    .editor-config {
      display: flex;
      width: 300px;
      align-items: center;
      transition: 0.3s ease;
    }

    .drawer-actions {
      width: 90px;
      height: 40px;
      display: flex;
      align-items: center;
    }

    .screen-info {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      text-align: center;
      cursor: default;
      max-width: 500px;
      color: var(--datav-gui-font-color-base);
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .workspace-icon {
        margin-right: 8px;
        font-size: 14px;
        cursor: pointer;
      }
    }

    .global-actions {
      position: absolute;
      top: 0;
      right: 8px;
      width: 300px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 40px;
    }

    .full-a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }

    .ml4 {
      margin-left: 4px;
    }

    .mr4 {
      margin-right: 4px;
    }
  }

  @keyframes com-rotate {
    0% {
      transform: rotateZ(0);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
</style>
