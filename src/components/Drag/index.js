import { prefix } from "~/config";
import Drag from "./index.vue";

Drag.install = (Vue) => {
  Vue.component(prefix + Drag.name, Drag);
};

export default Drag;
