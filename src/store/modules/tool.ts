import { defineStore } from 'pinia'

type ToolType = {
  layer: {
    show: boolean
  }
  components: {
    show: boolean
  }
  config: {
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
      config: {
        show: false,
      },
      loading: 300,
    }
  },
  getters: {
    /**
     * @description 获取图层工具是否显示
     * @returns {*}  {boolean}
     */
    getLayerShow(): boolean {
      return this.layer.show
    },

    /**
     * @description 获取组件工具是否显示
     * @returns {*}  {boolean}
     */
    getComponentsShow(): boolean {
      return this.components.show
    },

    /**
     * @description 获取加载是否显示
     * @returns {*}  {boolean}
     */
    getLoading(): number {
      return this.loading
    },
    /**
     * @description 获取配置工具是否显示
     * @returns {*}  {boolean}
     */
    getConfigShow(): boolean {
      return this.config.show
    },
  },
  actions: {},
})
