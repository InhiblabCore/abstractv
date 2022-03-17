import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';

export const routerHistory = createWebHashHistory();
const navRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/workstation',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'workstation',
        name: 'Workstation',
        component: () => import('@/views/home/MyWorkstation/index.vue'),
        meta: { title: '可视化平台' },
      },
      {
        path: 'data',
        name: 'MyData',
        component: () => import('@/views/home/MyData/index.vue'),
        meta: { title: '我的数据' },
      },
      {
        path: 'com',
        name: 'MyComponents',
        component: () => import('@/views/home/MyComponents/index.vue'),
        meta: { title: '我的组件' },
      },
      {
        path: 'case',
        name: 'MyCase',
        component: () => import('@/views/home/MyCase/index.vue'),
        meta: { title: '教程' },
      },
    ],
  },
];

const routers = createRouter({
  history: routerHistory,
  routes: [
    ...navRoutes,
    {
      path: '/create-screen',
      name: 'CreateScreen',
      component: () => import('@/views/create-screen/index.vue'),
      meta: { title: '创建' },
    },
    {
      path: '/admin/screen/:projectId',
      name: 'ScreenEditor',
      props: true,
      component: () => import('@/views/screen-editor/index.vue'),
      meta: { title: '编辑器' },
    },
    // {
    //   path: '/',
    //   redirect: '/home',
    // },
    // {
    //   name: 'home',
    //   path: '/home',
    //   component: () => import('@/views/Home/index.vue'),
    // },
  ],
});

export { routers };
