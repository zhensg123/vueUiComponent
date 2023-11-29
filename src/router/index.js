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
const simpleFiles = require.context('../views/simple', false, /\.vue$/)
const simpleComRoutes = []
simpleFiles
  .keys()
  .forEach(path => {

    const module = simpleFiles(path)
    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    const component = module.default || module
    simpleComRoutes.push({
      path: `/${path.slice(2, path.length - 4)}`,
      component,
      meta: { title: path.slice(2, path.length - 4), type:'simple', icon: "el-icon-s-tools" },
    })
  })

  const normalFiles = require.context('../views/normal', false, /\.vue$/)
const normalComRoutes = []
normalFiles
  .keys()
  .forEach(path => {

    const module = simpleFiles(path)
    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    const component = module.default || module
    normalComRoutes.push({
      path: `/${path.slice(2, path.length - 4)}`,
      component,
      meta: { title: path.slice(2, path.length - 4), type:'normal', icon: "el-icon-s-tools" },
    })
  })
Vue.use(Router);

export const routes = [
  {
    path: "/",
    redirect: "/Alert",
    hidden: true,
  },
  ...simpleComRoutes,
  ...normalComRoutes,
  { path: "*", redirect: "/404", hidden: true },
];

const router = new Router({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
