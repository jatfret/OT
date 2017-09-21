<template>
  <div class="paper-header">
    <input
      type="text"
      required
      class="paper-title"
      maxlength="100"
      v-model="paperTitle"
      @change.stop.prevent="savePaper"
      @input.stop.prevent="paperHeaderInput"
    />
    <textarea
      type="text"
      class="paper-description"
      maxlength="300"
      v-model="paperDescription"
      @change.stop.prevent="savePaper"
      @input.stop.prevent="paperHeaderInput"
    >
    </textarea>
  </div>
</template>

<script>
  export default {
    name: 'paper-header',
    props: {
      title: String,
      description: String
    },
    data () {
      return {
        paperTitle: this.title,
        paperDescription: this.description
      }
    },
    watch: {
      title: function (newTitle) {
        this.paperTitle = newTitle
      },
      description: function (newDescription) {
        this.paperDescription = newDescription
      }
    },
    methods: {
      savePaper () {
        this.$emit('savePaper')
      },
      paperHeaderInput () {
        this.$emit('paperHeaderInput', this.paperTitle, this.paperDescription)
      }
    }
  }
</script>

<style scoped lang="scss">
  .paper-title {
    margin: 20px 0;
    padding: 2px 10px;
    width: 100%;
    font-size: 24px;
    line-height: 1.4;
    text-align: center;
    border: none;
    &:hover{
      box-shadow: 0 0 10px rgba(0,0,0,0.07);
    }
  }
  .paper-description {
    margin: 20px 0;
    padding: 10px;
    width: 100%;
    max-width: 100%;
    min-height: 100px;
    font-size: 16px;
    line-height: 1.8;
    border: none;
    resize: none;
    box-sizing:border-box;
    &:hover{
      box-shadow: 0 0 10px rgba(0,0,0,0.07);
    }
  }
</style>
