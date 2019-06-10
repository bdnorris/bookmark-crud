import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: []
  },
  mutations: {
    getTags () {
      // Make a request for a user with a given ID
      axios.get('//api.airtable.com/v0/' + 'app8h8YVTKPhUN6MY' + '/Main', {
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
          console.log('response tags', response)
          this.tags = response.data.records
        })
        .catch(function (error) {
          // handle error
          console.error(error)
        })
        .finally(function () {
          // always executed
        })
    }
  },
  actions: {
    init (context) {
      context.commit('getTags')
    }
  }
})
