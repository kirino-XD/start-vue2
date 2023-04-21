<template>
  <div>
    <Editor v-model="yourContent" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { 
      yourContent: null
    };
  },
};
</script>

<style>
</style>
