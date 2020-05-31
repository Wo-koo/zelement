<template>
  <div id="app">
    <main-header :v-if="lang !==  'play'"/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  computed:{
    lang(){
      return this.$route.path.split('/')[1] || 'zh-CN';
    }
  }
};
</script>