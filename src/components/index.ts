import { VBasicBar } from './material'

import type { App } from 'vue'

const components = [VBasicBar]

const install = (app: App): void => {
  components.forEach((component) => {
    app.use(component)
  })
}

export default {
  install,
}
