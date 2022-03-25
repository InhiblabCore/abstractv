import _ from 'lodash-es'
/**
 * 方位
 */
export type Direction = 'lt' | 't' | 'rt' | 'r' | 'rb' | 'b' | 'lb' | 'l'

/**
 * 双向指示
 */
export type BidirectionalCursor = 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize'

/**
 * 单向指示
 */
export type DirectionCursor =
  | 'nw-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'e-resize'
  | 'se-resize'
  | 's-resize'
  | 'sw-resize'
  | 'w-resize'

export type ResizeMode = 'normal' | 'stretch'

interface IPoint {
  x: number
  y: number
}
// 每个范围的角度对应的光标
const angleToCursor: {
  start: number
  end: number
  cursor: BidirectionalCursor
}[] = [
  { start: 338, end: 23, cursor: 'nwse-resize' },
  { start: 23, end: 68, cursor: 'ns-resize' },
  { start: 68, end: 113, cursor: 'nesw-resize' },
  { start: 113, end: 158, cursor: 'ew-resize' },
  { start: 158, end: 203, cursor: 'nwse-resize' },
  { start: 203, end: 248, cursor: 'ns-resize' },
  { start: 248, end: 293, cursor: 'nesw-resize' },
  { start: 293, end: 338, cursor: 'ew-resize' },
]

// 八个方位点对应的初始角度
const initialDirectionAngle: {
  direction: Direction
  angle: number
}[] = [
  { direction: 'lt', angle: 0 },
  { direction: 't', angle: 45 },
  { direction: 'rt', angle: 90 },
  { direction: 'r', angle: 135 },
  { direction: 'rb', angle: 180 },
  { direction: 'b', angle: 225 },
  { direction: 'lb', angle: 270 },
  { direction: 'l', angle: 315 },
]
export const getCursors = (startAngle: number): Record<Direction, BidirectionalCursor> => {
  const rotate = (startAngle + 360) % 360 // 防止角度有负数，所以 + 360
  const result: Record<string, BidirectionalCursor> = {}
  let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
  initialDirectionAngle.forEach((point) => {
    const angle = (point.angle + rotate) % 360
    const len = angleToCursor.length
    const i = 0
    while (i < len) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point.direction] = 'nwse-resize'
        break
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point.direction] = angleLimit.cursor
        break
      }
    }
  })

  return result
}

export const handleMove = ({
  component,
  mouseStartEvent,
  scale,
  grid,
  calcAlignLine,
  hideAlignLine,
}: {
  component: any
  mouseStartEvent: MouseEvent
  scale: number
  grid: number
  calcAlignLine: (component: any) => void
  hideAlignLine: (component: any) => void
}) => {
  const componentAttr = _.clone(component.attr)
  const cloneComponentAttr: IPoint = { x: componentAttr.x, y: componentAttr.y }

  const move = (listenMouseEvent: MouseEvent) => {
    cloneComponentAttr.x =
      componentAttr.x +
      Math.round((listenMouseEvent.clientX - mouseStartEvent.clientX) / scale / grid) * grid

    cloneComponentAttr.y =
      componentAttr.y +
      Math.round((listenMouseEvent.clientY - mouseStartEvent.clientY) / scale / grid) * grid
    component.attr = { ...component.attr, x: cloneComponentAttr.x, y: cloneComponentAttr.y }

    calcAlignLine?.(component)
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    hideAlignLine?.(component)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

export const handleRotate = (ev: MouseEvent, el: HTMLElement, com: any) => {
  // 获取元素中心点位置
  const rect = el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const startAngle =
    (Math.atan2(centerY - ev.clientY, centerX - ev.clientX) * 180) / Math.PI - com.attr.deg

  const move = (e: MouseEvent) => {
    const angle =
      (Math.atan2(centerY - e.clientY, centerX - e.clientX) * 180) / Math.PI - startAngle
    const deg = Math.round(angle % 360)
    com.attr.deg = deg < 0 ? deg + 360 : deg
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

/**
 * 计算缩放后位置大小 - 自然模式
 * @param dir 拖拽方向
 * @param attr 开始时的基本信息
 * @param startPoint 拖拽起始点位置
 * @param curPositon 当前拖拽位置
 * @param scale 缩放比例
 */
function calcResizeForNormal(
  dir: Direction,
  attr: any,
  startPoint: IPoint,
  curPositon: IPoint,
  scale: number,
  pos: any,
) {
  if (dir === 't') {
    pos.h = Math.round(attr.h + (startPoint.y - curPositon.y) / scale)
    pos.y = Math.round(attr.y + (curPositon.y - startPoint.y) / scale)
  } else if (dir === 'rt') {
    pos.h = Math.round(attr.h + (startPoint.y - curPositon.y) / scale)
    pos.w = Math.round(attr.w + (curPositon.x - startPoint.x) / scale)
    pos.y = Math.round(attr.y + (curPositon.y - startPoint.y) / scale)
  } else if (dir === 'r') {
    pos.w = Math.round(attr.w + (curPositon.x - startPoint.x) / scale)
  } else if (dir === 'rb') {
    pos.h = Math.round(attr.h + (curPositon.y - startPoint.y) / scale)
    pos.w = Math.round(attr.w + (curPositon.x - startPoint.x) / scale)
  } else if (dir === 'b') {
    pos.h = Math.round(attr.h + (curPositon.y - startPoint.y) / scale)
  } else if (dir === 'lb') {
    pos.h = Math.round(attr.h + (curPositon.y - startPoint.y) / scale)
    pos.w = Math.round(attr.w + (startPoint.x - curPositon.x) / scale)
    pos.x = Math.round(attr.x + (curPositon.x - startPoint.x) / scale)
  } else if (dir === 'l') {
    pos.w = Math.round(attr.w + (startPoint.x - curPositon.x) / scale)
    pos.x = Math.round(attr.x + (curPositon.x - startPoint.x) / scale)
  } else if (dir === 'lt') {
    pos.h = Math.round(attr.h + (startPoint.y - curPositon.y) / scale)
    pos.w = Math.round(attr.w + (startPoint.x - curPositon.x) / scale)
    pos.x = Math.round(attr.x + (curPositon.x - startPoint.x) / scale)
    pos.y = Math.round(attr.y + (curPositon.y - startPoint.y) / scale)
  }
}

export const handleZoom = (ev: MouseEvent, dir: Direction, component: any, scale: number) => {
  const componentAttr = _.clone(component.attr)
  const cloneComponentAttr: IPoint & { h: number; w: number } = {
    x: componentAttr.x,
    y: componentAttr.y,
    h: componentAttr.h,
    w: componentAttr.w,
  }
  const move = (listenMouseEvent: MouseEvent) => {
    calcResizeForNormal(
      dir,
      componentAttr,
      { x: ev.clientX, y: ev.clientY },
      { x: listenMouseEvent.clientX, y: listenMouseEvent.clientY },
      scale,
      cloneComponentAttr,
    )

    component.attr = {
      ...component.attr,
      x: cloneComponentAttr.x,
      y: cloneComponentAttr.y,
      h: cloneComponentAttr.h,
      w: cloneComponentAttr.w,
    }
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)

  //   setAttr(ev, dir, com, scale, 0, mode)
}
