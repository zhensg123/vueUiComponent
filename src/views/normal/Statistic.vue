<template>
    <div>
      <unit-row :gutter="20">
        <unit-col :span="6">
          <div>
            <unit-statistic
              group-separator=","
              :precision="2"
              :value="value2"
              :title="title"
            ></unit-statistic>
          </div>
        </unit-col>
        <unit-col :span="6">
          <div>
            <unit-statistic title="男女比">
              <template slot="formatter">
                456/2
              </template>
            </unit-statistic>
          </div>
        </unit-col>
    
      </unit-row>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          like: true,
          value1: 4154.564,
          value2: 1314,
          title: "增长人数",
        };
      },
    };
  </script>
  <style lang="scss">
    .like {
      cursor: pointer;
      font-size: 25px;
      display: inline-block;
    }
  </style>