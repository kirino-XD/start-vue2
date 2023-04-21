<template>
  <home-child
    v-model="vModelData"
    @input="testFun"
  />
</template>

<script>
import HomeChild from './testVmodelChild.vue';
export default {
  name: 'Home',
  components: {HomeChild},
  data() {
    return {
      vModelData: 'hello v-model'
    };
  },
  methods: {
    testFun() {
      console.log(1111);
    }
  }
};
</script> 
