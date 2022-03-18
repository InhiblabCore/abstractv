export default function createComponent(name: string) {
  switch (name) {
    case 'BasicBar':
      return {
        name: 'VBasicBar',
        attr: { w: 400, h: 300, deg: 0 },
        selected: true,
        locked: false,
        hided: false,
        hovered: false,
        componentId: Math.floor(Math.random() * 100),
      };

    default:
      break;
  }
}
