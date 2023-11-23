// import UnitButton from "./unit-button/index";
// import UnitAlert from "./unit-alert/index";
// import UnitLink from "./unit-link/index";

// // import XoneSelect from "./xone-select/index"
// import Toast from "./xone-toast/index";
import Vue from 'vue'
const ctx = require.context('.', true, /\.vue$/)

ctx
  .keys()
  .forEach(path => {

    const module = ctx(path)

    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    const component = module.default || module
    Vue.component(component.name, component)
  })
// const components = [UnitButton, UnitAlert, UnitLink];

// // will install the plugin only once
// const install = function (Vue) {
//   components.forEach((component) => {
//     Vue.component(component.name, component);
//   });
//   Vue.prototype.$toast = Toast;
// };

// if (typeof window !== "undefined" && window.Vue) {
//   install(window.Vue);
// }

// // Auto-install when vue is found (eg. in browser via <script> tag)
// /* let GlobalVue = null
// if (typeof window !== "undefined") {
//   GlobalVue = window.Vue
// } else if (typeof global !== "undefined") {
//   GlobalVue = global.Vue
// }
// if (GlobalVue) {
//   GlobalVue.use(IconFont)
// } */

// // To allow use as module (npm/webpack/etc.) export component
// export default { install, 
//   UnitButton, 
//   UnitAlert,
//   UnitLink, 
//   Toast 
// };
// export { install, 
//   UnitButton, 
//   UnitAlert, 
//   UnitLink, 
//   Toast 
// };
// // It's possible to expose named exports when writing components that can
// // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// // export const RollupDemoDirective = component;
