import classNames from 'classnames'

const trim = function (s: string) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return ` ${el.className} `.indexOf(` ${cls} `) > -1
  }
}

export function addClass(el: HTMLElement, cls: string | { [x: string]: boolean }): void {
  if (!el) return
  const curClass = el.className
  el.classList.add(classNames(curClass, cls))
}

export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
