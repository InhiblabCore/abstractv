import { addClass } from '@/utils/dom'
import { getLinePos, pixelize, RulerOption } from './useRulerTool'

export type Action = 'add' | 'update' | 'delete'
// 通过坐标计算指示线位置
const getPosByCoor = (coor: number, options: RulerOption) => {
  const { scale, offset } = options
  return {
    coor,
    // @ts-ignore
    dist: parseFloat((coor * scale + offset).toFixed(3)),
  }
}

export default class GuideLine {
  static isMoveing = false

  guideLine: HTMLElement | undefined
  coor = -1

  constructor(
    private el: HTMLElement,
    private options: RulerOption,
    ev: MouseEvent | null,
    coor = 0,
  ) {
    this.constructGuide(ev, coor)
  }

  // 创建参考线
  constructGuide(ev: MouseEvent | null, coor?: number) {
    const { el } = this
    const guideLine = document.createElement('div')

    guideLine.title = '双击删除参考线'
    addClass(guideLine, 'ruler-line')
    this.guideLine = guideLine

    const { coor: oldCoor } = this
    this.setLine(ev, coor)

    if (ev) {
      this.coorChange('add', this.coor, oldCoor)
    }

    let guideWp = el.querySelector('.lines-wrapper')
    if (!guideWp) {
      guideWp = document.createElement('div')
      addClass(guideWp as HTMLDivElement, 'lines-wrapper')
      el.appendChild(guideWp)
    }

    guideWp.appendChild(guideLine)

    this.guideLine.addEventListener('mousedown', this.moving.bind(this))
    this.guideLine.addEventListener('dblclick', this.dblclick.bind(this))
  }

  moving(ev: MouseEvent) {
    GuideLine.isMoveing = true
    const { options } = this
    ev.preventDefault()
    ev.stopPropagation()

    const { coor: oldCoor } = this
    const move = (e: MouseEvent) => {
      if (options.direction === 'TB') {
        document.body.style.cursor = 'ew-resize'
      } else {
        document.body.style.cursor = 'ns-resize'
      }
      this.setLine(e)
    }

    const up = () => {
      GuideLine.isMoveing = false
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)

      const { coor } = this
      if (coor < 0) {
        this.coorChange('delete', oldCoor, oldCoor)
      } else {
        this.coorChange('update', coor, oldCoor)
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  setLine(e: MouseEvent | null, coor = 0) {
    const { el, options, guideLine } = this
    const pos = e ? getLinePos(el, options, e.clientX, e.clientY) : getPosByCoor(coor, options)
    if (options.direction === 'TB') {
      guideLine!.style.left = pixelize(pos.dist)
    } else {
      guideLine!.style.top = pixelize(pos.dist)
    }

    guideLine!.innerHTML = `
      <div class="line-action">
        <span class="line-value">${pos.coor}</span>
      </div>`

    this.coor = pos.coor
  }
  dblclick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    this.destroy()
  }

  coorChange(action: Action, nCoor: number, oCoor: number) {
    const { options } = this
    options.coorChange && options.coorChange(action, nCoor, oCoor)
  }

  show() {
    if (this.guideLine) this.guideLine.style.display = 'block'
  }

  hide() {
    if (this.guideLine) this.guideLine.style.display = 'none'
  }

  destroy() {
    console.log('desroy')

    const { guideLine, coor } = this
    console.log(guideLine)

    this.coorChange('delete', coor, coor)
    guideLine?.removeEventListener('mousedown', this.moving)
    guideLine?.removeEventListener('dblclick', this.dblclick)
    guideLine?.remove()
  }
}
