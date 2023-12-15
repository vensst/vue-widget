import { prefix } from "~/config";
import Table from "./index.vue";
import useVXETable from "../../plugins/VXETable.js";
Table.install = (Vue, options) => {
  useVXETable(Vue, options);
  Vue.component(prefix + Table.name, Table);
};

export default Table;
