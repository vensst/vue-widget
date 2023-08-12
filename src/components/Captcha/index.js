import { prefix } from "~/config";
import Captcha from "./index.vue";
Captcha.install = (Vue) => {
  Vue.component(prefix + Captcha.name, Captcha);
};
export default Captcha;
