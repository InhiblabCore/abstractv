import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import AsyncLoading from '@/components/ui/loading/src/async-loading.vue'

/**
 * @description 异步加载组件
 * @param {AsyncComponentLoader<any>} loader
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 20,
  })
