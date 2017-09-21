<template>
  <div class="layout-wrapper">
    <navigator section="edit"></navigator>
    <transition name="slide-fade">
      <div class="message-wrapper" v-show="showMessage">
        <div class="content">{{pushMessage}}</div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="user-wrapper" v-show="onlineUsers || username">
        <p>同时编辑人数: {{onlineUsers}}</p>
        <p>当前用户: {{username}}</p>
      </div>
    </transition>
    <div class="edit-page">
      <div class="main-content">
        <div class="paper-wrapper">
          <paper-header
            v-bind:title="paper.title"
            v-bind:description="paper.description"
            v-on:savePaper="savePaper"
            v-on:paperHeaderInput="paperHeaderInput"
          >
          </paper-header>
          <div
            v-bind:class="{'topic-wrapper': true, 'editing-wrapper': topicEditingID === topic.id}"
            v-for="(topic, index) in paper.topics"
            v-on:click="switchToEdit(topic.id)"
          >
            <edit-topic
              v-if="topicEditingID === topic.id"
              v-bind:topic="topic"
              v-on:savePaperTopic="savePaperTopic"
              v-on:cancelTopicEditing="cancelTopicEditing"
            >
            </edit-topic>
            <single-choice
              v-else-if="topic.type === 'SingleChoice'"
              v-bind:topic="topic"
              v-bind:topicIndex="index"
            >
            </single-choice>
            <gap-filling
              v-else-if="topic.type === 'GapFilling'"
              v-bind:topic="topic"
              v-bind:topicIndex="index"
              v-on:switchToEdit="switchToEdit"
            >
            </gap-filling>
            <div class="action" v-show="topicEditingID !== topic.id">
              <span class="action-btn move-up-topic" v-on:click.stop.prevent="movePaperTopic('up', topic.id)">&#8593;</span>
              <span class="action-btn move-down-topic" v-on:click.stop.prevent="movePaperTopic('down', topic.id)">&#8595;</span>
              <span class="action-btn delete-topic" v-on:click.stop.prevent="deletePaperTopic(topic.id)">&times;</span>
            </div>
          </div>
          <div class="add-wrapper" v-if="topicAdding">
            <edit-topic
              v-on:savePaperTopic="savePaperTopic"
              v-on:cancelTopicEditing="cancelTopicEditing"
            >
            </edit-topic>
          </div>
          <add-topic-button v-on:addPaperTopic="addPaperTopic"></add-topic-button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import io from 'socket.io-client'
import { remotePath } from '@/constants/RemotePath.js'
import tools from '@/utils/tools.js'
import operationTransform from '@/utils/operationTransform.js'
import Navigator from '@/layouts/commons/Navigator.vue'
import EditTopic from '@/components/papers/EditTopic.vue'
import AddTopicButton from '@/components/papers/AddTopicButton.vue'
import PaperHeader from '@/components/papers/PaperHeader.vue'
import SingleChoice from '@/components/papers/SingleChoice.vue'
import GapFilling from '@/components/papers/GapFilling.vue'
import { newPaperDefault } from '@/constants/Topics.js'
export default {
  name: 'edit',
  components: {
    Navigator,
    EditTopic,
    AddTopicButton,
    PaperHeader,
    SingleChoice,
    GapFilling
  },
  data () {
    return {
      socket: io.connect(`${remotePath.socketHost}`, {forceNew: false}),
      pushMessage: null,
      onlineUsers: null,
      username: null,
      id: this.$route.params.id,
      topicAdding: false,
      topicEditingID: null,
      isNew: this.$route.params.id === undefined,
      paper: {
        title: newPaperDefault.title,
        description: newPaperDefault.description,
        topics: []
      },
      originPaper: {
        title: newPaperDefault.title,
        description: newPaperDefault.description,
        topics: []
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.socket.emit('forceDisconnect', {username: this.username})
    next()
  },
  mounted () {
    if (!this.isNew) {
      this.fetchPaper()
    }
    this.socket.on('userLogin', (res) => {
      this.username = res.username
    })
    this.socket.on('pushMessage', (res) => {
      console.log(res)
      let time
      if (time) {
        clearTimeout(time)
      }
      this.pushMessage = res.message
      this.username = res.username
      this.onlineUsers = res.onlineUsers
      time = setTimeout(() => {
        this.pushMessage = null
      }, 10000)
    })
    this.socket.on('updateSuccess', (res) => {
      console.log('received updated message:', res)
      if (res.data.status) {
        if (this.id === res.data.paper._id) {
          if (tools.stringifyJSON(res.data.paper) !== tools.stringifyJSON(this.originPaper)) {
            const computedResult = this.getComputedResult(res.data.paper)
            this.paper = _.cloneDeep(computedResult)
            this.originPaper = _.cloneDeep(computedResult)
          }
        }
      }
    })
  },
  computed: {
    showMessage: function () {
      return !!this.pushMessage
    }
  },
  methods: {
    getComputedResult (serverPaper) {
      const originPaperText = tools.stringifyJSON(_.cloneDeep(this.originPaper))
      const serverPaperText = tools.stringifyJSON(_.cloneDeep(serverPaper))
      const editingPaperText = tools.stringifyJSON(_.cloneDeep(this.paper))
      const csA = operationTransform.computedChanges(originPaperText, editingPaperText)
      const csB = operationTransform.computedChanges(originPaperText, serverPaperText)
      const transformsCsB = csB.transformAgainst(csA)
      const editingPaperTextNew = csA.apply(originPaperText)
      const transformedText = transformsCsB.apply(editingPaperTextNew)
      console.log('originPaperText:', originPaperText)
      console.log('serverPaperText:', serverPaperText)
      console.log('editingPaperText:', editingPaperText)
      console.log('csA:', csA)
      console.log('csB:', csB)
      console.log('transformsCsB:', transformsCsB)
      console.log('editingPaperTextNew:', editingPaperTextNew)
      console.log('textNew:', transformedText)
      return tools.parseJSON(transformedText)
    },
    fetchPaper () {
      const url = `${remotePath.path}/paper/getPaper?id=${this.id}`
      axios.get(url)
        .then((response) => {
          this.paper = _.cloneDeep(response.data.data.paper)
          this.originPaper = _.cloneDeep(response.data.data.paper)
        }).catch((err) => {
          alert(err)
        })
    },
    addPaperTopic () {
      this.topicAdding = true
    },
    switchToEdit (id) {
      if (this.topicEditingID) return
      this.topicEditingID = id
    },
    getTopicIndex (id) {
      let topicIndex
      this.paper.topics.filter((item, index) => {
        if (item.id === id) {
          topicIndex = index
          return true
        }
      })
      return topicIndex
    },
    savePaperTopic (topic) {
      if (this.topicAdding) {
        this.paper.topics.push(topic)
      } else {
        const topicIndex = this.getTopicIndex(topic.id)
        this.paper.topics.splice(topicIndex, 1, topic)
      }
      this.savePaper()
    },
    deletePaperTopic (id) {
      const topicIndex = this.getTopicIndex(id)
      this.paper.topics.splice(topicIndex, 1)
      this.savePaper()
    },
    movePaperTopic (direction, id) {
      const topicIndex = this.getTopicIndex(id)
      if ((direction === 'up' && !topicIndex) ||
         (direction === 'down' && topicIndex === this.paper.topics.length - 1)
      ) {
        return
      }

      let topics = _.cloneDeep(this.paper.topics)
      const currentTopic = topics.splice(topicIndex, 1)[0]
      if (direction === 'up') {
        topics.splice(topicIndex - 1, 0, currentTopic)
      } else {
        topics.splice(topicIndex + 1, 0, currentTopic)
      }
      this.paper.topics = topics
      this.updatePaper()
    },
    cancelTopicEditing () {
      console.log('cancel')
      this.topicAdding = false
      this.topicEditingID = null
    },
    paperHeaderInput (title, description) {
      this.paper.title = title
      this.paper.description = description
    },
    createPaper () {
      return axios.post(`${remotePath.path}/paper/createPaper`)
    },
    updatePaper () {
      const paperJSON = tools.stringifyJSON(this.paper)
      console.log(paperJSON)
      axios({
        method: 'post',
        url: `${remotePath.path}/paper/updatePaper`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: paperJSON
      }).then((response) => {
        this.originPaper = _.cloneDeep(this.paper)
        if (!this.isNew) {
          this.socket.emit('updatePaper', {id: this.id})
        }
        this.isNew = false
      }).catch((err) => {
        alert(err)
      })
    },
    savePaper () {
      console.log(1)
      if (this.isNew) {
        this.createPaper()
          .then((response) => {
            console.log(response)
            const respData = response.data
            this.$router.push({name: 'edit', params: {id: respData.data.id}})
            this.id = respData.data.id
            this.paper.id = respData.data.id
            this.topicAdding = false
            this.updatePaper()
          })
      } else {
        this.topicAdding = false
        this.topicEditingID = null
        this.updatePaper()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .message-wrapper {
    position: fixed;
    left: 20px;
    top: 90px;
    font-size: 14px;
    background: #fff;
    border: 1px solid rgba(27,31,35,0.15);
    border-radius: 4px;
    color: #032f62;
    // overflow: hidden;
    z-index: 1;
    .content {
      margin: 0 auto;
      padding: 0 10px;
      max-width: 160px;
      height: 50px;
      line-height: 50px;
      background: #dbedff;
      &:before {
        position: absolute;
        top: 18px;
        left: -5px;
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #dbedff;
        border-top: 1px solid rgba(27,31,35,0.15);
        border-left: 1px solid rgba(27,31,35,0.15);
        border-radius: 2px;
        transform: rotate(-45deg);
      }
    }
  }
  .user-wrapper {
    position: fixed;
    left: 20px;
    bottom: 50px;
    padding: 0 10px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(27,31,35,0.15);
    border-radius: 4px;
    color: #032f62;
    z-index: 1;
  }
  .topic-wrapper {
    position: relative;
    padding: 30px 10px;
    border-bottom: 1px solid #eee;
    border-radius: 4px;
    .action {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      height: 40px;
      align-items: center;
    }
    .move-up-topic,
    .move-down-topic {
      display: inline-block;
      padding: 0 6px;
      font-size: 16px;
      color: #333;
      cursor: pointer;
    }
    .delete-topic {
      font-size: 24px;
      color: #333;
      cursor: pointer;
    }
    &.editing-wrapper {
      background: #f9f9f9;
      box-shadow: 0 0 10px rgba(0,0,0,0.07);
    }
    &:hover {
      background: #f9f9f9;
      box-shadow: 0 0 10px rgba(0,0,0,0.07);
      cursor: pointer;
      .action {
        display: flex;
      }
    }
  }
</style>
