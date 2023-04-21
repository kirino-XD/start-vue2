<template>
  <div>
    <div class="form">
      <el-form
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item
          label="姓名"
          :prop="name"
        >
          <el-input
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          label="电话"
          :prop="phone"
        >
          <el-input
            v-model="form.phone"
          />
        </el-form-item>
      </el-form>
    </div>
    
    <el-button
      :loading="loading"
      @click="loadingFun"
    > 
      1111
    </el-button>
    <el-rate
      v-model="rate"
      show-text
    />
    <div>
      {{ textChange(text) }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return { 
      loading: false,
      rate: '3',
      form: {
        name: '',
        phone: ''
      },
      rules: {
        name: [
          {require: true, message: '请输入', trigger: 'blur'}
        ],
        phone: [
          {require: true, message: '请输入', trigger: 'blur'}
        ]
      },
      text: '00000000000000000000000011111111111111111111111111111111111111111111111111'
    };
  },
  methods: {
    loadingFun() {
      this.loading = true;
    },
    textChange(val) {
      if(val.length > 10) {
        console.log(val.slice(0 ,10));
      }
    } 
  }
};
</script>

<style lang="less" scoped>
@import 'testButton';
</style>
