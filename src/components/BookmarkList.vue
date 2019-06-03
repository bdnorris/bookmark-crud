<template>
  <div class="bookmark-list">
    bookmark list
    <div v-for="(bookmark, index) in bookmarks" :key="index">
      <h1>{{ bookmark.fields.Name }}</h1>
      <a :href="bookmark.fields.Link">link</a>
      <div> {{bookmark.fields.Star}} </div>
      <div> {{bookmark.fields.Tags}} </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      atUrl: '//api.airtable.com/v0/',
      atTable: 'app8h8YVTKPhUN6MY',
      atApi: process.env.VUE_APP_AIRTABLE_API_KEY,
      bookmarks: []
    }
  },
  mounted () {
    this.getRecords()
    console.log(process)
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
        .then((response) => {
          // handle success
          console.log('response', response)
          this.bookmarks = response.data.records
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
