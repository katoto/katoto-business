export default {
  esm: {
    type: "rollup",
    minify: false,
  },
  cjs: "rollup",
  extractCSS: true, // 业务样式是否提成单独.css
};
