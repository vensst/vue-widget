import { prefix } from "~/config";
import ContextMenu from "./index.vue";
ContextMenu.install = (Vue) => {
  Vue.component(prefix + ContextMenu.name, ContextMenu);
};
export default ContextMenu;
