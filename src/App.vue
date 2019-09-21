<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/new">New</router-link>
    </div>
    <button @click="bookmarkletTest">Bookmarklet Test</button>
    <router-view/>
  </div>
</template>

<script>

import '@/scss/style.scss'

export default {
  mounted () {
    this.$store.dispatch('init')
  },
  methods: {
    bookmarkletTest: function () {
      const metas = (document.getElementsByTagName('meta'))
      let description = ''
      for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === 'description') {
          description = metas[i].getAttribute('content')
        }
      }
      location.href = 'new?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title) + '&description=' + encodeURIComponent(description)
    }
  }
}
</script>

<style lang="scss">

// @import '@/scss/style.scss';

</style>
