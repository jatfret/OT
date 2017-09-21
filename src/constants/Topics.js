import tools from '@/utils/tools.js'

const newPaperDefault = {
  title: '试卷标题',
  description: '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见,期待您的参与！现在我们就马上开始吧！',
  getSingleChoice () {
    return {
      id: tools.guid(),
      title: '',
      type: 'SingleChoice',
      options: [
        {
          id: tools.guid(),
          text: '选项'
        },
        {
          id: tools.guid(),
          text: '选项'
        }
      ]
    }
  }

}

export { newPaperDefault }
