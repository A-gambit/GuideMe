import React from 'react'
import {Link} from 'react-router'
import {addons} from 'react/addons'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  render() {
    return (
      <div className='header'>
        <Link to='index' className='logo'>GuideMe</Link>
        <Link to='contact' className='contact'>Contact Us</Link>
      </div>
    )
  }
})