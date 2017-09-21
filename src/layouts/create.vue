<template>
  <div class="layout-wrapper">
    <navigator section="create"></navigator>
    <div class="create-page">
      <AddPaper></AddPaper>
      <div class="main-content">
        <div class="paper-wrapper">
          <PaperHeader></PaperHeader>
          <SingleChoice></SingleChoice>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import Navigator from '@/layouts/commons/Navigator.vue'
import AddPaper from '@/components/papers/newTopic.vue'
import PaperHeader from '@/components/papers/PaperHeader.vue'
import SingleChoice from '@/components/papers/SingleChoice.vue'
export default {
  name: 'create',
  components: {
    Navigator,
    AddPaper,
    PaperHeader,
    SingleChoice
  }
}
</script>
