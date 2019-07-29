<template>
  <div class="tag-cloud">
    <ul>
      <li :key="index" v-for="(tag, index) in tags">
        <button type="button" @click="activateTag(tag, $event)">
          {{tag.name}} | {{tag.count}} | {{tag.active}}
        </button>
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
  },
  methods: {
    activateTag (tag, e) {
      // console.log('activateTag', tag)
      this.tags.map((t) => {
        if (t.name === tag.name) {
          if (t.active) { t.active = false } else { t.active = true }
        }
      })
      this.$emit('tagset', tag)
    }
  }
}
</script>
