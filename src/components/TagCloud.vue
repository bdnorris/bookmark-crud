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
export default {
  data () {
    return {
      tags: []
    }
  },
  mounted () {
    this.tags = this.$store.state.tags
  },
  methods: {
    activateTag (tag, e) {
      // console.log('activateTag', tag)
      this.tags.map((t) => {
        if (t.name === tag.name) {
          if (t.active) { t.active = false } else { t.active = true }
        }
      })
      this.$store.dispatch('tagSet', tag)
    }
  }
}
</script>
