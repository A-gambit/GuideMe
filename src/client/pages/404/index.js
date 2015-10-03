import React from 'react'
import {addons} from 'react/addons'
import {Navigation, Link} from 'react-router'


export default React.createClass({
  mixins: [addons.PureRenderMixin, Navigation],

  render() {
    let className='oops'
    return (
      <div className={className}>
        <div className='oops-error'>
          <img src='./assets/img/sad-walk.gif' />
        </div>
        <span className={`${className}-title`}>Oops!</span>
        <span className={`${className}-sub`}>
          We can't seem to find the<br />
          page you're looking for.
        </span>
        <Link to={this.props.path || 'index'} className={`${className}-link`}>Choose correct a one</Link>
      </div>
    )
  }
})
