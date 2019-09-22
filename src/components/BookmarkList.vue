<template>
  <div class="bookmark-list">
    <SearchBar v-on:bsearch="search" />
    <!-- <p>
      {{ bookmarks }}
    </p> -->
    <template v-if="bookmarks.length > 0">
      <div v-for="(bookmark, index) of bookmarks" :key="index">
        <template>
          <h1>{{ bookmark.fields.Name }}</h1>
          <a :href="bookmark.fields.Link">link</a>
          <div> {{bookmark.fields.Star}} </div>
          <div> {{bookmark.fields.Tags}} </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
// import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'

export default {
  components: {
    SearchBar
  },
  data () {
    return {
      // bookmarks: [],
      // activeBookmarks: [],
      sterm: ''
    }
  },
  mounted () {
    console.log('state test', this.$store.state)
    // this.bookmarks = this.$store.state.bookmarks
  },
  methods: {
    // setLocal () {
    //   this.bookmarks = store.state.bookmarks
    //   this.activeBookmarks = store.state.bookmarks
    //   console.log('active bookmarks', this.activeBookmarks)
    // },
    search (term) {
      this.sterm = term
      // this.bookmarks = this.bookmarks.filter(bm => bm.fields.Name.includes(term))
      console.log('search', this.sterm, term)
      this.$store.dispatch('search', term)
    }
    // searchActive (bookmark) {
    //   bookmark.fields.Name.toLowerCase().includes(this.lowerSearch)
    // }
  },
  computed: {
    bookmarks () {
      if (this.$store.state.searchedBookmarks.length > 0) {
        return this.$store.state.searchedBookmarks
      } else {
        return this.$store.state.activeBookmarks
      }
    },
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
