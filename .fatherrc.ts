export default {
  esm: {
    type: "rollup",
    minify: false, // 是否压缩esm
  },
  cjs: {
    minify: false, // 是否压缩cjs
    type: "rollup",
  },
  extractCSS: true, // 业务样式是否提成单独.css
  extraBabelPlugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      },
    ],
  ],
  extraPostCSSPlugins: [],
  extraRollupPlugins: [], // 额外配置rollupPlugin
};
