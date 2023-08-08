//图片懒加载指令
import VueLazyload from "vue-lazyload";

import * as directives from "./directives/index.js";

const modulesFiles = require.context("./components", true, /index\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\/index\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const prefix = "Ven";
const components = [];

for (let key in modules) {
  modules[key].name = prefix + modules[key].name;
  components.push(modules[key]);
}

const VenWidget = {
  VueLazyload,
  ...components,
  install: null,
};

// eslint-disable-next-line no-unused-vars
VenWidget.install = function (Vue, options = {}) {
  // 第三方组件，图片懒加载
  Vue.use(VueLazyload, options.lazy);

  // 注册所有组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // 注册所有指令
  for (let directiveName in directives) {
    Vue.directive(directiveName, directives[directiveName]);
  }
};
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  VenWidget.install(window.Vue);
}
export default VenWidget;
