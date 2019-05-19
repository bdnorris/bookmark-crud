<template>
  <div class="bookmark-list">
    bookmark list
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      atUrl: '//api.airtable.com/',
      atTable: 'app8h8YVTKPhUN6MY',
      atApi: process.env.AIRTABLE_API_KEY
    }
  },
  mounted () {
    this.getRecords()
  },
  methods: {
    getRecords () {
      // Make a request for a user with a given ID
      axios.get(this.atUrl + this.atTable + '/Main', {
        params: {
          'maxRecords': 3
        },
        headers: {
          'Authorization': 'Bearer ' + this.atApi
        }
      })
        .then(function (response) {
          // handle success
          console.log('response', response)
        })
        .catch(function (error) {
          // handle error
          console.error(error)
        })
        .finally(function () {
          // always executed
        })
    }
  }
}
</script>
