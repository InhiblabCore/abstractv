<template>
  <div class="setting-panel">
    <config-title :com-name="component.name" :com-alias="component.alias">
      <div class="search-config">
        <n-icon class="search-icon">
          <IconSearch />
        </n-icon>
        <span>搜索配置</span>
      </div>
    </config-title>
    <div class="setting-panel-content">
      <div class="scroll-container">
        <basic-config :key="`${component.id}'_basic-setting`" :attr="component.attr" />
        <component :is="component.name + 'Prop'" :key="component.id" :com="component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { AbstractvComponent } from '@/components/componentFactory'
  import { ComputedRef } from 'vue'
  import ConfigTitle from './components/ConfigTitle.vue'
  import BasicConfig from './components/BasicConfig.vue'

  const component = inject('component') as ComputedRef<AbstractvComponent>
</script>

<style lang="scss" scoped>
  .setting-panel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .setting-panel-content {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 66px;
    overflow-y: auto;
  }

  .scroll-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 534px;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .search-config {
    position: absolute;
    top: 12px;
    right: 8px;
    display: flex;
    max-width: 140px;
    line-height: 19px;
    color: var(--datav-main-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    align-items: center;
    flex-direction: row;

    .search-icon {
      margin: 0 4px;
    }
  }
</style>
