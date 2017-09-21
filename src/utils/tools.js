import _ from 'lodash'

export default {
  guid () {
    let d = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return uuid
  },
  stringifyJSON (data) {
    if (data) {
      const dataCp = _.cloneDeep(data)
      return JSON.stringify(dataCp)
    }
  },
  parseJSON (data) {
    if (data) {
      const dataCp = _.cloneDeep(data)
      return JSON.parse(dataCp)
    }
  }
}
