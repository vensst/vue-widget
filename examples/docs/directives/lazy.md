#v-lazy ###说明
此指令是引入了 vue-lazyload 组件，具体请参考[文档](https://github.com/hilongjw/vue-lazyload) ###用法及配置

```javascript
import VueWidget from "@vensst/vue-widget";
//如果是本地图片先import，否则无效
import error from "./assets/images/error.jpg";
import loading from "./assets/images/loading.gif";
Vue.use(VenWidget, {
  lazy: {
    preLoad: 1.3,
    error: error,
    loading: loading,
    attempt: 1,
  },
});
```
