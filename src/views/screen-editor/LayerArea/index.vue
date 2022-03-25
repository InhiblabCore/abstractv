<template>
  <div :class="['g-aside layer-panel-wp', { '--hide': !visiblePanel }]">
    <div class="layer-manager">
      <div class="layer-manager-top">
        <div class="layer-num">图层</div>
        <div class="layer-layout">
          <n-icon
            title="缩略图版"
            class="btn-icon"
            :class="{ selected: !showText }"
            @click="showText = false"
          >
            <IconViewGrid />
          </n-icon>
          <n-icon
            title="文字版"
            class="btn-icon"
            :class="{ selected: showText }"
            @click="showText = true"
          >
            <IconViewList />
          </n-icon>
          <n-icon title="收起" class="btn-icon" @click="changeVisible">
            <IconBack />
          </n-icon>
        </div>
      </div>
      <div class="layer-toolbar layer-toolbar-top">
        <n-icon
          title="上移一层"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveUp"
        >
          <IconMoveUp />
        </n-icon>
        <n-icon
          title="下移一层"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveDown"
        >
          <IconMoveDown />
        </n-icon>
        <n-icon
          title="置顶"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveTop"
        >
          <IconMoveTop />
        </n-icon>
        <n-icon
          title="置底"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveBottom"
        >
          <IconMoveBottom />
        </n-icon>
      </div>
      <div class="layer-manager-wrap">
        <template v-for="com in components" :key="com.id">
          <div
            v-if="showText"
            :title="com.alias"
            class="layer-manager-item"
            :class="[
              {
                hided: com.hided,
                locked: com.locked,
                hovered: com.hovered,
                selected: com.selected,
              },
            ]"
            @mousedown="selectComponent(com.id)"
            @mouseenter="com.hovered = true"
            @mouseleave="com.hovered = false"
            @contextmenu="showMenu"
          >
            <g-com-icon :icon="com.icon" />
            <input
              v-if="com.renameing"
              v-model.trim="com.alias"
              v-focus
              class="layer-item-input"
              @blur="com.renameing = false"
              @keydown.enter="com.renameing = false"
            />
            <span v-else class="layer-item-span">
              <span class="layer-item-text">{{ com.alias }}</span>
            </span>
            <n-icon v-if="com.hided" class="show-toggle-btn" @click="com.hided = false">
              <IconHide />
            </n-icon>
            <n-icon v-if="com.locked" class="show-toggle-btn" @click="com.locked = false">
              <IconLock />
            </n-icon>
          </div>
          <div
            v-else
            :title="com.alias"
            class="layer-manager-item thumbail-wrap"
            :class="[
              {
                hided: com.hided,
                locked: com.locked,
                hovered: com.hovered,
                selected: com.selected,
              },
            ]"
            @mousedown="selectComponent(com.id)"
            @mouseenter="com.hovered = true"
            @mouseleave="com.hovered = false"
            @contextmenu="showMenu"
          >
            <div
              class="layer-item-thumbail"
              :alt="com.alias"
              :style="`background-image: url(${com.img})`"
            >
            </div>
            <div class="layer-manager-thumbail">
              <input
                v-if="com.renameing"
                v-model.trim="com.alias"
                v-focus
                class="layer-item-input"
                @blur="com.renameing = false"
                @keydown.enter="com.renameing = false"
              />
              <span v-else class="layer-item-span">
                <span class="layer-item-text">{{ com.alias }}</span>
              </span>
            </div>
            <div class="layer-thumbail-item">
              <n-icon v-if="com.hided" class="show-toggle-btn" @click="com.hided = false">
                <IconHide />
              </n-icon>
              <n-icon v-if="com.locked" class="show-toggle-btn" @click="com.locked = false">
                <IconLock />
              </n-icon>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useEditorComStore } from '@/store/modules/editorCom'
  import { useToolStore } from '@/store/modules/tool'
  import _ from 'lodash-es'
  import {
    IconViewList,
    IconViewGrid,
    IconBack,
    IconMoveUp,
    IconMoveDown,
    IconMoveTop,
    IconMoveBottom,
    IconLock,
    IconHide,
  } from '@/icons'
  import { useContextMenu } from '@/hooks/useContextMenu'
  import { MoveType } from '@/utils/enums'

  const toolStore = useToolStore()
  const editorComStore = useEditorComStore()
  const { showMenu, selectedCom } = useContextMenu()
  const showText = ref(false)

  const components = computed(() => {
    return (_.clone(editorComStore.getComponentsListDate) as any[]).reverse()
  })
  const visiblePanel = computed(() => toolStore.getLayerShow)

  const enableBtnClass = computed(() => !!selectedCom.value)
  const enableBtnStyle = computed(() => {
    return {
      opacity: selectedCom.value ? 1 : 0.3,
    }
  })
  const moveCom = (moveType: MoveType) => {
    if (selectedCom.value) {
      editorComStore.moveComponent({ id: selectedCom.value.id, moveType })
    }
  }

  const moveUp = () => moveCom(MoveType.up)
  const moveDown = () => moveCom(MoveType.down)
  const moveTop = () => moveCom(MoveType.top)
  const moveBottom = () => moveCom(MoveType.bottom)

  const changeVisible = () => {
    toolStore.layer.show = !visiblePanel.value
  }

  const selectComponent = (id: string) => {
    editorComStore.selectComponentActive(id)
  }
</script>

<style scoped lang="scss">
  @import './style';
</style>
