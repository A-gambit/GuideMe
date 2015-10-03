import React from 'react'
import {RouteHandler, Navigation} from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import Feed from '../services/feed'
import Contact from '../services/contact'


let App = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {posts: Feed.cachedPosts || [], contact: Contact.cachedContact, count: null}
  },

  componentWillMount() {
    if (!this.state.posts.length) {
      Feed.once('loaded', this.handleFeed).load()
    }
    if (!this.state.contact) {
      Contact.once('loaded', this.handleContact).load()
    }
    if (!this.state.count) {
      Contact.once('loadedCount', this.handleCount).loadCount()
    }
  },

  componentWillUnmount() {
    Feed.removeListener('loaded', this.handleFeed)
    Contact.removeListener('loaded', this.handleContact)
    Contact.removeListener('loadedCount', this.handleCount)
  },

  handleFeed(posts) {
    this.setState({posts})
  },

  handleContact(contact) {
    this.setState({contact})
  },

  handleCount(count) {
    this.setState({count})
  },

  isFooter() {
    return this.context.router.getCurrentPathname().indexOf('/contact') == -1
      && this.state.posts.length > 0
      && !this.context.router.getCurrentRoutes().reduce((res, {isNotFound}) => res || isNotFound, false)
  },

  render() {
    return (
      <div>
        <Header />
        <RouteHandler />
        {this.isFooter() && <Footer />}
      </div>
    )
  }
})

export default App