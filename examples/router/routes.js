/**
 * @name: routes
 * @author: yfhu
 * @date: 2021/8/24 10:36
 * @description：routes
 * @update: 2021/8/24 10:36
 */
const modulesFiles = require.context("../views/", true, /\.vue$/);
const _routes = [];
modulesFiles.keys().map((modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.vue/, "$1");
  const component = modulesFiles(modulePath).default;

  if (moduleName !== "Home") {
    const obj = {
      path: `/${moduleName}`,
      name: moduleName,
      meta: {
        title: component.title || moduleName,
      },
      component: component,
    };
    _routes.push(obj);
  }
});

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
    },
    component: () => import(/* webpackChunkName: "examples" */ "../views/Home"),
  },

  ..._routes,
];
console.log(routes);
export default routes;
