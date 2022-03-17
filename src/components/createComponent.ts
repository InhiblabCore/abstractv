export default function createComponent(name: string) {
  switch (name) {
    case 'BasicBar':
      return { name: 'VBasicBar', attr: { w: 400, h: 300 } };

    default:
      break;
  }
}
