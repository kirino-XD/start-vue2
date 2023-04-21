<template>
  <div>
    <el-date-picker
      v-model="date"
      size="small"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="dataPickFun"
    />
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Home',
  data() {
    return {
      date: '',
    };
  },
  methods: {
    dataPickFun() {
      console.log(moment(this.date[0]).format('YYYY-MM-DD'));
    }
  }
};
</script> 
