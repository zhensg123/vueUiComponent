<template>
    <unit-row>
  <unit-col :sm="12" :lg="6">
    <unit-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <unit-button type="primary" size="medium">返回</unit-button>
      </template>
    </unit-result>
  </unit-col>
  <unit-col :sm="12" :lg="6">
    <unit-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <unit-button type="primary" size="medium">返回</unit-button>
      </template>
    </unit-result>
  </unit-col>
  <unit-col :sm="12" :lg="6">
    <unit-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <unit-button type="primary" size="medium">返回</unit-button>
      </template>
    </unit-result>
  </unit-col>
  <unit-col :sm="12" :lg="6">
    <unit-result icon="info" title="信息提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <unit-button type="primary" size="medium">返回</unit-button>
      </template>
    </unit-result>
  </unit-col>
</unit-row>
</template>