<template>
  <div>
    <button @click="bol = !bol">
      隐藏/显示
    </button>
    <!-- transition 标签元素设置了 name、appear 属性 -->
    <transition
      name="moveCartoon"
      appear
    >
      <!-- 动画会在一开始便生效 -->
      <h1 v-show="bol">
        组件动画效果
      </h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { bol: true };
  },
};
</script>

<style>
/* 类名要对应回 name 的属性值 */
.moveCartoon-enter-active {
    animation: move 1s;
}
.moveCartoon-leave-active {
    animation: move 1s reverse;
}

@keyframes move {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translate(0);
    }
}
</style>
