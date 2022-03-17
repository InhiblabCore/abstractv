import { SFCWithInstall } from '@/types/types';
import type { App } from 'vue';

import ComIcon from './src/index.vue';

ComIcon.install = (app: App): void => {
  app.component(ComIcon.name, ComIcon);
};

export default ComIcon as SFCWithInstall<typeof ComIcon>;
