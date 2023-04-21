<!-- 测试组织架构图 -->
<template>
  <div class="org-boxs">
    <vue2-org-tree
      :data="data"
      :label-class-name="labelClassName"
      collapsable
      @on-expand="onExpand"
      @on-node-click="NodeClick"
      :renderContent="renderContent"
      @on-node-mouseover="onMouseover"
      @on-node-mouseout="onMouseout"
    />
  </div>
</template>

<script>
export default {
  name: 'TestTree',
  data() {
	 return{
	  labelClassName: "bg-color-orange",
      basicInfo: { id: null, label: null },
      basicSwitch: false,
      data: {
        id: 0,
        label: "XXX科技有限公司",
        children: [
          {
            id: 2,
            label: "产品研发部",
            key: '兴科社区党委',
            children: [
              {
                id: 5,
                label: "研发-前端",
                children: [
                  {
                    id: 55,
                    label: "前端1"
                  },
                  {
                    id: 56,
                    label: "前端2"
                  },
                  {
                    id: 57,
                    label: "前端3"
                  },
                  {
                    id: 58,
                    label: "前端4"
                  }
                ]
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          }
        ]
      },
	}
},
methods:{
	//渲染节点
	renderContent(h, data) {
      return (
        <div>
          <div>
            <span>
              {data.key}
            </span>
            <i class="el-icon-user-solid"></i>
            <span>{data.label}</span>
            <span>男</span>
          </div>
          <div style="font-size:12px;line-height:20px;">测试人员</div>
        </div>
      );
    },
    //鼠标移出
    onMouseout(e, data) {
      this.basicSwitch = false;
    },
    //鼠标移入
    onMouseover(e, data) {
      this.basicInfo = data;
      this.basicSwitch = true;
      var floating = document.getElementsByClassName("floating")[0];
      floating.style.left = e.clientX + "px";
      floating.style.top = e.clientY + "px";
    },
    //点击节点
    NodeClick(e, data) {
      console.log(e, data);
    },
    //默认展开
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach(item => {
          this.$set(item, "expand", val);
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
    collapse(list) {
      list.forEach(child => {
        if (child.expand) {
          child.expand = false;
        }
        child.children && this.collapse(child.children);
      });
    },
    //展开
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
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
</style>