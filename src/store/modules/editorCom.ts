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
    addComponent(component: any) {
      this.componentsListDate.push(component);
    },
    setComponentSelect(component: any) {
      component.selected = true;
    },
    cancelComponentSelect(component: any) {
      component.selected = false;
    },
  },
});
