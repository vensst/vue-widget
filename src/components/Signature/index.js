import { prefix } from "~/config";
import Signature from "./index.vue";

Signature.install = (Vue) => {
  Vue.component(prefix + Signature.name, Signature);
};

export default Signature;
