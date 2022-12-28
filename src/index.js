/**
 * @name: index
 * @author: yfhu
 * @date: 2021/8/19 14:47
 * @description：index
 * @update: 2021/8/19 14:47
 */
//图片懒加载指令
import VueLazyload from "vue-lazyload";

// 指令
import * as directives from "./directives/index.js";

// 组件 -------------------
// 拖拽
import VenDrag from "./components/VenDrag.vue";
// 验证码
import VenCaptchaOrdinary from "./components/VenCaptcha/VenCaptchaOrdinary";
// 滑动验证
import VenCaptchaSlide from "./components/VenCaptcha/VenCaptchaSlide";
// 电子签名
import VenSignature from "./components/VenSignature.vue";

const components = [VenDrag, VenCaptchaOrdinary, VenCaptchaSlide, VenSignature];

//
const VenWidget = {
  ...components,
  install: null,
};
// eslint-disable-next-line no-unused-vars
VenWidget.install = function (Vue, options = {}) {
  Vue.use(VueLazyload, options.lazy || {});
  // 注册全部组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  // 注册全部指令
  for (let directiveName in directives) {
    Vue.directive(directiveName, directives[directiveName]);
  }
};
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  VenWidget.install(window.Vue);
}
export default VenWidget;
