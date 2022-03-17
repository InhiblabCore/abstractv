import { defineStore } from 'pinia';

type HomeType = {
  componentsListDate: any[];
};

export const useEditorComStore = defineStore('editor-com', {
  state: (): HomeType => {
    return {
      componentsListDate: [],
    };
  },
  getters: {
    getComponentsListDate(): any {
      return this.componentsListDate;
    },
    getComponentZindex(): number {
      return this.componentsListDate.length;
    },
  },
  actions: {
    addComponent(componnet: any) {
      this.componentsListDate.push(componnet);
    },
  },
});
