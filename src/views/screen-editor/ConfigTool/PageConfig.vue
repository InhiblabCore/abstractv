<template>
  <div class="config-manager-page">
    <div class="config-manager-head">页面设置</div>
    <div class="config-manager-body">
      <div class="page-config">
        <div class="page-config-wp">
          <g-field label="屏幕大小" :is-flat="true">
            <g-input-number
              v-model="pageConfig.width"
              label="宽度"
              :min="100"
              :max="20000"
              inline
            />
            <g-input-number
              v-model="pageConfig.height"
              label="高度"
              :min="100"
              :max="20000"
              inline
            />
          </g-field>
          <g-field label="背景颜色">
            <g-color-picker v-model="pageConfig.bgcolor" />
          </g-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useEditorComStore } from '@/store/modules/editorCom'

  const editorComStore = useEditorComStore()
  const pageConfig = computed(() => editorComStore.page)
</script>

<style lang="scss" scoped>
  .config-manager-page {
    height: 100%;
    background: var(--datav-left-nav-bg);
    user-select: none;

    .config-manager-head {
      width: 100%;
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      color: var(--abstractv-font-color);
      background: var(--datav-layer-bg);
      user-select: none;
    }

    .config-manager-body {
      width: 100%;
      height: 100%;
      padding-top: 36px;
      margin-top: -36px;
    }
  }

  .page-config {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 12px;
    color: var(--datav-gui-font-color-1);
    background: var(--datav-gui-bgcolor-front);
  }

  .page-config-wp {
    position: relative;

    &:not(:last-child)::after {
      position: absolute;
      bottom: 1px;
      left: 6%;
      width: 91%;
      height: 1px;
      background: var(--datav-dark-color);
      content: '';
    }
  }

  .cover-btn {
    width: 96px;
  }

  .screen-preview {
    position: relative;
    width: 192px;
    height: 108px;
    margin-top: 8px;

    img {
      width: 100%;
      height: 100%;
    }

    .screen-preview-paste {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background: 0 0;
      border: var(--datav-outline);
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--datav-main-color);
      }
    }
  }

  .upload-tip {
    color: var(--datav-gui-font-color-description);
    margin-top: 4px;
    display: flex;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
