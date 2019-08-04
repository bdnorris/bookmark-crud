<template>
  <div class="bookmark-list">
    <TagCloud @tagset="tagSet" />
    <SearchBar v-on:bsearch="search" />
    <div v-for="(bookmark, index) in bookmarks" :key="index">
      <template>
        {{ bookmark }}
        <!-- <h1>{{ bookmark.fields.Name }}</h1> -->
        <!-- <a :href="bookmark.fields.Link">link</a> -->
        <!-- <div> {{bookmark.fields.Star}} </div> -->
        <!-- <div> {{bookmark.fields.Tags}} </div> -->
      </template>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'
import TagCloud from '@/components/TagCloud.vue'

export default {
  components: {
    SearchBar,
    TagCloud
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
      // this.bookmarks = this.bookmarks.filter(bm => bm.fields.Name.includes(term))
      this.sterm = term
      console.log('search', this.sterm, term)
    },
    tagSet (tag) {
      console.log('tag', tag)
      console.log('bookmarks', this.bookmarks)
      if (tag.active) {
        this.activeBookmarks = this.bookmarks.filter((b) => {
          return b.fields.Tags.includes(tag.name)
        })
      } else {
        this.activeBookmarks = this.bookmarks
      }
    }
    // searchActive (bookmark) {
    //   bookmark.fields.Name.toLowerCase().includes(this.lowerSearch)
    // }
  },
  computed: {
    bookmarks () {
      return this.$store.state.bookmarks
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
