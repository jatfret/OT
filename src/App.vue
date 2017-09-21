<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .btn {
      display: inline-block;
      padding: 6px 12px;
      line-height: 1.4;
      border: 1px solid transparent;
      border-radius: 4px;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      outline: none;
      user-select: none;
      cursor: pointer;
  }
  .btn-default {
    color: #2c3e50;
    background: #fff;
    border-color: #eee;
  }
  .btn-primary {
    color: #fff;
    background: #5cb85c;
    border-color: #5cb85c;
  }
  .btn-info {
    color: #fff;
    background: #479de6;
    border-color: #479de6;
  }
  .btn-important {
    color: #fff;
    background: #db4437;
    border-color: #db4437;
  }
  .main-content {
    padding: 30px 0;
    background: #e6e9eb;
    min-height: calc(100vh - 120px);
  }
  .paper-wrapper {
    margin: 0 auto;
    padding: 120px 50px 80px;
    width: 1000px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  }
</style>
