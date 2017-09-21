<template>
  <div class="new-topic">
    <form>
      <p>
        <label>题目:</label>
        <input type="text" class="title" required v-model="editingTopic.title"/>
      </p>
      <p>
        <select v-model="editingTopic.type">
          <option value="SingleChoice">单选</option>
          <option value="GapFilling">填空题</option>
        </select>
      </p>
      <div v-if="editingTopic.type === 'SingleChoice'">
        <p v-for="(option, index) in editingTopic.options">
          <input type="text" class="option" v-model="option.text"/>
          <span class="delete-option" @click.stop.prevent="deleteOption(index)">&times;</span>
        </p>
        <p>
          <input type="button" class="new-option" value="新建选项" @click.stop.prevent="addOption"/>
        </p>
      </div>
      <div class="actions">
        <input type="submit" class="btn btn-info" value="保存" @click.stop.prevent="savePaperTopic(editingTopic)"/>
        <input type="button" class="btn btn-default" value="取消" @click.stop.prevent="cancelEditing"/>
      </div>
  </form>
  </div>
</template>
<script>
  import { newPaperDefault } from '@/constants/Topics.js'
  import tools from '@/utils/tools.js'
  export default {
    name: 'edit-topic',
    props: {
      topic: Object
    },
    data () {
      return {
        editingTopic: this.topic || newPaperDefault.getSingleChoice()
      }
    },
    watch: {
      topic: function (newTopic) {
        this.editingTopic = newTopic
      }
    },
    methods: {
      addOption () {
        this.editingTopic.options.push({
          id: tools.guid(),
          text: '选项'
        })
      },
      deleteOption (index) {
        this.editingTopic.options.splice(index, 1)
      },
      savePaperTopic (topic) {
        this.$emit('savePaperTopic', topic)
      },
      cancelEditing () {
        this.$emit('cancelTopicEditing')
      }
    }
  }
</script>
<style scoped lang="scss">
  .new-topic {
    input {
      padding: 0 8px;
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
    }
    input[type='text'] {
      border: 1px solid #eee;
      border-radius: 4px;
    }
    .new-option {
      margin-left: 40px;
      width: 500px;
      background: #fbfbfb;
      color: #b2b2b2;
      border: 1px dashed #e0e0e0;
      outline: none;
      cursor: pointer;
    }
    label {
      display: inline-block;
      width: 40px;
    }
    select {
      margin-left: 40px;
    }
    .title {
      width: 650px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
    }
    .option {
      margin-left: 40px;
      width: 500px;
    }
    .delete-option {
      margin-left: 10px;
      cursor: pointer;
    }
    .actions {
      margin-top: 40px;
      text-align: center;
    }
    .btn {
      margin: 0 10px;
      width: 80px;
      font-size: 14px;
    }
  }
</style>
