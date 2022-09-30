<template>
  <div
    :class="[
      'api-editor',
      {
        '--disable-fold': !collapse,
        '--fold': collapse && visible,
      },
    ]"
  >
    <div class="api-editor-title">
      <div class="api-desc ellipsis2">
        <n-icon v-if="collapse" class="api-fold-icon">
          <IconArrowRight />
        </n-icon>
        {{ apiConfig.description || '数据接口' }}
      </div>
      <div class="api-status success">
        <display-api-status :status="totalStatus" success-text="配置完成" />
      </div>
    </div>
    <div v-show="visible" class="attr-source-wp">
      <div class="data-attr-table-container">
        <table class="data-attr-table">
          <thead class="table-head">
            <tr class="table-head-row">
              <th class="th-item column-item attr-name"> 字段 </th>
              <th class="th-item column-item attr-value"> 映射 </th>
              <th class="th-item column-item attr-status"> 状态 </th>
            </tr>
          </thead>
          <tbody class="table-body">
            <template v-if="Object.keys(apiConfig.fields).length > 0">
              <tr v-for="(fc, fn) in apiConfig.fields" :key="fn" class="table-body-row">
                <td class="column-item attr-name">
                  <n-tooltip placement="left">
                    <template #trigger>
                      <span class="ellipsis2">{{ fn }}</span>
                    </template>
                    {{ fc.description }}
                  </n-tooltip>
                </td>
                <td class="column-item attr-value">
                  <new-input
                    :model-value="fc.map"
                    placeholder="可自定义"
                    class="attr-input"
                    @change="fc.map = $event"
                  />
                </td>
                <td class="column-item attr-status">
                  <display-api-status :status="fieldsStatus?.[fn]" :optional="fc.optional" />
                </td>
              </tr>
            </template>
            <tr v-else class="table-body-row">
              <td class="column-item attr-name">
                <span>任意</span>
              </td>
              <td class="column-item attr-value"></td>
              <td class="column-item attr-status">
                <display-api-status status="completed" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="data-source">
        <div class="data-result-title"> 数据响应结果 </div>
        <div class="auto-update-config">
          <n-checkbox v-model:checked="apiConfig.useAutoUpdate" class="auto-update-checkbox">
            自动更新选项
          </n-checkbox>

          <new-input
            :model-value="apiConfig.autoUpdate"
            type="number"
            :disabled="!apiConfig.useAutoUpdate"
            class="update-interval-input"
            @change="apiConfig.autoUpdate = $event"
          />
          秒一次
        </div>
        <div class="data-flow-wp">
          <div class="ds-line">
            <div class="ds-title">
              <span class="ds-type-text">{{ datasources[apiDataConfig.type] }}</span>
            </div>
            <n-button size="tiny" class="ds-action-btn" @click="openSourceDrawer">
              配置数据源
            </n-button>
          </div>
          <div class="ds-line mt5">
            <span>数据响应结果 ( 只读 ) </span>
            <n-tooltip placement="left">
              <template #trigger>
                <n-icon class="refresh-btn" @click="refreshData">
                  <IconRefresh />
                </n-icon>
              </template>
              刷新数据
            </n-tooltip>
          </div>
          <div class="ds-dots">
            <span class="ds-dot" :class="[totalStatus === 'completed' ? 'active' : 'error']"></span>
            <span class="ds-dot active"></span>
            <span class="ds-dot"></span>
          </div>
        </div>
        <div class="data-response">
          <g-monaco-editor
            language="json"
            :read-only="true"
            :auto-format="true"
            :code="datav_data"
            :height="250"
            full-screen-title="数据响应结果"
          />
        </div>
      </div>
    </div>
    <source-drawer ref="sourceDrawerRef" />
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, ComputedRef, ref } from 'vue'
  import {
    ApiConfig,
    ApiDataConfig,
    FieldStatus,
    ApiStatus,
    createDataSources,
  } from '@/components/dataSource/data-source'

  import { IconArrowRight, IconRefresh } from '@/icons'
  import DisplayApiStatus from '../components/DisplayApiStatus.vue'
  import SourceDrawer from './SourceDrawer.vue'
  import { AbstractvComponent } from '@/components/componentFactory'
  import { useDebugStore } from '@/store/modules/debug'
  import { setComponentData } from '@/hooks/useDataCenter'

  const props = defineProps<{
    collapse: boolean
    apiName: string
    activeName: string
    apiConfig: {}
  }>()

  const debugStore = useDebugStore()
  const component = inject('component') as ComputedRef<AbstractvComponent>
  const sourceDrawerRef = ref<any>(null)
  const visible = computed(() => props.apiName === props.activeName)
  const apiConfig = computed((): ApiConfig => component.value.apis[props.apiName])
  const apiDataConfig = computed((): ApiDataConfig => component.value?.apiData?.[props.apiName])

  const datasources = createDataSources()

  provide('sourcePanel', {
    apiName: props.apiName,
    apiConfig,
    apiDataConfig,
  })

  const fieldsStatus = computed(() => {
    const comFields = debugStore.fieldStatusMap[component.value.id]
    return comFields ? comFields[props.apiName as keyof typeof comFields] : {}
  })

  const totalStatus = computed(() => {
    const list = Object.values(fieldsStatus.value as any)
    if (list.includes(FieldStatus.loading)) {
      return ApiStatus.loading
    }

    if (list.includes(FieldStatus.failed)) {
      return ApiStatus.incomplete
    }

    return ApiStatus.completed
  })

  const datav_data = computed(() => {
    const comData = apiDataConfig.value.config.data ?? ''
    return comData
  })

  const refreshData = () => {
    setComponentData(
      component.value.id,
      props.apiName as string extends 'source' ? 'source' : any,
      apiConfig.value,
      apiDataConfig.value,
    )
  }
  const openSourceDrawer = () => {
    sourceDrawerRef.value?.open()
  }
</script>

<style lang="scss" scoped>
  @import './source-panel.scss';
</style>
