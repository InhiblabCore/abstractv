import {
  barImg,
  barLayerImg,
  arcBarImg,
  arcBarImgLayerImg,
  lineBarChartImg,
  lineBarChartImgLayerImg,
  horiBarImg,
  horiBarLayerImg,
  basicAreaImg,
  basicAreaLayerImg,
  basicLineImg,
  basicLineLayerImg,
  basicPieImg,
  basicPieLayerImg,
  pieOneValueImg,
  pieOneValueLayerImg,
  threeImg,
  threeLayerImg,
  wordCloudImg,
  wordCloudLayerImg,
  mapImg,
  mapLayerImg,
  threeMapImg,
  threeMapLayerImg,
  mainTitle,
  marquee,
  numberTitleFlop,
  paragraph,
  timer,
  carouselTable,
  tableBar,
  fullScreen,
  percentageBar,
  tabList,
  bgBox,
  borderbox,
  mainImg,
  decoration,
  datePicker,
} from './img'

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
    {
      name: 'VArcBar',
      alias: '玉环图',
      img: arcBarImg,
      thum: arcBarImgLayerImg,
      used: false,
    },
    {
      name: 'VLineBarChart',
      alias: '折线柱图',
      img: lineBarChartImg,
      thum: lineBarChartImgLayerImg,
      used: false,
    },
  ],
}

export const horizontalBar = {
  type: 'horizontal-bar',
  name: '条形图',
  icon: 'v-icon-chart-bar',
  data: [
    {
      name: 'VHoriBasicBar',
      alias: '水平基本柱状图',
      img: horiBarImg,
      thum: horiBarLayerImg,
      used: false,
    },
  ],
}

export const line = {
  type: 'line',
  name: '折线图',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VBasicLine',
      alias: '基本折线图',
      img: basicLineImg,
      thum: basicLineLayerImg,
      used: true,
    },
  ],
}

export const area = {
  type: 'area',
  name: '区域图',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VBasicArea',
      alias: '区域图',
      img: basicAreaImg,
      thum: basicAreaLayerImg,
      used: false,
    },
  ],
}

export const pie = {
  type: 'pie',
  name: '饼环图',
  icon: 'v-icon-chart-pie',
  data: [
    {
      name: 'VBasicPie',
      alias: '基本饼图',
      img: basicPieImg,
      thum: basicPieLayerImg,
      used: false,
    },
    {
      name: 'VPieOneValue',
      alias: '指标占比饼图',
      img: pieOneValueImg,
      thum: pieOneValueLayerImg,
      used: false,
    },
  ],
}

export const relation = {
  type: 'relation',
  name: '关系图',
  icon: 'v-icon-relation',
  data: [
    {
      name: 'VTree',
      alias: '树图',
      img: threeImg,
      thum: threeLayerImg,
      used: false,
    },
  ],
}

export const chart = {
  type: 'chart',
  name: '其他',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VWordCloud',
      alias: '词云',
      img: wordCloudImg,
      thum: wordCloudLayerImg,
      used: false,
    },
  ],
}

export const all = {
  type: 'all',
  name: '全部',
  icon: 'v-icon-view-grid',
  data: [bar, horizontalBar, line, area, pie, relation, chart]?.map((v) => v.data)?.flat(),
}

export const map = {
  type: 'map',
  name: '地图',
  icon: 'v-icon-map',
  data: [
    {
      name: 'VChina2d',
      alias: '基础平面地图',
      img: mapImg,
      thum: mapLayerImg,
      used: false,
      children: [
        // {
        //   name: 'VChina2dBubbles',
        //   alias: '呼吸气泡层',
        //   img: `${import.meta.env.VITE_APP_CDN}/com/2d-china-bubbles-180-180.png`,
        //   thum: `${import.meta.env.VITE_APP_CDN}/com/2d-china-bubbles-180-180.png`,
        //   used: false,
        // },
        // {
        //   name: 'VChina2dFlyLines',
        //   alias: '飞线层',
        //   img: `${import.meta.env.VITE_APP_CDN}/com/2d-china-fly-lines-180-180.png`,
        //   thum: `${import.meta.env.VITE_APP_CDN}/com/2d-china-fly-lines-180-180.png`,
        //   used: false,
        // },
      ],
    },
    {
      name: 'VWorld3d',
      alias: '3D平面世界地图',
      img: threeMapImg,
      thum: threeMapLayerImg,
      used: false,
    },
  ],
}

export const title = {
  type: 'title',
  name: '标题',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VMainTitle',
      alias: '通用标题',
      img: mainTitle,
      thum: mainTitle,
      used: false,
    },
    {
      name: 'VMarquee',
      alias: '跑马灯',
      img: marquee,
      thum: marquee,
      used: false,
    },
    {
      name: 'VNumberTitleFlop',
      alias: '数字翻牌器',
      img: numberTitleFlop,
      thum: numberTitleFlop,
      used: false,
    },
    {
      name: 'VParagraph',
      alias: '多行文本',
      img: paragraph,
      thum: paragraph,
      used: false,
    },
    {
      name: 'VTimer',
      alias: '时间器',
      img: timer,
      thum: timer,
      used: false,
    },
  ],
}

export const list = {
  type: 'list',
  name: '列表',
  icon: 'v-icon-view-list',
  data: [
    {
      name: 'VCarouselTable',
      alias: '轮播列表',
      img: carouselTable,
      thum: carouselTable,
      used: false,
    },
    {
      name: 'VTableBar',
      alias: '轮播列表柱状图',
      img: tableBar,
      thum: tableBar,
      used: false,
    },
  ],
}

export const button = {
  type: 'button',
  name: '按钮类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VFullScreen',
      alias: '全屏切换',
      img: fullScreen,
      thum: fullScreen,
      used: false,
    },
  ],
}

export const select = {
  type: 'select',
  name: '选择类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VTabList',
      alias: 'Tab列表',
      img: tabList,
      thum: tabList,
      used: false,
    },
  ],
}

export const interactData = {
  type: 'interact-data',
  name: '数据类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VPercentageBar',
      alias: '进度条',
      img: percentageBar,
      thum: percentageBar,
      used: false,
    },
  ],
}

const allInteract = {
  type: 'interact',
  name: '控件',
  icon: 'v-icon-interact',
  data: [button, select, interactData]?.map((v) => v.data)?.flat(),
}

export const material = {
  type: 'material',
  name: '素材',
  icon: 'v-icon-material',
  data: [
    {
      name: 'VBgBox',
      alias: '自定义背景块',
      img: bgBox,
      thum: bgBox,
      used: false,
    },
    {
      name: 'VBorderBox',
      alias: '边框',
      img: borderbox,
      thum: borderbox,
      used: false,
    },
    {
      name: 'VDecoration',
      alias: '装饰',
      img: decoration,
      thum: decoration,
      used: false,
    },
    {
      name: 'VMainImg',
      alias: '单张图片',
      img: mainImg,
      thum: mainImg,
      used: false,
    },
  ],
}

export const other = {
  type: 'other',
  name: '其他',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VDatePicker',
      alias: '日期选择器',
      img: datePicker,
      thum: datePicker,
      used: false,
    },
  ],
}

export const visualizeListComponents = [
  {
    type: 'regular',
    name: '图表',
    icon: 'v-icon-chart',
    data: [all, bar, horizontalBar, line, area, pie, relation, chart],
  },
  {
    type: 'map',
    name: '地图',
    icon: 'v-icon-map',
    data: [map],
  },
  {
    type: 'text',
    name: '信息',
    icon: 'v-icon-com-info',
    data: [title],
  },
  {
    type: 'table',
    name: '表格',
    icon: 'v-icon-table',
    data: [list],
  },
  {
    type: 'interact',
    name: '控件',
    icon: 'v-icon-interact',
    data: [allInteract, button, select, interactData],
  },
  {
    type: 'media',
    name: '媒体',
    icon: 'v-icon-media',
    data: [material],
  },
  {
    type: 'other',
    name: '其他',
    icon: 'v-icon-other',
    data: [other],
  },
]

export function getVisualizeComponent(name: string) {
  for (let index = 0; index < visualizeListComponents.length; index++) {
    const listComponentsParent = visualizeListComponents[index]
    for (let indez = 0; index < listComponentsParent.data.length; indez++) {
      const componentsCategory = listComponentsParent.data[indez]
      // @ts-ignore
      const component = componentsCategory.data?.find?.(
        (item: { name: string }) => item.name === name,
      )
      return {
        listComponentsParent,
        componentsCategory,
        component,
      }
    }
  }
}
