import { defineStore } from 'pinia'

type ToolType = {
  layer: {
    show: boolean
  }
  components: {
    show: boolean
  }

  loading: number
}

export const useToolStore = defineStore('tool', {
  state: (): ToolType => {
    return {
      layer: {
        show: false,
      },
      components: {
        show: true,
      },
      loading: 300,
    }
  },
  getters: {
    getLayerShow(): boolean {
      return this.layer.show
    },
    getComponentsShow(): boolean {
      return this.components.show
    },
    getLoading(): number {
      return this.loading
    },
  },
  actions: {},
})
