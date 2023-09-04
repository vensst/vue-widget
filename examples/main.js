import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VenWidget from "../src/index.js";
import error from "./assets/images/error.jpg";
import loading from "./assets/images/loading.gif";
import "./styles/table.scss";

console.log(VenWidget);
// 配置方式
Vue.use(VenWidget, {
  lazy: {
    // 配置与 vue-lazyload 配置一样
    preLoad: 1.3,
    error: error,
    loading: loading,
    attempt: 1,
  },
  table: {
    components: ["Button"], // 按需引入组件
    // components:'all', // 为 all 则会全部引入
    options: {}, // 表格配置项 参考 https://vxetable.cn/v3/#/table/start/global
  },
});

// 按需引入组件
// Vue.use(VenWidget.Captcha);
// Vue.use(VenWidget.Drag);
// Vue.use(VenWidget.Signature);
// Vue.use(VenWidget.VueLazyload, { // 配置与 vue-lazyload 配置一样
//   preLoad: 1.3,
//   error: error,
//   loading: loading,
//   attempt: 1,
// });
// Vue.use(VenWidget.Table, {
//   components: ["Button"], // 按需引入组件
//   // components:'all', // 为 all 则会全部引入
//   options: {}, // 表格配置项 参考 https://vxetable.cn/v3/#/table/start/global
// });

// 按需引入指令
// import { drag } from "../src/directives/index.js";
// Vue.directive("drag", drag);

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
