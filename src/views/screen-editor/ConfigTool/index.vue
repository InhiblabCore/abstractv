<template>
  <div :class="['g-aside config-panel-wp', { '--hide': !visiblePanel }]">
    <PageConfig v-if="!selectedComponent" />
    <div v-else class="config-manager">
      <n-tabs type="card" display-directive="show:lazy">
        <n-tab-pane name="config">
          <template #tab>
            <n-tooltip :delay="500">
              <template #trigger>
                <n-icon>
                  <IconSetting />
                </n-icon>
              </template>
              配置
            </n-tooltip>
          </template>
          <!-- <setting-panel :key="selectedComponent.id" /> -->
        </n-tab-pane>
        <n-tab-pane name="data" display-directive="show:lazy">
          <template #tab>
            <n-tooltip :delay="500">
              <template #trigger>
                <n-icon>
                  <IconCloud />
                </n-icon>
              </template>
              数据
            </n-tooltip>
          </template>
          <!-- <data-center-panel :key="selectedComponent.id" /> -->
        </n-tab-pane>
        <n-tab-pane name="interaction" display-directive="show:lazy">
          <template #tab>
            <n-tooltip :delay="500">
              <template #trigger>
                <n-icon>
                  <IconInteract />
                </n-icon>
              </template>
              交互
            </n-tooltip>
          </template>
          <!-- <interaction-panel :key="selectedComponent.id" /> -->
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useEditorComStore } from '@/store/modules/editorCom'
  import { useToolStore } from '@/store/modules/tool'
  import { IconSetting, IconCloud, IconInteract } from '@/icons'

  import PageConfig from './PageConfig.vue'

  const toolStore = useToolStore()
  const editorStore = useEditorComStore()
  const visiblePanel = computed(() => toolStore.getConfigShow)
  console.log(visiblePanel)
  console.log(666)

  const selectedComponent = computed(() => editorStore.getSelectComponent)

  watch(selectedComponent, (c) => {
    console.log(c)
  })
</script>

<style scoped lang="scss">
  $panel_width: 332px;

  .config-panel-wp {
    position: relative;
    z-index: 90;
    width: $panel_width !important;
    height: 100%;
    overflow: hidden;
    background: var(--datav-config-bg);
    box-shadow: -1px 0 #000;
    transition: width 0.25s ease-in-out;
  }

  .config-manager {
    width: $panel_width;
    height: 100%;
    background: var(--datav-left-nav-bg);
    transition: 0.25s ease-in-out;
    user-select: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .config-panel-wp.--hide {
    width: 0 !important;

    .config-manager {
      transform: translateX(-100%);
    }
  }
</style>
