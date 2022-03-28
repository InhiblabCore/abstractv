# 开发操作原理

*需要多个组件间进行相互控制，因此需要一个持久化管理的工具 🔧 。 Pinia* 



- 在物料区域 MaterialArea 组件中，通过配置循环出左边tab组件区域，每个tabPanel挂载着`:draggable="com.used"` `  @dragstart="dragStart($event, com.name)"`的 draggable内置属性 开启拖拽 ， dragstart代表着事件，这里的事件传入了事件对象和组件的名称。`  ev.dataTransfer.setData('text', comName)` 通过 setData将名称绑定在event中。
- 在可视化画布区域 CanvasMain 组件中，通过从 store 中获取 `componentsListData` 循环出组件,通过  `v-[name]`  与 `component` 内置组件的结合使用，获取位置缩放等属性渲染出对应的组件。 画布区域绑定了  `@drop="dropToAddCom"` 用于监听从 MaterialArea 拖拽进来的组件，从 event 获取到 MaterialArea 设置进去的组件名 name , 然后调用组件工厂方法 `createComponent` 生成组件的所有配置项 `let component: AbstractvComponent = await createComponent(name)!`  然后设置组件的缩放以及自身的位置（鼠标到哪松手组件就渲染到哪个位置）。 通过 store 将组件 push 进入 `componentsListData` 中，然后 `compute` 计算 ` componentsListData ` 监听渲染出组件，回到👆步骤。
- ` @dragover="dragOver"` 需要消除drop事件。
- 画布组件
  - 组件的平移、缩放、旋转把它们的操作放在一个容器 ` CanvasContainer`  里面进行管理 容器暴露一个 slot 接收 component ,上述 	`componentsListData	` 循环 并且 传入props，容器获取到props 设置容器的位置，缩放等。
  - 容器组件被 select  、 locked  、 hover 三个属性控制 选中效果，锁定效果，悬浮效果
  - 点击右键显示上下文菜单，可以操作画布
- 配置区域 ` ConfigTool` 配置区域分为通用配置和组件配置，通用配置操作组件位置大小等基本属性，重点是组件自身的配置，需要注册组件配置项的字段填写组件，进行动态渲染  [v-name] 与 component 组件,下面进行详解。组件配置通过 父组件 provide 注入 ，子 inject获取的 component 对象，以props的形式 传入 component内置组件。组件内部，利用v-model的方式绑定每一个属性值，进行动态的改变。
- 编辑器其他工具执行的操作都是围绕着 `EditorStore` 状态管理的模块进行的，组件的所有状态都被存储起来，每一次的应用都是通过计算属性的方式响应式的应用到每一处地方。 



### EditorStore

```typescript
import { AbstractvComponent } from '@/components/componentFactory'
import { calcIntersectingLines } from '@/utils/intersecting-line-util'
import { defineStore } from 'pinia'

// 辅助对齐线类型
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

// 可视化编辑器类型
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
}

export const useEditorComStore = defineStore('editor-com', {
  state: (): EditorType => {
    return {
      // 组件list，保存着画布中的所有组件
      componentsListDate: [],
      
      // 画布属性
      canvas: {
        scale: 0.2,
        width: 1920,
        height: 1080,
      },
      
      // 页面属性
      page: {
        width: 1920,
        height: 1080,
        bgcolor: 'rgba(255,255,255,0)',
      },
      // 最小缩放
      minCanvasScale: 0.2,
      
      // 对齐线默认值
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
      // 上下文菜单
      contextMenu: {
        show: false,
      },
    }
  },
  getters: {
    // 获取组件list
    getComponentsListDate(): any {
      return this.componentsListDate
    },
     // 获取组件list长度
    getComponentZindex(): number {
      return this.componentsListDate.length
    },
     // 获取选择状态的组件
    getSelectComponent(): any {
      return this.componentsListDate.find((com) => com.selected === true)
    },
    // 获取画布的缩放
    getCanvasScale(): number {
      return this.canvas.scale
    },
    // 获取画布的宽度
    getCanvasWidth(): number {
      return this.canvas.width
    },
     // 获取画布的高度
    getCanvasHeight(): number {
      return this.canvas.height
    },
  },
  actions: {
    // 添加组件
    addComponent(component: any) {
      this.componentsListDate.push(component)
    },
    
     // 根据id筛选出组件
     getComponent(id: string) {
      return this.componentsListDate.find((com) => com.id === id)
    },

    // 选中组件让其活跃
    selectComponentActive(id: string) {
      this.componentsListDate.forEach((com) => {
        if (com.id === id) com.selected = true
        else com.selected = false
        com.hovered = false
      })
    },
    
    // 设置组件为hover
    setComponentHover(hover: boolean, id: string) {
      if (this.getComponent(id)?.hovered === hover) return
      else this.getComponent(id)!.hovered = hover
    },
    
    // 设置画布scale
    setCanvasScale(scale: number) {
      this.canvas.scale = scale === 0 ? this.minCanvasScale : scale
    },
     // 设置画布高度
    setCanvasHeight(height: number) {
      this.canvas.height = height
    },
     // 设置画布宽度
    setCanvasWidth(width: number) {
      this.canvas.width = width
    },

    // 设置对齐线属性
    calcAlignLine(component: any) {
      if (!this.alignLine.enable) {
        return
      }
      // 计算对齐线位置
      const attr = calcIntersectingLines(component, this.componentsListDate, this.canvas.scale)
      this.alignLine = { ...this.alignLine, ...attr, show: true }
    },
    
    // 隐藏对齐线
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

```



