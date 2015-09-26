import React from 'react'
import {addons} from 'react/addons'
import Block from './block'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  render() {
    return (
      <div className='contact-page'>
        <div className='contact-bg'></div>
        <div className='contact-content'>
          <span className='contact-title'>Contact Us</span>
          <Block />
        </div>
      </div>
    )
  }
})
