import React from 'react'
import {addons} from 'react/addons'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  getInitialState() {
    return {value: '', error: false}
  },

  getValue() {
    return this.state.value
  },

  setError(error) {
    this.setState({error})
  },

  handleChange(event) {
    this.setState({value: event.target.value})
  },

  render() {
    return (
      <div>
        {
          this.props.textarea
          ? <textarea
              className='textarea'
              rows='10'
              cols='40'
              name='text'
              placeholder={this.props.placeholder || ''}
              value={this.state.value}
              onFocus={this.setError.bind(this, false)}
              onChange={this.handleChange}
            />
          : <input
              className='input'
              type={this.props.type || 'text'}
              placeholder={this.props.placeholder || ''}
              value={this.state.value}
              onFocus={this.setError.bind(this, false)}
              onChange={this.handleChange}
            />
        }
        {this.state.error && <span className='input-error'>{this.state.error}</span>}
      </div>
    )
  }
})
