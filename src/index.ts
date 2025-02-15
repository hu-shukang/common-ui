// src/index.ts
import MyButton from './components/MyButton.vue';
import type { App } from 'vue';

MyButton.name = 'my-button';

// 组件列表
const components = [MyButton];

// 插件安装方法
export function install(app: App): void {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
}

// 按需导出各个组件
export { MyButton };

// 默认导出插件对象
export default {
  install,
};
