<template>
    <div class="app" :style="appStyle">
        <div class="left-menu">
                <template v-for="route in routes">
                  <div v-if="!route.hidden" :key="route.path"  class="menu-url">
                    <router-link  :key="route.path" :to="route.path">
                      {{route.meta.title}}
                      </router-link>
                   </div>
                </template>
        </div>
        <div class="right-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { routes } from "./router";
export default {
  data() {
    return {
      routes,
    };
  },
  computed: {
    appStyle() {
      return {
        height: window.innerHeight + "px",
        width: window.innerWidth + "px",
      };
    },
  },
  methods: {},
  created() {
    console.log(routes);
  },
  mounted() {},
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
a.router-link-exact-active{
  color:#409EFF;
}//注意这里的a标签，就是router-link

.app {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  .left-menu {
    width: 200px;
    border-right: 1px solid #f5f5f5;
    overflow-y: auto;
    .menu-url {
      text-align: center;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      background-color: #f5f5f5;
    }
    .menu-url + .menu-url {
        margin-top:5px;
    }
  }
  .right-content {
    padding: 10px;
    flex: 1;
    background-color: #fff;
  }
}
</style>