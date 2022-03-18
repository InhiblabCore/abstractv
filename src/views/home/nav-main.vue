<template>
  <div class="nav-main">
    <canvas id="nav-canvas" style="position: absolute; z-index: -1; left: 0"></canvas>
    <span v-for="nav in navs" :key="nav.id" class="nav-span">
      <a class="nav-link" :class="{ 'nav-active': activeNav === nav.id }" @click="toggleNav(nav)">
        <n-icon class="nav-icon" :size="20">
          <IconLayer v-if="nav.key === 'Workstation'" />
          <IconMyData v-else-if="nav.key === 'MyData'" />
          <IconMyCom v-else-if="nav.key === 'MyComponents'" />
          <IconTutorial v-else-if="nav.key === 'MyCase'" />
        </n-icon>
        {{ nav.name }}
      </a>
    </span>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NavMain',
  }
</script>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useRoute } from 'vue-router'
  import { IconLayer, IconMyData, IconMyCom, IconTutorial } from '@/icons'
  import { NavCanvas } from './nav-canvas'
  import { useEventListener, useDebounceFn } from 'vue3-hooks-plus'

  type NavDataType = {
    id: number
    key: string
    name: string
  }

  const route = useRoute()
  const activeNav = ref(0)
  let nc: NavCanvas | null = null

  const props = defineProps({
    navs: {
      type: Array as PropType<NavDataType[]>,
      required: true,
    },
  })
  const emit = defineEmits(['change'])

  const { run: runDebounceFn } = useDebounceFn(
    () => {
      if (nc) {
        nc.resize()
      }
    },
    {
      wait: 500,
    },
  )
  useEventListener('resize', () => {
    runDebounceFn()
  })

  const toggleNav = (nav: NavDataType) => {
    if (nc) {
      activeNav.value = nav.id
      nc.toggle(nav.id)
      emit('change', nav)
    }
  }

  onMounted(() => {
    const nav = props.navs.find((m) => m.key === route.name)
    activeNav.value = nav ? nav.id : 0
    nc = new NavCanvas('nav-canvas', '.nav-main .nav-span', activeNav.value)
  })
</script>

<style lang="scss" scoped>
  .nav-main {
    z-index: 10;
    display: flex;
    top: 30px;
    position: sticky;
    width: 100%;
    margin-top: 200px;
    min-width: 1024px;
    user-select: none;

    .nav-span {
      .nav-link {
        display: flex;
        align-items: center;
        transition: color 0.2s;
        text-decoration: none !important;
        color: #b9c2cc;
        width: auto;
        min-width: 140px;
        line-height: 40px;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
        padding: 0 40px;

        &.nav-active,
        &:hover {
          color: #fff !important;
        }
      }

      .nav-icon {
        margin-right: 5px;
      }
    }
  }
</style>
