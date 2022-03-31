<template>
  <div :class="['g-aside component-panel-wp', { '--hide': !visiblePanel }]">
    <div class="components-panel">
      <div class="components-panel-wrapper">
        <el-tabs tab-position="left">
          <el-tab-pane v-for="cate in visualizeListComponents" :key="cate.type">
            <template #label>
              <n-tooltip placement="left" :delay="500">
                <template #trigger>
                  <div>
                    <g-com-icon :icon="cate.icon" class="com-tab-icon" />
                    <span class="com-tab-title">{{ cate.name }}</span>
                  </div>
                </template>
                {{ cate.name }}
              </n-tooltip>
            </template>

            <el-tabs tab-position="left" class="el-tabs-l2">
              <el-tab-pane v-for="subcate in cate.data" :key="subcate.type">
                <template #label>
                  <span class="com-tab-title">{{ subcate.name }}</span>
                </template>
                <div class="components-single-menu-wp">
                  <div class="components-single-menu">
                    <ul class="components-single-menu-list">
                      <MaterialItem v-for="com in subcate.data" :key="com.name" :component="com" />
                      <!-- <li
                        v-for="com in subcate.data"
                        :key="com.name"
                        :title="com.alias"
                        :draggable="com.used"
                        class="components-item double"
                        ref="dragRef"
                        @dragstart="dragStart($event, com.name)"
                      >
                        <div class="components-item-text">{{ com.alias }}</div>
                        <div
                          class="components-item-img"
                          :style="`background-image: url(${com.img});`"
                        ></div>
                      </li> -->
                    </ul>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'element-plus/es/components/tabs/style/css'
  import 'element-plus/es/components/tab-pane/style/css'
  import { ElTabs, ElTabPane } from 'element-plus'
  import { useToolStore } from '@/store/modules/tool'
  import { visualizeListComponents } from '@/components/config/componentConfig'

  import MaterialItem from './MaterialItem.vue'

  // import { useDrag } from 'vue3-hooks-plus'

  const toolStore = useToolStore()

  const visiblePanel = computed(() => toolStore.getComponentsShow)
</script>
<style lang="scss">
  @import './style';
  @import './tabs';
</style>
