<template>
  <li :title="alias" ref="dragRef" :draggable="used" class="components-item double">
    <div class="components-item-text">{{ alias }}</div>
    <div class="components-item-img" :style="`background-image: url(${img});`"></div>
  </li>
</template>

<script lang="ts" setup>
  import { useDrag } from 'vue3-hooks-plus'
  const props = defineProps<{
    component: {
      name: string
      alias: string
      img: string
      layer: string
      used: boolean
    }
  }>()
  const dragRef = ref(null)
  const { alias, used, name, img } = toRefs(props.component)

  useDrag(name.value, dragRef, {
    draggable: used.value,
  })
</script>
