import { prefix } from "~/config";
import Chart from "./index.vue";
Chart.install = (Vue) => {
  Vue.component(prefix + Chart.name, Chart);
};
export default Chart;
