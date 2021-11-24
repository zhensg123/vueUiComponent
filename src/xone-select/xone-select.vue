<template>
  <el-select v-bind="$attrs" :clearable='clearable' v-on="$listeners" v-model="ivalue">
    <el-option
      v-for="(item, index) in list"
      :key="index"
      :value="item.xvalue"
      :label="item.xlabel"
      :disabled='item.disabled || false'
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'XoneSelect',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String, Array, Boolean],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ivalue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
