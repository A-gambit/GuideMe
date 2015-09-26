import React from 'react'
import {addons} from 'react/addons'
import fetch from 'isomorphic-fetch'
import request from '../../../tools/request'
import Input from '../../../components/input'
import Button from '../../../components/button'
import CorrectMessage from '../../../components/correct_message'

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  getInitialState() {
    return {error: false, success: false, name: ''}
  },

  handleClick() {
    let {name, email, message} = this.refs
    request('/api/contact', {
      name: name.getValue(),
      email: email.getValue(),
      message: message.getValue()
    })
    .then(res => this.handleAccept(res))
    .catch(res => this.handleError(res))
  },

  handleAccept({success}) {
    this.setState({error: true, success, name: this.refs.name.getValue()})
  },

  handleError({validation}) {
    this.setInputError(validation)
    this.setState({error: true})
  },

  setInputError(validation) {
    for (let key in validation) {
      this.refs[key].setError(validation[key] == true ? false : validation[key])
    }
  },

  render() {
    let {success} = this.state
    return (
      <div>
        {
          !success &&
          <div>
            <Input ref='name' placeholder='Name' />
            <Input ref='email' placeholder='Email' />
            <Input ref='message' placeholder='Message' textarea />
            <Button value='Contact Us' onClick={this.handleClick} />
          </div>
        }
        {success && <CorrectMessage name={this.state.name} />}
      </div>
    )
  }
})
