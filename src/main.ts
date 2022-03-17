import { createApp } from 'vue';
import App from './App.vue';
import { setupGlobDirectives } from './directives';
import { routers } from './routers';
import store from './store';
import NaiveUI from '@/components/naive-ui';
import GUI from '@/components/ui';
import AbstractvCharts from '@/components';
import '@/styles/index.scss';

import '@/styles/tailwindcss.css';

const app = createApp(App);

app.use(routers);
app.use(store);
app.use(GUI);
app.use(NaiveUI);
app.use(AbstractvCharts as any);

setupGlobDirectives(app);

// 挂载应用
app.mount('#app');
