import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    bookmarks: []
  },
  mutations: {
    async getRecords () {
      // Make a request for a user with a given ID
      await axios.get('//api.airtable.com/v0/' + 'app8h8YVTKPhUN6MY' + '/Main', {
        params: {
          'maxRecords': 100
          // 'fields': ['Tags']
        },
        headers: {
          'Authorization': 'Bearer ' + process.env.VUE_APP_AIRTABLE_API_KEY
        }
      })
        .then((response) => {
          // handle success
          console.log('response', response.data.records)
          // this.state.bookmarks = response.data.records
          this.state.bookmarks = response.data.records.map((r) => {
            if (typeof r.fields.Name !== 'undefined') {
              return r
            }
          }) // ! set bookmarks
          console.log('bookmarks', this.state.bookmarks)
          response.data.records.map((t) => {
            if (typeof t.fields.Tags !== 'undefined') {
              t.fields.Tags.map(g => {
                if (!this.state.tags.find(o => { return o.name === g })) {
                  this.state.tags.push({ name: g, count: 1, active: false }) // ! set tags
                } else {
                  this.state.tags.find(o => { return o.name === g }).count++
                }
              })
            }
          })
          console.log('tags', this.state.tags)
        })
        .catch(function (error) {
          // handle error
          console.error(error)
        })
        .finally(function () {
          // always executed
        })
    },
    setActiveTag (tag) {
      this.state.tags.find(t => { return t.name === tag.name }).active = true
    }
  },
  actions: {
    init (context) {
      context.commit('getRecords')
    },
    tagSet (context) {
      context.commit('setActiveTag(tag)')
    }
  }
})
