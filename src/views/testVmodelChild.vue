<template>
  <div class="box">
    <span>{{ value }}</span><button @click="testVModel">
      测试v-model
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeChild',
  props: {
    value: {type: String,default: ''}
  },
  methods: {
    testVModel() {
      this.$emit('input', '我是子组件');
    }
  }
};
</script> 
