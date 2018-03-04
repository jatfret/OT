<template>
  <div>
    <navigator section="index"></navigator>
    <div class="index-page-container">
      <p>当前有很多产品都支持在线实时协同编辑，比如 Google Docs、石墨文档等文档类产品，
      也有 Dropbox、iCloud 等云盘应用。</p>
      <p>本示例基于腾讯问卷的业务场景做了一个在线实时协同编辑的功能。</p>
      <p>如何使用：</p>
      <ul>
        <li>打开多个浏览器窗口或者多个标签页</li>
        <li>进入同一个已有的问卷详情页进行编辑</li>
        <li>在标题输入框编辑失去焦点，或单个题目点击保存后，问卷的修改回同步到其它问卷的其它编辑页</li>
      </ul>
    </div>
    </div>
</template>


<script>
import Navigator from '@/layouts/commons/Navigator.vue'
export default {
  name: 'index',
  components: { Navigator }
}
</script>
<style>
  .index-page-container {
    padding: 20px;
  }
</style>
