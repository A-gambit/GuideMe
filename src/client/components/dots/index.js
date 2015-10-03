import React from 'react'
import {addons} from 'react/addons'
import {Link} from 'react-router'


export default React.createClass({
  mixins: [addons.PureRenderMixin],

  showDot(value) {
    if (value > 0 && value <= this.props.max) {
      return <Link className='dots-item' to={`${this.props.path}${value}`}>{value}</Link>
    }
  },

  showFristLast(first) {
    return (
      <span>
        {first && this.showDot(1)}
        <a className='dots-iten'>...</a>
        {!first && this.showDot(this.props.max)}
      </span>
    )
  },

  render() {
    return (
      <div className='dots'>
        {this.props.value > 2 && this.showFristLast(true)}
        {this.showDot(this.props.value - 1)}
        {this.showDot(this.props.value)}
        {this.showDot(this.props.value + 1)}
        {this.props.value < this.props.max - 2 && this.showFristLast()}
      </div>
    )
  }
})

