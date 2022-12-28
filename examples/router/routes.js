/**
 * @name: routes
 * @author: yfhu
 * @date: 2021/8/24 10:36
 * @description：routes
 * @update: 2021/8/24 10:36
 */
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Home"),
  },
  {
    path: "/drag",
    name: "Drag",
    meta: {
      title: "拖拽",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Drag"),
  },
  {
    path: "/captcha",
    name: "Captcha",
    meta: {
      title: "图形验证码",
    },
    component: () =>
      import(/* webpackChunkName: "examples" */ "../views/Captcha"),
  },
  {
    path: "/lazy",
    name: "Lazy",
    meta: {
      title: "图片懒加载",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Lazy"),
  },
  {
    path: "/scan-code",
    name: "ScanCode",
    meta: {
      title: "扫码",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/ScanCode"),
  },
  {
    path: "/signature",
    name: "Signature",
    meta: {
      title: "电子签名",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Signature"),
  },
];
export default routes;
