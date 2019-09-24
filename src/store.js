import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    activeTags: [],
    bookmarks: [],
    activeBookmarks: [],
    searchedBookmarks: [],
    currentTerm: ''
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
    // filterBookmarksByTags (context, tag) {
    //   if (tag.active) {
    //     // this is the incoming tag, so we don't expect it to be active yet
    //     context.activeBookmarks = context.bookmarks.filter(b => {
    //       // return b.fields.Tags.includes(tag.name)
    //       // for each bookmark
    //       console.log('b.fields.Tags', b.fields.Tags)
    //       console.log('activeTags', context.activeTags)
    //       return b.fields.Tags.some(tagInBookmarks => {
    //         // for each tag in bookmark
    //         // return tagInBookmarks === 'vue'
    //         console.log('tagInBookmarks', tagInBookmarks)
    //         return context.activeTags.find(activeTag => {
    //           // for each activeTag
    //           return activeTag.name === tagInBookmarks
    //         })
    //       })
    //     })
    //   } else {
    //     context.activeBookmarks = context.bookmarks
    //   }
    // },
    // filterBookmarksByTerm (context, term) {
    //   if (term.length > 0) {
    //     context.searchedBookmarks = context.activeBookmarks.filter(t => {
    //       return t.fields.Name.toLowerCase().includes(term.toLowerCase())
    //     })
    //   } else {
    //     context.searchedBookmarks = []
    //   }
    // },
    filter (context) {
      // ! search is here, turn back on when ready
      // context.searchedBookmarks = context.activeBookmarks.filter(t => {
      //   return t.fields.Name.toLowerCase().includes(this.state.currentTerm.toLowerCase())
      // })
      // if (context.activeTags.length > 0) {
      console.log('a')
      context.activeBookmarks = context.bookmarks.filter(b => {
        // return b.fields.Tags.includes(tag.name)
        // for each bookmark
        // console.log('b.fields.Tags', b.fields.Tags)
        // console.log('activeTags', context.activeTags)
        return b.fields.Tags.some(tagInBookmarks => {
          // for each tag in bookmark
          // return tagInBookmarks === 'vue'
          // console.log('tagInBookmarks', tagInBookmarks)
          if (context.activeTags.length > 0 && context.currentTerm.length > 0) {
            // there are active tags and an active search
            return context.activeTags.find(activeTag => {
              // for each activeTag
              return activeTag.name === tagInBookmarks
            }) && b.fields.Name.toLowerCase().includes(this.state.currentTerm.toLowerCase())
          } else if (context.activeTags.length > 0 && context.currentTerm.length === 0) {
            // there are active tags and no search term
            return context.activeTags.find(activeTag => {
              // for each activeTag
              return activeTag.name === tagInBookmarks
            })
          } else if (context.activeTags.length === 0 && context.currentTerm.length > 0) {
            // there are no active tags but a search term
            return b.fields.Name.toLowerCase().includes(this.state.currentTerm.toLowerCase())
          } else {
            // there are no active tags or search terms
            return true
          }
        })
      })
      // }
    },
    setActiveTerm (context, { term, tag }) {
      // console.log(context, term, tag)
      if (term) {
        // search incoming
        if (term.length > 0) {
          // if term is not empty set current term
          this.state.currentTerm = term
          // lets search
          // context.commit('search')
        } else {
          // term is empty
          this.state.currentTerm = ''
        }
        // if (this.state.activeTags.length > 0) {
        //   // there are current active tags
        //   console.log('search in active terms', this.state.activeTags)
        // }
        // console.log('search', term)
      }
      if (tag) {
        // tagset incoming
        console.log('tag', tag)
        // context.commit('search')
        // if (tag.active) {
        //   // this is the incoming tag, so we don't expect it to be active yet
        //   context.commit('search')
        // } else {
        //   // resetting, because no tags are active
        //   // context.activeBookmarks = context.bookmarks
        // }
        // if (this.state.currentTerm.length > 0) {
        //   console.log('tag with active search', tag)
        // }
      }
    }
  },
  actions: {
    init (context, tag) {
      context.commit('getRecords')
    },
    tagSet (context, tag) {
      // context.commit('filterBookmarks', { tag })
      context.commit('setActiveTag', tag)
      context.commit('filter')
    },
    search (context, term) {
      context.commit('setActiveTerm', { term })
      context.commit('filter')
    }
  }
})
