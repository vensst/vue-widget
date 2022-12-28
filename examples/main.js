import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VenWidget from "../src/index.js";
import error from "./assets/images/error.jpg";
import loading from "./assets/images/loading.gif";
Vue.use(VenWidget, {
  lazy: {
    preLoad: 1.3,
    error: error, // 懒加载 错误图片
    loading: loading, // 懒加载 加载图片
    attempt: 1,
  },
});

import VConsole from "vconsole";
let vConsole = new VConsole();
console.log(vConsole);

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
