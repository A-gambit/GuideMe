import {EventEmitter} from 'events'
import fetch from 'isomorphic-fetch'


class Feed extends EventEmitter {
  constructor() {
    super()
    this.posts = null
    this.loading = null
  }

  load() {
    if (this.loading) return null
    this.loading = {}
    fetch('/api/feed', {method: 'get'})
      .then(res => res.json())
      .then(res => this.setPosts(res))
      .catch(err => this.setPosts(null))
  }

  get cachedPosts() {
    return this.posts
  }

  setPosts(res) {
    this.loading = null
    this.posts = res ? res.posts : null
    this.emit('loaded', this.posts)
  }
}

export default new Feed()