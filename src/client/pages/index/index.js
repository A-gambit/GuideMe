import React from 'react'
import {addons} from 'react/addons'
import {Link} from 'react-router'
import Feed from '../../services/feed'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  getInitialState() {
    return {posts: Feed.cachedPosts || []}
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

  addItem({id, title, img, avatar, author}) {
    return (
      <div className='index-card' key={id}>
        <div className='index-title-wrapper'>
          <Link to={`/post/${id}`} className='index-title' dangerouslySetInnerHTML={{__html: title || ''}}></Link>
        </div>
        <div className='index-img-wrapper'>
          <img src={`/assets/img_server/${img}`} className='index-img' />
        </div>
        <div className='index-author'>
          <span className='index-author-name' dangerouslySetInnerHTML={{__html: author || ''}}></span>
          <img src={`/assets/img_server/${avatar}`} className='index-avatar' />
        </div>
      </div>
    )
  },

  render() {
    return (
      <div>
        <div className='index-banner-wrapper'>
          <div className='index-banner'></div>
        </div>
        {
          this.state.posts.length > 0 &&
          <div className='index-main'>
            {this.state.posts.map(item => this.addItem(item))}
          </div>
        }
      </div>
    )
  }
})
