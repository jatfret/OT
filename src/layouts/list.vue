<template>
  <div>
    <navigator section="list"></navigator>
    <div class="list-page">
      <div class="header">
        <router-link
          :to="{ name: 'edit'}"
          class="btn btn-important"
        >
          新建
        </router-link>
      </div>
      <div v-if="list.length">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>标题</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="item._id">
              <td>{{index + 1}}</td>
              <td>{{item.title}}</td>
              <td>{{item.created_at | moment}}</td>
              <td>
                <router-link
                  :to="{ name: 'edit', params: {id: item._id} }"
                  class="btn btn-info"
                >
                  编辑
                </router-link>
                <button class="btn btn-primary" @click="deletePaper(item._id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { remotePath } from '@/constants/RemotePath.js'
import Navigator from '@/layouts/commons/Navigator.vue'
export default {
  name: 'list',
  components: { Navigator },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get(`${remotePath.path}/paper/getPaperList`)
        .then((response) => {
          this.list = response.data.data.papers
        }).catch((err) => {
          alert(err)
        })
    },
    deletePaper (id) {
      fetch(`${remotePath.path}/paper/deletePaper`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({id})
      }).then((res) => {
        return res.json()
      }).then((respData) => {
        let index
        this.list.forEach((item, i) => {
          if (item._id === id) {
            index = i
          }
        })
        this.list.splice(index, 1)
      })
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
  .header {
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      th,td{
        border-bottom: 1px solid #eee;
        &:first-child{
          padding-left: 20px;
          text-align: left;
        }
        &:last-child{
          padding-right: 20px;
        }
      }
    }
    th {
      height: 60px;
      line-height: 60px;
      font-weight: normal;
      background: #fafafa;
    }
    td {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .btn {
      font-size: 14px;
    }
  }
</style>
