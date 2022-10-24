import { loadAsyncComponent } from '@/utils/async-component'
import type { App } from 'vue'

import BasicLine from './src/index.vue'
import { SFCWithInstall } from '@/types/types'

BasicLine.install = (app: App): void => {
  app.component('VBasicLine', BasicLine)
  app.component(
    'VBasicLineProp',
    loadAsyncComponent(() => import('./src/config.vue')),
  )
}

export default BasicLine as SFCWithInstall<typeof BasicLine>
