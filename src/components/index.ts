import { VBasicBar, VBasicLine } from './material'

import type { App } from 'vue'

const components = [VBasicBar, VBasicLine]

const install = (app: App): void => {
  components.forEach((component) => {
    app.use(component)
  })
}

export default {
  install,
}
