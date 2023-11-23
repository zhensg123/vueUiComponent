<template>
    <main class="el-main">
      <slot></slot>
    </main>
  </template>
  
  <script>
    export default {
      name: 'UnitMain',
      componentName: 'UnitMain'
    };
  </script>
  <style scoped>
  .el-main{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-preferred-size:auto;flex-basis:auto;overflow:auto;-webkit-box-sizing:border-box;box-sizing:border-box;padding:20px}
  </style>