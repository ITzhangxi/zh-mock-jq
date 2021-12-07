import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/js/content_script.js",
    output: {
      file: "dist/js/content_script.js",
    },
    plugins: [terser({ compress: { drop_console: true } })],
  },
  {
    input: "src/js/proxy_ajax.js",
    output: {
      file: "dist/js/proxy_ajax.js",
      format: "umd",
      name: "zhAH",
    },
    plugins: [terser({ compress: { drop_console: true } })],
  },
];
