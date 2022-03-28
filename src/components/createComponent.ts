import Bar from '@/components/material/bar/src/bar'
export default function createComponent(name: string) {
  switch (name) {
    case 'BasicBar':
      return new Bar()
    default:
      break
  }
}
