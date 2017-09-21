<template>
  <div class="add-topic-button" @click.stop.prevent="addPaperTopic">&#43;</div>
</template>

<script>
  export default {
    name: 'add-topic-buttn',
    methods: {
      addPaperTopic () {
        this.$emit('addPaperTopic')
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-topic-button {
    position: fixed;
    bottom: 50px;
    right: 20px;
    width: 56px;
    height: 56px;
    line-height: 56px;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    background: #db4437;
    color: #fff;
    border-radius: 50%;
    box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);
    z-index: 1;
    cursor: pointer;
    user-select: none;
    &:hover {
      box-shadow: 0px 2px 10px rgba(0,0,0,.3),
                  0px 0px 1px rgba(0,0,0,.1),
                  inset 0px 1px 0px rgba(255,255,255,.25),
                  inset 0px -1px 0px rgba(0,0,0,.15);
    }
  }
</style>
