<template>
  <div class="page">
    <el-card class="box-card">
      <div slot="header">
        <h1>路由列表</h1>
      </div>
      <div
        v-for="(item , index) in projectRoutes"
        :key="index"
      >
        <router-link
          v-if="!item.children"
          :to="item.path"
        >
          <div class="item-row">
            {{ item.path }} --- {{ item.name }}
          </div>
        </router-link>
        <div v-if="item.children">
          <ul>
            <li
              v-for="subItem in item.children"
              :key="subItem.path"
            >
              <router-link
                :to="item.path + '/' + subItem.path"
              >
                {{ item.path + '/' + subItem.path }} --- {{ subItem.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { constantRoutes } from '../router';
export default {
  data() {
    return {
      projectRoutes: constantRoutes,
    };
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    }
  }
};
</script>

<style scoped lang="less">
  .page{
    display: flex;
    flex-flow: row;
    height: 100vh
  }
  .box-card {
    width: 50%;
    height: 100%;
    overflow: auto;
    margin: 10px;
  }
  .item-row{
    font-size: 16px;
    line-height: 36px;
  }
</style>
