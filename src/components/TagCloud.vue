<template>
  <div class="tag-cloud">
    <ul>
      <li :key="index" v-for="(tag, index) in tags">
        <span>
          {{tag}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  data () {
    return {
      tags: []
    }
  },
  mounted () {
    store.dispatch('init')
    console.log('hello', store.state.tags) // -> 1
    this.tags = store.state.tags
  }
}
</script>
