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
    name:"Home",
    meta: {
      title: "首页",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Home"),
  },
  {
    path: "/drag",
    name:"Drag",
    meta: {
      title: "拖拽",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Drag"),
  },
  {
    path: "/captcha",
    name:"Captcha",
    meta: {
      title: "图形验证码",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Captcha"),
  },
];
export default routes;
