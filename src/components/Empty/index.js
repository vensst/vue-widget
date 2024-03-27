import { prefix } from "~/config";
import Empty from "./index.vue";
Empty.install = (Vue) => {
  Vue.component(prefix + Empty.name, Empty);
};
export default Empty;
