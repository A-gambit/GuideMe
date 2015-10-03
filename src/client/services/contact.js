import {EventEmitter} from 'events'
import fetch from 'isomorphic-fetch'


class Contact extends EventEmitter {
  constructor() {
    super()
    this.contact = null
    this.count = null
    this.loading = null
    this.loadingCount = null
  }

  loadCount() {
    if (this.loadingCount) return null
    this.loadingCount = null
    fetch('/api/contact/count', {method: 'get'})
      .then(res => res.json())
      .then(res => this.setCount(res))
      .catch(err => this.setCount(null))
  }

  load() {
    if (this.loading) return null
    this.loading = {}
    fetch('/api/contact', {method: 'get'})
      .then(res => res.json())
      .then(res => this.setContact(res))
      .catch(err => this.setContact(null))
  }

  get cachedContact() {
    return this.contact
  }

  get cachedCount() {
    return this.count
  }

  setCount(res) {
    this.loadedCount = null
    this.count = res ? Math.floor(res.count/10) : null
    this.emit('loadedCount', this.count)
  }

  setContact(res) {
    this.loading = null
    this.contact = res ? res.contacts.reduce((memo, item, index) => {
      let cur = Math.floor(index/10) + 1
      memo[cur] = memo[cur] || []
      memo[cur].push(item)
      return memo
    }, {}) : null
    this.emit('loaded', this.contact)
  }
}

export default new Contact()
