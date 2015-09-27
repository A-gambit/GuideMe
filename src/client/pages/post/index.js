import React from 'react'
import {Navigation} from 'react-router'
import {addons} from 'react/addons'
import Feed from '../../services/feed'


let Post = React.createClass({
  mixins: [addons.PureRenderMixin, Navigation],

  getInitialState() {
    return {
      posts: Feed.cachedPosts || [],
      id: this.props.params.id
    }
  },

  componentWillMount() {
    Feed.once('loaded', posts => this.handleFeed(posts))
  },

  componentWillUnmount() {
    Feed.removeListener('loaded', this.handleFeed)
  },

  handleFeed(posts) {
    this.setState({posts})
  },

  addContent({_id, title, text, img, author, avatar}) {
    return (
      <div className='post-content' key={_id}>
        <div className='post-title-wrapper'>
          <span className='post-title' dangerouslySetInnerHTML={{__html: title || ''}}></span>
        </div>
        <div className='post-img-wrapper'>
          <img src={`/assets/img_server/${img}`} className='post-img' />
        </div>
        <div className='post-author'>
          <img src={`/assets/img_server/${avatar}`} className='post-avatar' />
          <span className='post-name' dangerouslySetInnerHTML={{__html: author || ''}}></span>
        </div>
        <div className='post-link'></div>
        <div className='post-text-wrapper'>
          <div className='post-text' dangerouslySetInnerHTML={{__html: text || ''}}></div>
        </div>
      </div>
    )
  },

  render() {
    let post = this.state.posts.filter(({_id}) => _id == this.state.id)[0]
    return (
      <div>
        {post && this.addContent(post)}
      </div>
    )
  }
})

export default Post