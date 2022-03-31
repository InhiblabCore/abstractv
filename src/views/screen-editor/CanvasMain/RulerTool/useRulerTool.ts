import { addClass } from '@/utils/dom'
import { ComputedRef } from 'vue'
import { useEventListener } from 'vue3-hooks-plus'
import type { Action } from './guideLine'
import GuideLine from './guideLine'

type LayoutDirection = 'LR' | 'TB'

export type RulerOption = {
  direction?: LayoutDirection
  width?: number
  height?: number
  bgColor?: string
  fontFamily?: string
  fontSize?: string
  fontColor?: string
  strokeStyle?: string
  lineWidth?: number
  indicatorLineWidth?: number
  scale?: number
  offset?: number
  ratio?: number
  coorChange?: (action: Action, newCoor: number, oldCoor: number) => void
}
const defaultOptions: RulerOption = {
  direction: 'TB',
  width: 1000,
  height: 20,
  bgColor: '#0e1013',
  fontFamily: 'sans-serif',
  fontSize: '10px',
  fontColor: '#90a0ae',
  strokeStyle: 'rgba(161, 174, 179, 0.8)',
  lineWidth: 0.5,
  indicatorLineWidth: 1,
  scale: 1,
  offset: 40,
  ratio: 2,
}

export const pixelize = (val: number | string) => {
  return `${val}px`
}

// 创建高分辨率画布
export const createCanvas = (
  el: HTMLCanvasElement | undefined | null,
  width: number,
  height: number,
  ratio?: number,
) => {
  const canvas = el ?? document.createElement('canvas')
  if (typeof ratio === 'number') {
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = pixelize(width)
    canvas.style.height = pixelize(height)
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
  }
  return canvas
}

// 计算指示线位置
export const getLinePos = (el: HTMLElement, options: RulerOption, cx: number, cy: number) => {
  const { height, scale, offset } = options

  // /(?<=\()(.+)(?=px\))/ig
  // @ts-ignore
  const scrollOffset = parseFloat(el?.style?.transform?.match?.(/(?<=X\()(.+)/gi)?.[0])

  let dist = 0
  if (options.direction == 'TB') {
    dist = cx - (el.parentElement?.offsetLeft || 0) - scrollOffset
  } else {
    dist = cy - (el.parentElement?.offsetTop || 0) - scrollOffset
  }
  // @ts-ignore
  dist = dist - height + options.indicatorLineWidth
  // @ts-ignore
  const coor = Math.floor((dist - offset) / scale)
  return {
    coor,
    dist,
  }
}

export default function useRulerTool(options?: ComputedRef<RulerOption>) {
  const container = ref<HTMLDivElement>()
  const canvas = ref<HTMLCanvasElement>()
  const context = ref<CanvasRenderingContext2D>()
  const guideLines = ref<GuideLine[]>([])
  const ruler = ref({
    width: 0,
    height: 0,
  })

  const rulerOptions = computed(() => ({ ...defaultOptions, ...options?.value }))

  // 画指示线
  const constructIndicator = (ev: MouseEvent) => {
    if (GuideLine.isMoveing) {
      return
    }

    const el = container.value
    const options = rulerOptions.value

    const indicator = document.createElement('div')
    const indicatorValue = document.createElement('span')
    addClass(indicator, 'ruler-indicator')
    addClass(indicatorValue, 'indicator-value')
    indicator.appendChild(indicatorValue)
    el?.appendChild(indicator)

    const updateLinePos = (e: MouseEvent) => {
      const pos = getLinePos(el!, options, e.clientX, e.clientY)
      indicator.style.left = pixelize(pos.dist)
      //   indicator.style.left = '300px'
      indicatorValue.textContent = `${pos.coor}`
    }
    updateLinePos(ev)

    const move = (e: MouseEvent) => {
      updateLinePos(e)
    }
    const out = () => {
      container.value?.removeEventListener('mousemove', move)
      container.value?.removeEventListener('mouseout', out)
      indicator.remove()
    }

    container.value?.addEventListener('mousemove', move)
    container.value?.addEventListener('mouseout', out)
  }

  const drawPoints = () => {
    const { width, height } = ruler.value
    const { offset, scale } = rulerOptions.value
    const maxTickLen = 0,
      medTickLen = height / 1.5,
      minTickLen = height / 1.2

    for (let pos = 0; pos <= width; pos += 1) {
      const delta = pos - offset!
      //   console.log(delta)

      if (delta < 0) continue

      let label = -1
      let tickLen = -1
      if (delta % 50 === 0) {
        // console.log(delta)
        // console.log(scale)
        label = Math.floor(delta / scale!)
        tickLen = maxTickLen
      } else if (delta % 25 === 0) {
        tickLen = medTickLen
      } else if (delta % 5 === 0) {
        tickLen = minTickLen
      }

      if (tickLen >= 0) {
        context.value?.moveTo(pos + 0.5, height + 0.5)
        context.value?.lineTo(pos + 0.5, tickLen)
        if (label > -1) {
          context.value?.fillText(`${label}`, pos + 2.5, height / 1.5)
        }
      }
    }
  }

  const drawRuler = () => {
    const { width, height } = ruler.value
    const options = rulerOptions.value

    if (context.value) {
      context.value.beginPath()
      // @ts-ignore
      context.value.fillStyle = options.bgColor
      context.value.fillRect(0, 0, width, height)
      context.value.closePath()
      context.value.beginPath()
      // @ts-ignore
      context.value.font = `${options.fontSize} ${options.fontFamily}`
      // @ts-ignore
      context.value.textAlign = 'left'
      // @ts-ignore
      context.value.fillStyle = options.fontColor
      // @ts-ignore
      context.value.strokeStyle = options.strokeStyle
      // @ts-ignore
      context.value.lineWidth = options.lineWidth
      // @ts-ignore
      drawPoints()
      context.value.stroke()
    }
  }

  const createArithmeticScale = () => {
    const el = container.value
    const { direction, width, height, ratio } = rulerOptions.value
    if (el) {
      const deltaW =
        direction === 'TB' ? Math.max(el.offsetWidth, width!) : Math.max(el.offsetHeight, width!)
      const deltaH = height
      ruler.value.width = deltaW!
      ruler.value.height = deltaH!

      const canvas_ = createCanvas(null, deltaW, deltaH!, ratio!)
      addClass(canvas_, 'canvas-ruler')
      el.appendChild(canvas_)

      canvas.value = canvas_
      context.value = canvas.value.getContext('2d')!
      drawRuler()
    }
  }

  const setSize = (w: number, h: number, s: number) => {
    const el = container.value
    const options = rulerOptions.value
    options.width = w
    options.height = h
    options.scale = s
    const { direction, width, height, ratio } = options

    if (el) {
      const deltaW =
        direction === 'TB' ? Math.max(el.offsetWidth, width) : Math.max(el.offsetHeight, width)
      const deltaH = height

      ruler.value.width = deltaW
      ruler.value.height = deltaH

      createCanvas(canvas.value, deltaW, deltaH, ratio)
      drawRuler()
      //  this.guideLines.forEach((g) => g.setLine(null, g.coor))
    }
  }

  // 创建参考线
  const createGuideLine = (ev: MouseEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (container.value)
      guideLines.value.push(new GuideLine(container.value, rulerOptions.value, ev))
  }

  // 设置画布比例
  const setScale = (scale: number) => {
    rulerOptions.value.scale = scale
    drawRuler()
    guideLines.value.forEach((g) => g.setLine(null, g.coor))
  }

  // 切换参考线
  const toggleGuide = (visible: boolean) => {
    const func = visible ? 'show' : 'hide'
    guideLines.value.forEach((g) => g[func]())
  }

  // 清空所有参考线
  const clearGuides = () => {
    guideLines.value.forEach((g) => g.destroy())
    guideLines.value = []
  }

  const destroy = () => {
    clearGuides()
    if (container.value) {
      container.value.remove()
      canvas.value?.remove()
    }
  }

  useEventListener('mouseenter', constructIndicator, {
    target: canvas,
  })

  useEventListener('mousedown', createGuideLine, {
    target: canvas,
  })

  return { container, createArithmeticScale, setSize, setScale, toggleGuide, destroy, clearGuides }
}
