<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    this.bookmarkletTest()
  },
  methods: {
    bookmarkletTest: function () {
      var metas = (document.getElementsByTagName('meta'))
      for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === 'description') {
          return metas[i].getAttribute('content')
        }
      }
      location.href = 'http://www.reddit.com/submit?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title) + '&description=' + encodeURIComponent()
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
