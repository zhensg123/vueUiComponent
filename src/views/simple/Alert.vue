<template>
    <div class="unit-alert">
        <UnitAlert style="width:100px" class="my-class" border my-attr="23232323">测试</UnitAlert>
        <xoneHightlightjs value="怎么获取单文件组件内的代码呢">
           
        </xoneHightlightjs>
        <div class="lu">
            Free
            <!-- <div></div>
            <div class="beijing"></div>
            <div></div>
            <div></div>
            <div></div> -->
        </div>
    </div>
</template>
<script>
import alert from '../../packages/simple/unit-alert.vue'
export default {
    
}
</script>
<style scoped lang="scss">
.lu {
    display: flex;
    justify-content: center;
    margin-top:50px;
    div {
      width: 5px;
      background-color: #909399;
      height: 200px;
      margin-left: 20px;
    }
    div.beijing {
        background-color: #67C23A
;

    }
}
</style>
