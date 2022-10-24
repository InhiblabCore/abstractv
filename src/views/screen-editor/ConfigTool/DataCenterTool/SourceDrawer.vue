<template>
  <n-drawer
    v-model:show="visible"
    width="500px"
    :trap-focus="false"
    class="source-drawer"
    to="#edit-main-wp"
    show-mask
  >
    <n-drawer-content closable>
      <template #header>
        <p class="source-drawer-title">设置数据源</p>
      </template>

      <div class="step-title" :class="{ '--error': !!dataStatus.api }"> 数据源 </div>
      <div class="datasource-selector">
        <label class="datasource-selector-title">数据源类型</label>
        <div class="datasource-select">
          <div class="datav-new-select-wp">
            <n-select
              v-model:value="apiDataConfig.type"
              :options="datasources"
              filterable
              class="datav-new-select"
              @update:value="changeSource"
            />
          </div>
        </div>
      </div>

      <!-- <ds-static-editor v-if="apiDataConfig.type === apiType.static" />
      <ds-api-editor v-else-if="apiDataConfig.type === apiType.api" /> -->

      <n-popover
        v-model:show="visiblePreview"
        placement="left"
        :width="400"
        class="editor-popover"
        :style="{
          '--n-color': '#0000',
        }"
      >
        <template #trigger>
          <div class="ds-response-btn">
            <n-icon class="refresh-btn">
              <IconSearch />
            </n-icon>
            预览数据源返回结果
          </div>
        </template>
        <div class="ds-preview-content">
          <g-monaco-editor
            language="json"
            :read-only="true"
            :auto-format="true"
            :height="180"
            :code="dataOrign"
          />
        </div>
      </n-popover>

      <div class="step-title" :class="{ '--error': !!dataStatus.filter }">
        <n-checkbox v-model:checked="apiDataConfig.config.useFilter" class="use-filter-btn" />
        <span class="use-filter-text">数据过滤器</span>
        <span class="tutorial-popup">教程</span>
      </div>

      <filter-panel />

      <field-grid :fields="apiConfig.fields" />
      <div
        class="step-title"
        :class="{
          '--error': !!dataStatus.api || !!dataStatus.filter,
        }"
      >
        <span>数据响应结果</span>
        <n-icon class="refresh-btn" @click="refreshData">
          <IconRefresh />
        </n-icon>
      </div>
      <div class="data-response">
        <g-monaco-editor language="json" :read-only="true" :auto-format="true" :code="resData" />
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { ref, computed, provide, inject, ComputedRef } from 'vue'
  import { loadAsyncComponent } from '@/utils/async-component'
  import {
    createDataSources,
    ApiType,
    createDataConfigForApi,
  } from '@/components/dataSource/data-source'

  import { IconSearch, IconRefresh } from '@/icons'
  import FieldGrid from '../components/FieldGrid.vue'
  // import { comInjectionKey, sourcePanelInjectionKey, sourceDrawerInjectionKey } from '../config'
  import { useDebugStore } from '@/store/modules/debug'
  import { useApiStore } from '@/store/modules/api'
  import { AbstractvComponent } from '@/components/componentFactory'
  import { setComponentData } from '@/hooks/useDataCenter'

  const debugStore = useDebugStore()
  const apiStore = useApiStore()
  const visible = ref(false)
  const visiblePreview = ref(false)
  // const apiType = ApiType
  const datasources = Object.entries(createDataSources()).map(([value, label]) => ({
    value,
    label,
  }))

  const FilterPanel = loadAsyncComponent(() => import('../../FilterManger/FilterPanel.vue'))

  const open = () => {
    visible.value = true
  }

  defineExpose({ open })

  const component = inject('component') as ComputedRef<AbstractvComponent>
  const { apiName, apiConfig, apiDataConfig } = inject('sourcePanel') as any

  const dataStatus = computed(() => {
    const data = debugStore.dataStatusMap[component.value.id]
    // @ts-ignore
    return data ? data?.[apiName] ?? {} : {}
  })

  const dataOrign = computed(() => {
    const comData = debugStore.originMap[component.value.id]
    // @ts-ignore
    return comData ? comData[apiName] : ''
  })

  const changeSource = (val: ApiType) => {
    switch (val) {
      case ApiType.api:
        createDataConfigForApi(apiDataConfig.value.config)
        break
      default:
        break
    }
  }

  const resData = computed(() => {
    const data = apiStore.dataMap[component.value.id]
    // @ts-ignore
    return data ? data[apiName] : ''
  })

  const refreshData = async () => {
    await setComponentData(component.value.id, apiName, apiConfig.value, apiDataConfig.value)
  }

  provide('sourceDrawer', {
    dataStatus,
    refreshData,
  })
</script>

<style lang="scss">
  @import './source-drawer.scss';
</style>
