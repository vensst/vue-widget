import { prefix } from "~/config";

/**
 * 第三方插件，表格组件，vxe-table
 */
import useVXETable from "./plugins/VXETable.js";

/**
 * 第三方插件，图片懒加载指令，vue-lazyload
 */
import VueLazyload from "vue-lazyload";

import * as directives from "./directives/index.js";

const modulesFiles = require.context("./components", true, /index\.js$/);
const components = modulesFiles.keys().reduce((modules, modulePath) => {
  // 取出文件名
  const moduleName = modulePath.replace(/^\.\/(.*)\/index\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const VueWidget = {
  VueLazyload,
  ...components,
  directives,
  install: null,
};

VueWidget.install = function (Vue, options = {}) {
  // 第三方组件
  useVXETable(Vue, options.table);

  // 第三方组件，图片懒加载
  Vue.use(VueLazyload, options.lazy);

  // 注册所有组件
  Object.keys(components).forEach((name) => {
    Vue.component(prefix + name, components[name]);
  });

  // 注册所有指令
  for (let directiveName in directives) {
    Vue.directive(directiveName, directives[directiveName]);
  }
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  VueWidget.install(window.Vue);
}

export default VueWidget;
