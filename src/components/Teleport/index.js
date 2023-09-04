import { prefix } from "~/config";
import Teleport from "./index.vue";
Teleport.install = (Vue) => {
  Vue.component(prefix + Teleport.name, Teleport);
};
export default Teleport;
