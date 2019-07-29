<template>
  <div class="bookmark-list">
    bookmark list
    <TagCloud @tagset="tagSet" />
    <SearchBar v-on:bsearch="search" />
    <div v-for="(bookmark, index) in activeBookmarks" :key="index">
      <template v-if="bookmark.fields.Name.toLowerCase().includes(lowerSearch) && tagActive">
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
import TagCloud from '@/components/TagCloud.vue'
// import store from '@/store.js'

export default {
  components: {
    SearchBar,
    TagCloud
  },
  data () {
    return {
      atUrl: '//api.airtable.com/v0/',
      atTable: 'app8h8YVTKPhUN6MY',
      atApi: process.env.VUE_APP_AIRTABLE_API_KEY,
      bookmarks: [],
      activeBookmarks: [],
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
          this.activeBookmarks = this.bookmarks
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
      console.log('search', this.sterm, term)
    },
    tagSet (tag) {
      console.log('tag', tag)
      console.log('bookmark', this.bookmarks)
      if (tag.active) {
        this.activeBookmarks = this.bookmarks.filter((b) => {
          return b.fields.Tags.includes(tag.name)
        })
      } else {
        this.activeBookmarks = this.bookmarks
      }
    }
  },
  computed: {
    lowerSearch () {
      return this.sterm.toLowerCase()
    },
    tagActive () {
      return true
      // ??
    }
  }
}
</script>
