import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "src/js/content_script.js",
    output: {
      file: "js/content_script.js",
      format: "umd",
      name: "zhAH",
    },
    // plugins: [terser({ compress: { drop_console: true } })],
  },
  {
    input: "src/js/proxy_ajax.js",
    output: {
      file: "js/proxy_ajax.js",
      format: "umd",
      name: "zhAH",
    },
    // plugins: [terser({ compress: { drop_console: true } })],
  },
];
