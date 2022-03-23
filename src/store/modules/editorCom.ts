import { calcIntersectingLines } from '@/utils/intersecting-line-util'
import { defineStore } from 'pinia'

export type AlignLine = {
  top: number
  bottom: number
  left: number
  right: number
  vertical: number
  horizontal: number
  enable: boolean
  show: boolean
}
type EditorType = {
  componentsListDate: any[]
  minCanvasScale: number
  canvas: {
    scale: number
    width: number
    height: number
  }
  page: {
    width: number
    height: number
  }
  alignLine: AlignLine
}

export const useEditorComStore = defineStore('editor-com', {
  state: (): EditorType => {
    return {
      componentsListDate: [],
      canvas: {
        scale: 0.2,
        width: 1920,
        height: 1080,
      },
      page: {
        width: 1920,
        height: 1080,
      },
      minCanvasScale: 0.2,
      alignLine: {
        enable: true,
        show: true,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        vertical: 0,
        horizontal: 0,
      },
    }
  },
  getters: {
    getComponentsListDate(): any {
      return this.componentsListDate
    },
    getComponentZindex(): number {
      return this.componentsListDate.length
    },
    getCanvasScale(): number {
      return this.canvas.scale
    },
    getCanvasWidth(): number {
      return this.canvas.width
    },
    getCanvasHeight(): number {
      return this.canvas.height
    },
  },
  actions: {
    addComponent(component: any) {
      this.componentsListDate.push(component)
    },
    selectComponent(id: string) {
      return this.componentsListDate.find((com) => com.componentId === id)
    },

    selectComponentActive(id: string) {
      this.componentsListDate.forEach((com) => {
        if (com.componentId === id) com.selected = true
        else com.selected = false
        com.hovered = false
      })
    },
    setComponentSelect(component: any) {
      component.selected = true
    },
    cancelComponentSelect(id: string) {
      this.selectComponentActive(id)
    },

    setComponentHover(hover: boolean, id: string) {
      const component = this.selectComponent(id)
      component.hovered = hover
    },
    cancelComponentHover(hover: boolean, id: string) {
      const component = this.selectComponent(id)
      component.hovered = hover
    },

    setCanvasScale(scale: number) {
      this.canvas.scale = scale === 0 ? this.minCanvasScale : scale
    },
    setCanvasHeight(height: number) {
      this.canvas.height = height
    },
    setCanvasWidth(width: number) {
      this.canvas.width = width
    },

    calcAlignLine(component: any) {
      if (!this.alignLine.enable) {
        return
      }
      const attr = calcIntersectingLines(component, this.componentsListDate, this.canvas.scale)
      this.alignLine = { ...this.alignLine, ...attr, show: true }
    },
    hideAlignLine(component: any) {
      if (!this.alignLine.enable) {
        return
      }
      if (this.alignLine.enable && this.alignLine.show) {
        this.alignLine.show = false
        component.selected = true
        this.componentsListDate.forEach((com) => (com.hovered = false))
      }
    },
  },
})
