import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: []
  },
  mutations: {
    async getTags () {
      // Make a request for a user with a given ID
      await axios.get('//api.airtable.com/v0/' + 'app8h8YVTKPhUN6MY' + '/Main', {
        params: {
          'maxRecords': 100,
          'fields': ['Tags']
        },
        headers: {
          'Authorization': 'Bearer ' + process.env.VUE_APP_AIRTABLE_API_KEY
        }
      })
        .then((response) => {
          // handle success
          console.log('response tags', response.data.records)
          response.data.records.map((t) => {
            if (typeof t.fields.Tags !== 'undefined') {
              t.fields.Tags.map(g => {
                if (!this.state.tags.find(o => { return o.name === g })) {
                  this.state.tags.push({ name: g, count: 1, active: false })
                } else {
                  this.state.tags.find(o => { return o.name === g }).count++
                }
              })
            }
          })
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
      context.commit('getTags')
    },
    tagSet (context) {
      context.commit('setActiveTag(tag)')
    }
  }
})
