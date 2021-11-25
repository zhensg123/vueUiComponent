// rollup.config.js
import resolve from "rollup-plugin-node-resolve" // 不配置时候必须是完整的路径
import vue from "rollup-plugin-vue" // ES6 转 ES5，让我们可以使用 ES6 新特性来编写代码
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs" // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import scss from 'rollup-plugin-scss'
import replace from 'rollup-plugin-replace'

const config = {
  input: "src/index.js",
  output: {
    name: "xoneui",
    exports: "named", // named – 如果你导出多个东西，适合用这个
    globals: {
      vue: "Vue"  // 告诉 Rollup vue 模块的id等同于 Vue 变量
    }
  },
  plugins: [
    scss(),
    resolve(),
    vue({
      css: true,
      compileTemplate: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    babel({
      exclude: "**/node_modules/**"
    }),
    commonjs()
  ]
}

export default config
