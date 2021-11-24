// Import vue component
import XoneButton from "./xone-button/index"
import XoneSelect from "./xone-select/index"


// Declare install function executed by Vue.use()
/* export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component(IconFont.name, component)
}

// Create module definition for Vue.use()
const plugin = {
  install
} */
const components = [
  XoneButton,
  XoneSelect
]

// will install the plugin only once
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

// Auto-install when vue is found (eg. in browser via <script> tag)
/* let GlobalVue = null
if (typeof window !== "undefined") {
  GlobalVue = window.Vue
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(IconFont)
} */

// To allow use as module (npm/webpack/etc.) export component
export default { install, XoneButton, XoneSelect }
export  {
  install,
  XoneButton,
  XoneSelect
}
// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
