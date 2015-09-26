import React from 'react'
import {addons} from 'react/addons'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  render() {
    return (
      <div className='correct-message'>Thank you for your message, {this.props.name}!</div>
    )
  }
})
