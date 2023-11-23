import Vue from "vue";
import Router from "vue-router";

import Button from "../views/Button.vue";
import Alert from "../views/Alert.vue";
import Link from "../views/Link.vue";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    redirect: "/button",
    hidden: true,
  },
  {
    path: "/button",
    component: Button,
    meta: { title: "Button", icon: "el-icon-s-tools" },
  },
  {
    path: "/alert",
    component: Alert,
    meta: { title: "Alert", icon: "el-icon-s-tools" },
  },
  {
    path: "/link",
    component: Link,
    meta: { title: "Link", icon: "el-icon-s-tools" },
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new Router({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
