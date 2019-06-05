<template>
  <div class="bookmark-list">
    bookmark list
    <SearchBar v-on:bsearch="search" />
    <div v-for="(bookmark, index) in bookmarks" :key="index">
      <template v-if="bookmark.fields.Name.includes(sterm)">
        <h1>{{ bookmark.fields.Name }}</h1>
        <a :href="bookmark.fields.Link">link</a>
        <div> {{bookmark.fields.Star}} </div>
        <div> {{bookmark.fields.Tags}} </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'

export default {
  components: {
    SearchBar
  },
  data () {
    return {
      atUrl: '//api.airtable.com/v0/',
      atTable: 'app8h8YVTKPhUN6MY',
      atApi: process.env.VUE_APP_AIRTABLE_API_KEY,
      bookmarks: [],
      sterm: ''
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
          'maxRecords': 100
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
    },
    search (term) {
      // this.bookmarks = this.bookmarks.filter(bm => bm.fields.Name.includes(term))
      this.sterm = term
    }
  }
}
</script>
