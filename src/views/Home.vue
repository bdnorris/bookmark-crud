<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TagCloud @tagset="tagSet" />
    <BookmarkList />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TagCloud from '@/components/TagCloud.vue'
import BookmarkList from '@/components/BookmarkList.vue'

export default {
  name: 'home',
  components: {
    BookmarkList,
    TagCloud
  },
  methods: {
    tagSet (tag) {
      this.$store.dispatch('tagSet')
    }
  }
}
</script>
