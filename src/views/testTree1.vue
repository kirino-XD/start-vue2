<!-- 测试组织架构图 -->
<template>
  <div class="org-boxs">
    <vue2-org-tree
      name="test"
      :data="datas"
      :horizontal="horizontal"
      :label-class-name="labelClassName"
 
      :render-content="renderContent"
      collapsable
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    />
  </div>
</template>

<script>
export default {
  name: 'TestTree',
  data() {
    return {
      horizontal: false,
      collapsable: false,
      expandAll: true,
      labelClassName: 'bg-none',
      datas: {
        id: '1',
        label: '老张伟',
        position: '董事长',
        img: require('@/assets/images/party-person.png'),
        relations: '1',
        children: [
          {
            id: '1-1',
            label: '大张嘎',
            position: '总经理',
            img: '@/assets/images/party-person.png',
            relations: '1-1',
            children: [
              {
                id: '1-1-1',
                label: '小张嘎',
                position: '策划部',
                img: '@/assets/images/party-person.png',
                relations: '1-1',
              },
              {
                id: '1-1-2',
                label: '中张嘎',
                position: '规划部',
                img: '@/assets/images/party-person.png',
                relations: '1-1',
              },
            ]
          },
          {
            id: '1-2',
            label: '大刘彪',
            position: '秘书长',
            img: '@/assets/images/party-person.png',
            relations: '1-2',
            children: [
              {
                id: '1-2-1',
                label: '中刘彪',
                position: '人事部',
                img: '@/assets/images/party-person.png',
                relations: '1-2',
              },
              {
                id: '1-2-2',
                label: '小刘彪',
                position: '行政部',
                img: '@/assets/images/party-person.png',
                relations: '1-2',
              },
            ]
          },
          {
            id: '1-3',
            label: '大美女',
            position: '财务总监',
            img: '@/assets/images/party-person.png',
            relations: '1-3',
            children: [
              {
                id: '1-3-1',
                label: '中美女',
                position: '财务部',
                img: '',
                relations: '1-3',
                sex: 2,
                children: [
                  {
                    id: '1-3-1-1',
                    label: '小美女',
                    position: '财务科',
                    img: '',
                    sex: 0,
                    relations: '1-3',
                  },
                ]
              },
            ]
          },
          {
            id: '1-4',
            label: '大霸王',
            position: '技术总监',
            img: '',
            sex: 1,
            relations: '1-4',
            children: [
              {
                id: '1-4-1',
                label: '小霸王',
                position: '技术部',
                img: '@/assets/images/party-person.png',
                relations: '1-4',
              },
              {
                id: '1-4-2',
                label: '中霸王',
                position: '研发部',
                img: '@/assets/images/party-person.png',
                relations: '1-4',
              },
            ]
          },
          {
            id: '1-5',
            label: '大赵帅',
            position: '运营总监',
            img: '@/assets/images/party-person.png',
            relations: '1-5',
            children: [
              {
                id: '1-5-1',
                label: '小赵帅',
                position: '市场部',
                img: '@/assets/images/party-person.png',
                relations: '1-5',
              },
              {
                id: '1-5-2',
                label: '中赵帅',
                position: '销售部',
                img: '@/assets/images/party-person.png',
                relations: '1-3',
              },
              {
                id: '1-5-3',
                label: '老赵帅',
                position: '执行部',
                img: '@/assets/images/party-person.png',
                relations: '1-5',
              },
            ]
          },
        ],
      },
      manUrl: require('@/assets/images/party-person.png'),
      womanUrl: require('@/assets/images/party-person.png'),
      shemaleUrl: require('@/assets/images/party-person.png'),
    };
  },
  create() {
    this.initOrg();
  },
  methods: {
    renderContent(h, data) {
      return (
        <span style='width:100%;height:100%;display:block;padding:10px 15px;border-radius:3px;' class={data.relations === '1-1' ? 'bg-tomato' : (data.relations === '1-2' ? 'bg-gold' : (data.relations === '1-3' ? 'bg-gray' : (data.relations === '1-4' ? 'bg-lightpink' : (data.relations === '1-5' ? 'bg-blue' : 'bg-green'))))}>
          <dd style='height:6vh;border-radius:50%;padding:0;margin-bottom:1vh;'><img style='width:6vh;height:6vh;border-radius:50%;' src={data.img ? data.img : (data.sex === 1 ? this.manUrl : (data.sex === 2 ? this.womanUrl : this.shemaleUrl))}/></dd>
          <dd style='font-size:1.6vh;'>{data.label}</dd>
          <dd style='font-size:1vh;'>{data.position}</dd>
        </span>
      );
    },
    initOrg() {
      this.$set(this.datas,'expand',true);
      if(this.datas.children) {
        this.datas.children.forEach((item,index)=>{
          this.$set(item,'expand',true);
        });
      }
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, 'expand', true);
      }
    },
    // 点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      // console.log(data.label);
      if(data.url === null) {
        return false;
      }else{
        window.open(data.url);
      }
    },
    collapse(list) {
      var _this = this;
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, 'expand', val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, 'expand', val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script> 
<style rel="stylesheet/scss" scoped lang="less">
@colors:#1FAAEB;
.org-tree-container {
  display: inline-block;
  padding: 15px;
  background-color: #fff;
}

.org-tree {
  // display: inline-block;
  display: table;
  text-align: center;

  &:before, &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
}

.org-tree-node,
.org-tree-node-children {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &:before, &:after {
    transition: all .35s;
  }
}
.org-tree-node-label {
  position: relative;
  display: inline-block;

  .org-tree-node-label-inner {
    padding: 10px 15px;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
  }
}
.org-tree-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid @colors;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
  cursor: pointer;
  transition: all .35s ease;

  &:hover {
    background-color: #e7e8e9;
    transform: scale(1.15);
  }

  &:before, &:after {
    content: '';
    position: absolute;
  }

  &:before {
    top: 50%;
    left: 4px;
    right: 4px;
    height: 0;
    border-top: 1px solid @colors;
  }

  &:after {
    top: 4px;
    left: 50%;
    bottom: 4px;
    width: 0;
    border-left: 1px solid @colors;
  }

  &.expanded:after {
    border: none;
  }
}
.org-tree-node {
  padding-top: 20px;
  display: table-cell;
  vertical-align: top;

  &.is-leaf, &.collapsed {
    padding-left: 10px;
    padding-right: 10px;
  }

  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
  }

  &:after {
    left: 50%;
    border-left: 1px solid @colors;
  }

  &:not(:first-child):before,
  &:not(:last-child):after {
    border-top: 1px solid @colors;
  }

}
.collapsable .org-tree-node.collapsed {
  padding-bottom: 30px;

  .org-tree-node-label:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 50%;
    height: 20px;
    border-right: 1px solid @colors;
  }
}
.org-tree > .org-tree-node {
  padding-top: 0;

  &:after {
    border-left: 0;
  }
}
.org-tree-node-children {
  padding-top: 20px;
  display: table;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 20px;
    border-right: 1px solid @colors;
    border-left: none;
  }

  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.horizontal {
  .org-tree-node {
    // display: flex;
    // flex-direction: row;
    // justify-content: flex-start;
    // align-items: center;
    display: table-cell;
    float: none;
    padding-top: 0;
    padding-left: 20px;

    &.is-leaf, &.collapsed {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    &:before, &:after {
      width: 19px;
      height: 50%;
    }

    &:after {
      top: 50%;
      left: 0;
      border-left: 0;
    }

    &:only-child:before {
      top: 1px;
      border-bottom: 1px solid @colors;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      border-top: 0;
      border-left: 1px solid @colors;
    }

    &:not(:only-child):after {
      border-top: 1px solid @colors;
    }

    .org-tree-node-inner {
      display: table;
    }

  }

  .org-tree-node-label {
    display: table-cell;
    vertical-align: middle;
  }

  &.collapsable .org-tree-node.collapsed {
    padding-right: 30px;

    .org-tree-node-label:after {
      top: 0;
      left: 100%;
      width: 20px;
      height: 50%;
      border-right: 0;
      border-bottom: 1px solid @colors;
    }
  }

  .org-tree-node-btn {
    top: 50%;
    left: 100%;
    margin-top: -11px;
    margin-left: 9px;
  }

  & > .org-tree-node:only-child:before {
    border-bottom: 0;
  }

  .org-tree-node-children {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;
    display: table-cell;
    padding-top: 0;
    padding-left: 20px;

    &:before {
      top: 50%;
      left: 0;
      width: 20px;
      height: 0;
      border-left: 0;
      border-top: 1px solid @colors;
    }

    &:after {
      display: none;
    }

    & > .org-tree-node {
      display: block;
    }
  }
}

  .org-boxs{
    width:100%;
    height:100%;
    text-align: center;
    /*background: #030C24;*/
    background-image: -webkit-radial-gradient(ellipse farthest-corner at center 40%, #000d4d 0%, #000105 100%);
    background-image: radial-gradient(ellipse farthest-corner at center 40%, #000d4d 0%, #000105 100%);
    overflow-y: scroll;
  }
  .org-tree-container{
    background:none!important;
  }
  .org-tree-node-label {
    white-space: nowrap;
  }
  .bg-none{
    background-color:#030C24;
    color:#ffffed;
  }
  .bg-white {
     background-color: #ECF5FF;
   }
  .org-tree-node-label .org-tree-node-label-inner {
    width:6vw;
    padding: 0px 0px;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
   /* border: 1px solid @colors;*/
    overflow: hidden;
    box-sizing: border-box;
  }
  .bg-tomato {
    background-color: #9E4A1C;
  }
  .bg-gold {
    background-color: #ECA150;
  }
  .bg-gray {
    background-color: #DECEAA;
  }
  .bg-lightpink {
    background-color: lightpink;
  }
  .bg-blue {
    background-color: #057D9F;
  }
  .bg-green {
    background-color: #50CB90;
  }
</style>