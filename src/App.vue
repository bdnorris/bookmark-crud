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
import store from '@/store.js'

export default {
  mounted () {
    store.dispatch('init')
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
