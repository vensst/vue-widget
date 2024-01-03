import XEUtils from "xe-utils";
import {
  // 全局对象
  VXETable,

  // 功能模块
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,

  // 可选组件
  Icon,
  Column,
  Colgroup,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  FormItem,
  FormGather,
  Select,
  Optgroup,
  Option,
  Switch,
  List,
  Pulldown,

  // 表格
  Table,
} from "vxe-table";

import zhCN from "vxe-table/lib/locale/lang/zh-CN";
import "vxe-table/lib/style.css";

const dic_components = {
  // 全局对象
  VXETable,

  // 功能模块
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,

  // 可选组件
  Icon,
  Column,
  Colgroup,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  FormItem,
  FormGather,
  Select,
  Optgroup,
  Option,
  Switch,
  List,
  Pulldown,

  // 表格
  Table,
};

export default function (Vue, options = {}) {
  // 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
  VXETable.setup({
    i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
    size: "mini",
    ...(options.options || {}),
  });

  // Vue.use(Icon).use(Column).use(Table).use(Select).use(Pager);// **
  // import("vxe-table/lib/style.css");
  // 按需引入样式 默认样式
  // import(`vxe-table/lib/icon/style/style.css`);
  // import(`vxe-table/lib/column/style/style.css`);
  // import(`vxe-table/lib/table/style/style.css`);
  // import(`vxe-table/lib/select/style/style.css`);
  // import(`vxe-table/lib/pager/style/style.css`);
  // import(`vxe-table/lib/input/style/style.css`); // 不引入这个，分页input框样式有问题

  if (options.components) {
    if (options.components === "all") {
      Object.keys(dic_components).forEach((component) => {
        // 引入全部样式
        // import(`vxe-table/lib/style.css`);
        Vue.use(dic_components[component]);
      });
    } else {
      if (options.components.length) {
        options.components.forEach((component) => {
          // 按需引入样式
          // try {
          //   import(`vxe-table/lib/${component.toLowerCase()}/style/style.css`);
          // } catch (e) {
          //   console.log(e);
          // }
          Vue.use(dic_components[component]);
        });
      }
    }
  }
}
