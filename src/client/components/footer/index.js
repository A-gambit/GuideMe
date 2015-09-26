import React from 'react'
import {Link} from 'react-router'
import {addons} from 'react/addons'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  render() {
    return (
      <div className='footer'>
        <span className='footer-other'>Kyiv 2015</span>
        <Link to='index' className='footer-logo'>GuideMe</Link>
      </div>
    )
  }
})