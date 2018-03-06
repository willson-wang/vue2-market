<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="less">
@import '~normalize.css/normalize.css';
@import './assets/less/table.less';
@import (reference) './assets/less/index.less';
#app {
  font-family: 'Helvetica Neue',Helvetica,Arial,'Microsoft Yahei','Hiragino Sans GB','Heiti SC','WenQuanYi Micro Hei',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @base-info2;
}
</style>
