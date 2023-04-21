<template>
  <div>
    <span
      @mouseover="mouseover()"
      @mouseout="loopFun()"
    >
      <transition-group
        name="moveCartoon"
      >
        <div 
          v-show="show"
          key="start"
          class="swiper-list"
        >
          <div
            v-for="(item, index) in startList"
            :key="index"
            :class="'swiper-item' + index"
          >
            {{ item.name }}
            <img :src="item.url">
          </div>
        </div>
        <div 
          v-show="endshow"
          key="end"
          class="swiper-list"
        >
          <div
            v-for="(item, index) in endList"
            :key="index"
            :class="'swiper-item' + index"
          >
            {{ item.name }}
            <img :src="item.url">
          </div>
        </div>
      </transition-group>
      <span>
        <i 
          class="el-icon-arrow-right"
          @click="pageClick(1)"
        />
      </span>
    </span>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Home',
  data() {
    return {
      show: true,
      endshow: false,
      timer: null,
      count: 3,// 一页有几个栏目
      bigCount: null,// 最多有几页
      index: 1,// 页数
      startList: [],
      endList: [],
      dataList: [
        {
          name: '图1',
          url: require('@/assets/images/point1.png')
        },
        {
          name: '图2',
          url: require('@/assets/images/point2.png')
        },
        {
          name: '图3',
          url: require('@/assets/images/point2o.png')
        },
        {
          name: '图3',
          url: require('@/assets/images/point2o.png')
        },
        {
          name: '图3',
          url: require('@/assets/images/point2o.png')
        },
        {
          name: '图3',
          url: require('@/assets/images/point2o.png')
        },
      ]
    };
  },
  mounted() {
    this.bigCount = Math.ceil(this.dataList.length / this.count);
    this.search();
    
  },
  methods: {
    mouseover() {
      clearInterval(this.timer);
    },
    loopFun() {
      this.timer = setInterval(() => {
        this.pageClick(1);
      }, 6000);
    },
    search() {
      if(!this.show) {
        if(this.index - 1 === 0) {
          this.startList = this.dataList.slice(this.bigCount * this.index - this.count , this.bigCount * this.index);
        }
        else {
          this.startList = this.dataList.slice((this.index - 2) * this.count , this.count * (this.index - 1));
        }
        this.endList = this.dataList.slice((this.index - 1) * this.count , this.count * this.index);
      }
      else {
        if(this.index - 1 === 0) {
          this.endList = this.dataList.slice(this.bigCount * this.index - this.count , this.bigCount * this.index);
        }
        else {
          this.endList = this.dataList.slice((this.index - 2) * this.count , this.count * (this.index - 1));
        }
        this.startList = this.dataList.slice((this.index - 1) * this.count , this.count * this.index);
      }
    },
    pageClick(num) {
      this.showChange();
      setTimeout(() => {
        this.showChange();
        if (num + this.index > this.bigCount) {
          this.index = 1;
        }
        else {
          this.index = this.index + num;
        }
        this.search();
      }, 400);
      
    },
    showChange() {
      if(this.show) {
        this.show = !this.show;
      }
      else {
        this.endshow = !this.endshow;
      }
    }
  }
};
</script> 

<style lang="less" scoped>
  @import 'Swiper';
</style>
