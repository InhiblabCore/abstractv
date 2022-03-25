import { AbstractvComponent, ComType, generateId } from '@/components/componentFactory'
import { MoveType } from '@/utils/enums'
import { calcIntersectingLines } from '@/utils/intersecting-line-util'
import { defineStore } from 'pinia'
import _ from 'lodash-es'
import { nanoid } from 'nanoid'

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
  componentsListDate: AbstractvComponent[]
  minCanvasScale: number
  canvas: {
    scale: number
    width: number
    height: number
  }
  page: {
    width: number
    height: number
    bgcolor: string
  }
  alignLine: AlignLine
  contextMenu: {
    show: boolean
  }
  subComponents: AbstractvComponent[]
}

export const useEditorComStore = defineStore('editor-com', {
  state: (): EditorType => {
    return {
      componentsListDate: [],
      subComponents: [],
      canvas: {
        scale: 0.2,
        width: 1920,
        height: 1080,
      },
      page: {
        width: 1920,
        height: 1080,
        bgcolor: 'rgba(255,255,255,0)',
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
      contextMenu: {
        show: false,
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
    getSelectComponent(): any {
      return this.componentsListDate.find((com) => com.selected === true)
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
    // component
    addComponent(component: any) {
      this.componentsListDate.push(component)
    },
    getComponent(id: string) {
      return this.componentsListDate.find((com) => com.id === id)
    },

    selectComponentActive(id: string) {
      this.componentsListDate.forEach((com) => {
        if (com.id === id) com.selected = true
        else com.selected = false
        com.hovered = false
      })
    },
    setComponentLocked(id: string, locked: boolean) {
      this.getComponent(id)!.locked = locked
    },
    setComponentHided(id: string, hided: boolean) {
      this.getComponent(id)!.hided = hided
    },
    setComponentHover(hover: boolean, id: string) {
      if (this.getComponent(id)?.hovered === hover) return
      else this.getComponent(id)!.hovered = hover
    },
    moveComponent({ id, moveType }: { id: string; moveType: MoveType }) {
      const i = this.componentsListDate.findIndex((com) => com.id === id)
      if (moveType === MoveType.up) {
        if (i + 1 < this.componentsListDate.length) {
          this.componentsListDate.splice(i + 1, 0, ...this.componentsListDate.splice(i, 1))
        }
      } else if (moveType === MoveType.down) {
        if (i > 0) {
          this.componentsListDate.splice(i - 1, 0, ...this.componentsListDate.splice(i, 1))
        }
      } else if (moveType === MoveType.top) {
        if (i + 1 < this.componentsListDate.length) {
          this.componentsListDate.push(...this.componentsListDate.splice(i, 1))
        }
      } else if (moveType === MoveType.bottom) {
        if (i > 0) {
          this.componentsListDate.unshift(...this.componentsListDate.splice(i, 1))
        }
      }
    },

    copyComponent(id: string) {
      const component = this.getComponent(id)
      const copyCom = _.clone(component)
      if (component && copyCom) {
        copyCom.id = generateId(component.name)
        copyCom.alias += '_copy'
        copyCom.attr.x += 30
        copyCom.attr.y += 30

        copyCom.hovered = false
        copyCom.selected = false
        copyCom.renameing = false

        for (const key in copyCom.apiData) {
          copyCom.apiData[key].id = nanoid()
          copyCom.apiData[key].comId = copyCom.id
        }

        this.addComponent(copyCom)
        this.selectComponentActive(copyCom.id)
      }
    },

    deleteComponent(id: string, type: string) {
      if (type === ComType.com) {
        this.componentsListDate.splice(
          this.componentsListDate.findIndex((com) => com.id === id),
          1,
        )
      } else {
        this.subComponents.splice(
          this.subComponents.findIndex((com) => com.id === id),
          1,
        )
      }
    },

    // canvas
    setCanvasScale(scale: number) {
      this.canvas.scale = scale === 0 ? this.minCanvasScale : scale
    },
    setCanvasHeight(height: number) {
      this.canvas.height = height
    },
    setCanvasWidth(width: number) {
      this.canvas.width = width
    },

    // 对齐线
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
