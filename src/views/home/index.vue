<template>
  <div class="abstractv">
    <nav-header :is-fixed="isFixed" />
    <nav-main
      ref="navMainRef"
      :navs="navs"
      :style="{ background: isFixed ? 'var(--abstractv-body-bg)' : '' }"
      @change="onNavChange"
    />
    <div class="nav-shadow"></div>
    <div class="abstractv-main">
      <div class="abstractv-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Home',
  }
</script>

<script lang="ts" setup>
  import NavHeader from './nav-header.vue'
  import NavMain from './nav-main.vue'
  import { useEventListener } from 'vue3-hooks-plus'

  const navMainRef = ref<HTMLDivElement | null>(null)
  const isFixed = ref(false)
  const navs = ref([
    { id: 0, key: 'Workstation', name: '我的可视化' },
    { id: 1, key: 'MyData', name: '我的数据' },
    { id: 2, key: 'MyComponents', name: '我的组件' },
    { id: 3, key: 'MyCase', name: '教程' },
  ])

  const router = useRouter()
  const onNavChange = (nav: { key: any }) => {
    console.log(nav)

    router.push({ name: nav.key })
  }

  const scroll = () => {
    if (navMainRef?.value) isFixed.value = navMainRef?.value?.offsetTop > 200
  }
  useEventListener('scroll', () => {
    scroll?.()
  })
</script>

<style scoped lang="scss">
  .abstractv {
    .nav-shadow {
      background: linear-gradient(180deg, transparent, var(--abstractv-body-bg));
      height: 50px;
      position: relative;
      width: 100%;
      z-index: 1;
    }
    .abstractv-main {
      user-select: none;

      .abstractv-content {
        position: relative;
        color: var(--abstractv-body-bg);
      }
    }
  }
</style>
