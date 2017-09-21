<template>
  <div class="single-choice">
    <div class="single-choice-show">
      <h3 class="topic-title">{{topicIndex + 1}}.{{paperTopic.title}}</h3>
      <ul>
        <li v-for="(item, index) in paperTopic.options">
          <input type="radio" :id="item.id" name="paperTitle.id"/>
          <label :for="item.id">{{item.text}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'single-choice',
    props: {
      topic: Object,
      topicIndex: Number
    },
    data () {
      return {
        paperTopic: this.topic
      }
    },
    watch: {
      topic: function (newTopic) {
        this.paperTopic = newTopic
      }
    }
  }
</script>

<style scoped lang="scss">
  .single-choice {
    position: relative;
    .single-choice-show {
      h2 {
        margin: 0 0 20px;
      }
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
          padding: 10px 0;
        }
        label {
          cursor: pointer;
        }
      }
    }
  }
</style>
