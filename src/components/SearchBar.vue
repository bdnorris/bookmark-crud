<template>
  <div>
    <input @keyup="search(input)" v-model="input" type="search" name="" id="">
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    search (term) {
      // console.log('term', term)
      this.$emit('bsearch', term)
    }
  }
}
</script>
