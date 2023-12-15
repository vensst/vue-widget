import { prefix } from "~/config";
import Speech from "./index.vue";

Speech.install = (Vue) => {
  Vue.component(prefix + Speech.name, Speech);
};

export default Speech;
