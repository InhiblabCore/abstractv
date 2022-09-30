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
  editMode: boolean
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
  // componentActions: {
  //   id: AbstractvComponent['id']
  //   action: 'move' | 'create' | 'delete' | 'rotate' | 'zoom'
  //   attr: AbstractvComponent['attr']
  // }[]
}

export const useEditorComStore = defineStore('editor-com', {
  state: (): EditorType => {
    return {
      editMode: false,
      componentsListDate: [],
      subComponents: [],
      // componentActions: [],
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
    /**
     * @description 获取保存的组件列表
     * @returns {*} {AbstractvComponent[]}
     */
    getComponentsListDate(): AbstractvComponent[] {
      return this.componentsListDate
    },

    /**
     * @description 设置组件的层级
     * @returns {*}  {number}
     */
    setComponentZindex(): number {
      return this.componentsListDate.length
    },

    /**
     * @description 获取选中的组件
     * @returns {*}  {(AbstractvComponent | undefined)}
     */
    getSelectComponent(): AbstractvComponent | undefined {
      return this.componentsListDate.find((com) => com.selected === true)
    },

    /**
     * @description 获取画布的缩放值
     * @returns {*}  {number}
     */
    getCanvasScale(): number {
      return this.canvas.scale
    },

    /**
     * @description 获取画布宽度
     * @returns {*}  {number}
     */
    getCanvasWidth(): number {
      return this.canvas.width
    },

    /**
     * @description 获取画布高度
     * @returns {*}  {number}
     */
    getCanvasHeight(): number {
      return this.canvas.height
    },
  },
  actions: {
    /**
     * @description 修改模式
     */
    setEditMode() {
      this.editMode = true
    },

    /**
     * @description 添加组件
     * @param  {AbstractvComponent} component 组件实例
     */
    addComponent(component: AbstractvComponent) {
      this.componentsListDate.push(component)
    },

    /**
     * @description 获取组件
     * @param  {string} id 组件ID
     */
    getComponent(id: string) {
      return this.componentsListDate.find((com) => com.id === id)
    },

    /**
     * @description 根据ID选中的组件
     * @param  {string} id 组件ID
     */
    selectComponentActive(id: string) {
      this.componentsListDate.forEach((com) => {
        if (com.id === id) com.selected = true
        else com.selected = false
        com.hovered = false
      })
    },

    /**
     * @description 设置组件锁定状态
     * @param {string} id 组件ID
     * @param {boolean} locked 组件锁定的状态 true/false
     */
    setComponentLocked(id: string, locked: boolean) {
      this.getComponent(id)!.locked = locked
    },

    /**
     * @description 设置组件隐藏状态
     * @param {string} id 组件ID
     * @param {boolean} hided 组件隐藏的状态 true/false
     */
    setComponentHided(id: string, hided: boolean) {
      this.getComponent(id)!.hided = hided
    },

    /**
     * @description 设置组件悬停状态
     * @param {string} id 组件ID
     * @param {boolean} hover 组件悬停的状态 true/false
     */
    setComponentHover(hover: boolean, id: string) {
      if (this.getComponent(id)?.hovered === hover) return
      else this.getComponent(id)!.hovered = hover
    },

    /**
     * @description 组件层级移动
     * @param {{ id: string; moveType: MoveType }} { id: 组件ID, moveType: 移动类型 }
     */
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

    /**
     * @description 复制组件
     * @param {string} id 组件ID
     */
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

    /**
     * @description
     * @param {string} id 组件ID
     * @param {string} type 组件类型（图表组件和其他组件）
     */
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

    /**
     * @description 设置canvas画布的缩放
     * @param {number} scale 缩放值
     */
    setCanvasScale(scale: number) {
      this.canvas.scale = scale === 0 ? this.minCanvasScale : scale
    },

    /**
     * @description 设置canvas画布的高
     * @param {number} height 画布高度
     */
    setCanvasHeight(height: number) {
      this.canvas.height = height
    },

    /**
     * @description 设置canvas画布的宽
     * @param {number} width 画布宽度
     */
    setCanvasWidth(width: number) {
      this.canvas.width = width
    },

    /**
     * @description 对齐线
     * @param {AbstractvComponent} component 组件
     */
    calcAlignLine(component: AbstractvComponent) {
      if (!this.alignLine.enable) {
        return
      }
      const attr = calcIntersectingLines(component, this.componentsListDate, this.canvas.scale)
      this.alignLine = { ...this.alignLine, ...attr, show: true }
    },

    /**
     * @description 隐藏对齐线
     * @param {AbstractvComponent} component 组件
     */
    hideAlignLine(component: AbstractvComponent) {
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
