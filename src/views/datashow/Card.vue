<template>
    <unit-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <unit-button style="float: right; padding: 3px 0" type="text">操作按钮</unit-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </unit-card>
</template>
  
  <style scoped>
    .text {
      font-size: 14px;
    }
  
    .item {
      margin-bottom: 18px;
    }
  
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
  
    .box-card {
      width: 480px;
    }
  </style>