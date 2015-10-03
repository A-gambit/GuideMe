import React from 'react'
import {addons} from 'react/addons'
import {Navigation, Link} from 'react-router'
import ContactsList from './contact_list'
import Dots from '../../components/dots'
import NotFound from '../404'
import Contact from '../../services/contact'
import toDate from '../../tools/date'


export default React.createClass({
  mixins: [addons.PureRenderMixin, Navigation],

  getInitialState() {
    return {contact: Contact.cachedContact || null, count: Contact.cachedCount || null}
  },

  componentWillUnmount(){
    Contact.removeListener('loaded', this.handleContact)
    Contact.removeListener('loadedCount', this.handleCount)
  },

  componentWillMount() {
    Contact.on('loaded', this.handleContact)
    Contact.on('loadedCount', this.handleCount)
  },

  handleContact(contact) {
    this.setState({contact})
  },

  handleCount(count) {
    this.setState({count})
  },

  showContent(id) {
    return (
      <div>
        <ContactsList contacts={this.state.contact[id]} />
        {this.state.count && <Dots value={parseInt(id)} max={this.state.count} path='/contact_result/' />}
      </div>
    )
  },

  show(id) {
    return this.state.contact[id] ? this.showContent(id) : <NotFound path='/contact_result/1' />
  },

  render() {
    let id = this.props.params.id || 1
    return (
      <div className='contact-results'>
        {this.state.contact && this.show(id)}
      </div>
    )
  }
})
