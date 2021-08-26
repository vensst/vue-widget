/**
 * @name: index
 * @author: yfhu
 * @date: 2021/8/19 14:47
 * @description：index
 * @update: 2021/8/19 14:47
 */
import * as directives from "./directives/index.js";
import VenDrag from "./components/VenDrag.vue";
import VenCaptchaOrdinary from "./components/VenCaptcha/VenCaptchaOrdinary";
import VenCaptchaSlide from "./components/VenCaptcha/VenCaptchaSlide";
const components = [VenDrag, VenCaptchaOrdinary,VenCaptchaSlide];
const VenWidget = {
  ...components,
  install: null,
};
// eslint-disable-next-line no-unused-vars
VenWidget.install = function (Vue, options = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  for (let directiveName in directives) {
    Vue.directive(directiveName, directives[directiveName]);
  }
};
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  VenWidget.install(window.Vue);
}
export default VenWidget;
