import Bar from '@/components/material/bar/src/bar'
import Line from '@/components/material/line/src/line'
export default function createComponent(name: string) {
  switch (name) {
    case 'BasicBar':
      return new Bar()
    case 'BasicLine':
      return new Line()
    default:
      break
  }
}
