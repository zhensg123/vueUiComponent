<template>
  <unit-radio-group v-model="radio">
    <unit-radio :label="3">备选项</unit-radio>
    <unit-radio :label="6">备选项</unit-radio>
    <unit-radio :label="9">备选项</unit-radio>
  </unit-radio-group>


</template>
<script>
  export default {
    data () {
      return {
        radio: 3
      };
    }
  }
</script>