/**
 * @name: vue.config
 * @author: yfhu
 * @date: 2021/8/19 14:31
 * @description：vue.config
 * @update: 2021/8/19 14:31
 */
const path = require("path");
module.exports = {
  //部署应用包时的基本 URL
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  //输出路劲
  // outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: "",
  //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: "index.html",
  // 修改 pages 入口
  pages: {
    index: {
      entry: "examples/main.js", // 入口
      // template: "public/index.html", // 模板
      // filename: "index.html", // 输出文件
    },
  },
  productionSourceMap: false,
  css: {
    //https://cli.vuejs.org/zh/config/#css-extract
    extract: false,
  },
  configureWebpack: () => {
    return {
      output: {
        libraryExport: "default",

        // filename: `js/[name].${_version}.${_timestamp}.js`,
        // chunkFilename: `js/[name].${_version}.${_timestamp}.js`,
      },
      plugins: [
        // new htmlWebpackplugin({
        //   //创建一个在内存中生成的html页面的插件
        //   template: path.join(__dirname, "./public/index.html"),
        //   filename: "index.html",
        // }),
        // new ProgressBarPlugin(),
        // new VueLoaderPlugin(),
      ],
    };
  },
  chainWebpack: (config) => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set("@", path.resolve("examples"))
      .set("~", path.resolve("src"));

    // 把 src 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            preserveWhitespace: false,
          },
        };
      })
      .end()
      .rule("js")
      .include.add("/src")
      .end()
      .include.add("/examples")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
  },
};
