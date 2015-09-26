import React from 'react'
import {RouteHandler, Navigation} from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import Feed from '../services/feed'


let App = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {posts: Feed.cachedPosts || []}
  },

  componentWillMount() {
    if (!this.state.posts.length) {
      Feed.once('loaded', posts => this.handleFeed(posts)).load()
    }
  },

  componentWillUnmount() {
    Feed.removeListener('loaded', this.handleFeed)
  },

  handleFeed(posts) {
    this.setState({posts})
  },

  render() {
    let isFooter = this.context.router.getCurrentPathname() != '/contact' && this.state.posts.length > 0
    return (
      <div>
        <Header />
        <RouteHandler />
        {isFooter && <Footer />}
      </div>
    )
  }
})

export default App