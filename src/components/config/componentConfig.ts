import barImg from '@/assets/components/bar/bar.png'
import barLayerImg from '@/assets/components/bar/bar-layer.png'

export const bar = {
  type: 'bar',
  name: '柱状图',
  icon: 'v-icon-chart-bar',
  data: [
    {
      name: 'VBasicBar',
      alias: '柱状图',
      img: barImg,
      layer: barLayerImg,
      used: true,
    },
  ],
}

export const visualizeListComponents = [
  {
    type: 'regular',
    name: '图表',
    icon: 'v-icon-chart',
    data: [bar],
  },
]

export function getVisualizeComponent(name: string) {
  for (let index = 0; index < visualizeListComponents.length; index++) {
    const listComponentsParent = visualizeListComponents[index]
    for (let indez = 0; index < listComponentsParent.data.length; indez++) {
      const componentsCategory = listComponentsParent.data[indez]
      const component = componentsCategory.data.find((item) => item.name === name)
      return {
        listComponentsParent,
        componentsCategory,
        component,
      }
    }
  }
}
