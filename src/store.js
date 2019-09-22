import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    activeTags: [],
    bookmarks: [],
    activeBookmarks: []
  },
  mutations: {
    async getRecords () {
      // Make a request for a user with a given ID
      await axios
        .get('//api.airtable.com/v0/' + 'app8h8YVTKPhUN6MY' + '/Main', {
          params: {
            maxRecords: 100
            // 'fields': ['Tags']
          },
          headers: {
            Authorization: 'Bearer ' + process.env.VUE_APP_AIRTABLE_API_KEY
          }
        })
        .then(response => {
          // handle success
          console.log('response', response.data.records)
          // this.state.bookmarks = response.data.records
          this.state.bookmarks = response.data.records.map(r => {
            if (typeof r.fields.Name !== 'undefined') {
              return r
            }
          }) // ! set bookmarks
          this.state.activeBookmarks = this.state.bookmarks
          console.log('bookmarks', this.state.bookmarks)
          response.data.records.map(t => {
            if (typeof t.fields.Tags !== 'undefined') {
              t.fields.Tags.map(g => {
                if (
                  !this.state.tags.find(o => {
                    return o.name === g
                  })
                ) {
                  this.state.tags.push({ name: g, count: 1, active: false }) // ! set tags
                } else {
                  this.state.tags.find(o => {
                    return o.name === g
                  }).count++
                }
              })
            }
          })
          console.log('tags', this.state.tags)
        })
        .catch(function (error) {
          // handle error
          console.error(error)
        })
        .finally(function () {
          // always executed
        })
    },
    setActiveTag (context, tag) {
      if (tag.active) {
        context.tags.find(t => {
          return t.name === tag.name
        }).active = true
        context.activeTags.push(tag)
      } else {
        context.tags.find(t => {
          return t.name === tag.name
        }).active = false
        let pos = context.activeTags.indexOf(tag)
        context.activeTags.splice(pos, 1)
      }
      // console.log('bookmarks', this.bookmarks)
      console.log('activeTags', this.state.activeTags)
    },
    filterBookmarksByTags (context, tag) {
      if (tag.active) {
        // this is the incoming tag, so we don't expect it to be active yet
        context.activeBookmarks = context.bookmarks.filter(b => {
          // return b.fields.Tags.includes(tag.name)
          // for each bookmark
          console.log('b.fields.Tags', b.fields.Tags)
          console.log('activeTags', context.activeTags)
          return b.fields.Tags.some(tagInBookmarks => {
            // for each tag in bookmark
            // return tagInBookmarks === 'vue'
            console.log('tagInBookmarks', tagInBookmarks)
            return context.activeTags.find(activeTag => {
              // for each activeTag
              return activeTag.name === tagInBookmarks
            })
          })
        })
      } else {
        context.activeBookmarks = context.bookmarks
      }
    },
    filterBookmarksByTerm (context, term) {
      if (term.length > 0) {
        context.activeBookmarks = context.bookmarks.filter(t => {
          return t.fields.Name.toLowerCase().includes(term.toLowerCase())
        })
      } else {
        context.activeBookmarks = context.bookmarks
      }
    }
  },
  actions: {
    init (context, tag) {
      context.commit('getRecords')
    },
    tagSet (context, tag) {
      context.commit('setActiveTag', tag)
      context.commit('filterBookmarksByTags', tag)
    },
    search (context, term) {
      context.commit('filterBookmarksByTerm', term)
    }
  }
})
