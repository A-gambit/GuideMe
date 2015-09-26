import React from 'react'
import {addons} from 'react/addons'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  render() {
    return (
      <div>
        {
          this.props.loading
          ? <div>Loading</div>
          : <div onClick={this.props.onClick} className='button'>{this.props.value || 'Submit'}</div>
        }
      </div>
    )
  }
})
