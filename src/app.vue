<template>
    <div class="app" :style="appStyle">
        <div class="left-menu">
                <template v-for="nav in navs">
                  <h3 :key="nav.type">{{ nav.type }}</h3>
                  <div  :key="component.path" v-for="component in nav.components" class="menu-url">
                    <router-link  :key="component.path" :to="component.path">
                      {{component.meta.title}}
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
const navs = function (){
    const navs = routes.filter((route)=>{
        return !route.hidden
    })

    const types = [...new Set(navs.map(({meta})=>meta.type))]
    return types.map((type)=>{
        return {
            type,
            components: navs.filter(({meta})=>meta.type === type)
        }
    })
}
console.log(navs(), 'navs')
export default {
  data() {
    return {
        navs: navs()
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
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<style lang="scss" scoped>
a.router-link-exact-active{
  color:#E6A23C;
}//注意这里的a标签，就是router-link

.app {
  height: 100%;
  width: 100%;
  .left-menu {
    width: 200px;
    border-right: 1px solid #f5f5f5;
    overflow-y: auto;
    background-color: #f5f5f5;
    padding-bottom: 72px;
    position: fixed;
    top:0;
    left:0;
    bottom: 0;
    h3 {
        margin-left: 20px;
        line-height: 36px;
        height: 36px;
      font-size: 28px;
    }
    .menu-url {
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      margin-left: 20px;
    //   background-color: #f5f5f5;
    }
    .menu-url + .menu-url {
        margin-top:5px;
    }
  }
  .right-content {
    padding: 10px;
    background-color: #fff;
    margin-left: 200px;
  }
}
</style>