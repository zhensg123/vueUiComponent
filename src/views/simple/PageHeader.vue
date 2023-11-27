<template>
    <unit-page-header @back="goBack" content="详情页面">
</unit-page-header>

</template>
<script>
  export default {
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>