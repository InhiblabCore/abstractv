<template>
  <div class="data-center-panel">
    <config-title :com-name="component.name" :com-alias="component.alias" />
    <div class="scroll-container">
      <template v-if="dataKeys.length > 0">
        <source-panel
          v-for="dk in dataKeys"
          :key="dk"
          :api-name="dk"
          :api-config="{}"
          :active-name="activeName"
          :collapse="dataKeys.length > 1"
        />
      </template>
      <empty-panel v-else content="该组件不需要配置数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { AbstractvComponent } from '@/components/componentFactory'
  import { ComputedRef } from 'vue'
  import ConfigTitle from '../components/ConfigTitle.vue'
  import EmptyPanel from '../components/EmptyPanel.vue'
  import SourcePanel from './SourcePanel.vue'

  const component = inject('component') as ComputedRef<AbstractvComponent>

  const dataKeys = computed(() => {
    return Object.keys(component.value?.apis ?? {})
  })

  const activeName = ref(dataKeys.value[0])
</script>

<style lang="scss" scoped>
  .data-center-panel {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .scroll-container {
    position: absolute;
    top: 60px;
    bottom: 60px;
    width: 100%;
    padding-bottom: 60px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
