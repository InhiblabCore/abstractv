import _ from 'lodash-es';
type EventType = 'mouse' | 'rotate';

const handleMove = ({
  component,
  mouseStartEvent,
  listenMouseEvent,
  scale,
  grid,
}: {
  component: any;
  mouseStartEvent: any;
  listenMouseEvent: any;
  scale: number;
  grid: number;
}) => {
  const cloneComponent = _.clone(component);
  cloneComponent.attr.x =
    component.attr.x +
    Math.round((listenMouseEvent.clientX - mouseStartEvent.clientX) / scale / grid) * grid;

  cloneComponent.attr.y =
    component.attr.y +
    Math.round((listenMouseEvent.clientY - mouseStartEvent.clientY) / scale / grid) * grid;
  component = {
    ...component,
    attr: {
      ...component.attr,
      x: cloneComponent.attr.x,
      y: component.attr.y,
    },
  };
};

export default function useCanvasEvent<T = any>({ eventType }: { eventType: EventType }) {
  const handleMap = new Map<string, any>([['move', handleMove]]);
  const run = handleMap.get(eventType) as (args: T) => void;

  return { run };
}
