import { loadAsyncComponent } from '@/utils/async-component'
import type { App } from 'vue'

import BasicBar from './src/index.vue'
import { SFCWithInstall } from '@/types/types'

BasicBar.install = (app: App): void => {
  app.component('VBasicBar', BasicBar)
  app.component(
    'VBasicBarProp',
    loadAsyncComponent(() => import('./src/config.vue')),
  )
}

export default BasicBar as SFCWithInstall<typeof BasicBar>
