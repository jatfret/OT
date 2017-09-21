<template>
  <div class="index-page">
    <ul>
      <li>
        <router-link to="/" v-bind:class="{active: section === 'index'}">首页</router-link>
      </li>
      <li>
        <router-link to="/list" v-bind:class="{active: section === 'list'}">我的列表</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      section: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul{
    margin: 0;
    padding: 0 20px;
    border-bottom: 1px solid #eaeaea;
    list-style: none;
    overflow: hidden;
    li {
      float: left;
      height: 60px;
      line-height: 60px;
      a {
        margin-right: 20px;
        padding-bottom: 10px;
        color: #2f8cdb;
        text-decoration: none;
      }
      .active {
        border-bottom: 2px solid #479de6;
      }
    }
  }
</style>
