<template>
  <div class="home">
    <TagCloud @tagset="tagSet" />
    <BookmarkList />
  </div>
</template>

<script>
// @ is an alias to /src
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

<style lang="scss" scoped>

.home {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

</style>
