import Vue from "vue";
import Router from "vue-router";

// import Button from "../views/Button.vue";
// import Alert from "../views/Alert.vue";
// import Link from "../views/Link.vue";
// import Progress from "../views/Progress.vue";
// import Avatar from "../views/Avatar.vue";
// import Aside from "../views/Aside.vue";
// import Badge from "../views/Badge.vue";
// import Card from "../views/Card.vue";
// import Container from "../views/Container.vue";
// import Divider from "../views/Divider.vue";
// import Footer from "../views/Footer.vue";
// import Header from "../views/Header.vue";
// import Icon from "../views/Icon.vue";
// import Main from "../views/Main.vue";
// import Spinner from "../views/Spinner.vue";
// import Tag from "../views/Tag.vue";


const assistFiles = require.context('../views/assist', false, /\.vue$/)

const assistComRoutes = generateRoutes(assistFiles, '辅助组件')

const datashowFiles = require.context('../views/datashow', false, /\.vue$/)

const datashowComRoutes = generateRoutes(datashowFiles, '数据展示')


const formFiles = require.context('../views/form', false, /\.vue$/)

const formComRoutes = generateRoutes(formFiles, '数据展示')

const interactiveFiles = require.context('../views/interactive', false, /\.vue$/)

const interactiveComRoutes = generateRoutes(interactiveFiles, '交互组件')

const layoutFiles = require.context('../views/layout', false, /\.vue$/)

const layoutComRoutes = generateRoutes(layoutFiles, '布局组件')

const navigationFiles = require.context('../views/navigation', false, /\.vue$/)

const navigationComRoutes = generateRoutes(navigationFiles, '导航组件')


const noticeFiles = require.context('../views/notice', false, /\.vue$/)

const noticeComRoutes = generateRoutes(noticeFiles, '通知组件')



  function generateRoutes(files, type) {
  const routes = []
  files
    .keys()
    .forEach(path => {
  
      const module = files(path)
      /**
       * 兼容 import export 和 require module.export 两种规范
       */
      const component = module.default || module
      routes.push({
        path: `/${path.slice(2, path.length - 4)}`,
        component,
        meta: { title: path.slice(2, path.length - 4), type: type, icon: "el-icon-s-tools" },
      })
    })
  
    return routes
  }
Vue.use(Router);

export const routes = [
  {
    path: "/",
    redirect: "/Divider",
    hidden: true,
  },
  ...assistComRoutes,
  ...datashowComRoutes,
  ...formComRoutes,
  ...interactiveComRoutes,
 ...layoutComRoutes,
 ...navigationComRoutes,
 ...noticeComRoutes,
  { path: "*", redirect: "/404", hidden: true },
];

const router = new Router({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
