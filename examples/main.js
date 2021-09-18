import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VenWidget from "../src/index.js";
import error from "./assets/images/error.jpg";
import loading from "./assets/images/loading.gif";
Vue.use(VenWidget, {
  lazy: {
    preLoad: 1.3,
    error: error,
    loading: loading,
    attempt: 1,
  },
});
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
