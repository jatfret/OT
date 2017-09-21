<template>
  <div class="gap-filling">
    <h3 class="topic-title">{{topicIndex + 1}}.{{paperTopic.title}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'gap-filling',
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
