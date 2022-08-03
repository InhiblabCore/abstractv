import { nanoid } from 'nanoid'
import { getVisualizeComponent } from './config/componentConfig'

export const generateId = (name: string) => {
  return `${name}_${nanoid()}`
}
export enum ComType {
  com = 'com',
  subCom = 'subCom',
  layer = 'layer',
}

export type ComponentAttr = {
  x: number
  y: number
  w: number
  h: number
  deg: number
  opacity: number
  filpV: boolean
  filpH: boolean
  zIndex: number
}

export abstract class AbstractvComponent {
  id: string
  readonly name: string
  readonly type: ComType

  alias: string
  icon: string
  img: string
  layer: string

  locked = false
  hided = false

  // 以下几个状态可以不进行持久化，为了操作方便在此声明
  selected = false
  hovered = false
  renameing = false

  attr: ComponentAttr = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    deg: 0,
    opacity: 1,
    filpV: false,
    filpH: false,
    zIndex: 0,
  }

  projectId = 0
  parentId?: string
  // children: DatavComponent[] | null = null

  abstract config: Record<string, any>

  abstract apis: Partial<any>
  abstract apiData: Partial<any>

  /**
   * 事件
   */
  abstract events: Record<string, any>

  /**
   * 动作
   */
  abstract actions: Record<string, any>

  constructor(name: string, attr: Partial<ComponentAttr>, type = ComType.com) {
    this.id = generateId(name)
    this.name = `V${name}`
    this.type = type

    const obj = getVisualizeComponent(this.name)!
    this.alias = obj.component!.alias
    this.icon = obj.componentsCategory.icon
    this.img = obj.component!.img
    // @ts-ignore
    this.layer = obj.component!.layer

    this.attr = { ...this.attr, ...attr }
  }

  /**
   * 初始化数据
   */
  abstract initData(): this

  /**
   * 将静态数据和配置分离 减少 bundle size
   */
  abstract loadData(): Promise<void>
}

// series基本配置
export abstract class AbstractvChartSeries {
  readonly type: string
  id: string
  name: string

  constructor(type: string, name: string) {
    this.type = type
    this.id = generateId(name)
    this.name = name
  }
}

export abstract class AbstractvEChartsComponent extends AbstractvComponent {
  abstract config: Record<string, any> & {
    legend?: Record<string, any>
    tooltip?: Record<string, any>
    series: AbstractvChartSeries | AbstractvChartSeries[]
    animation: {
      enabled: boolean
      duration?: number
      easing?: string
      delay?: number
      threshold?: number
      durationUpdate?: number
      easingUpdate?: string
      delayUpdate?: number
    }
  }
}
