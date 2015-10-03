import React from 'react'
import {addons} from 'react/addons'
import toDate from '../../../tools/date'


export default React.createClass({
  mixins: [addons.PureRenderMixin],

  getInitialState() {
    return {index: 0}
  },

  render() {
    let className = 'contact-result-contacts',
      current = this.props.contacts[this.state.index]
    return (
      <div className={className}>
        <div className={`${className}-list`}>
          {
            this.props.contacts.map(({name, message, email, date}, index) => {
              return (
                <div
                  className={`${className}-item`}
                  onClick={() => this.setState({index})}
                  >
                  <span className={`${className}-date`}>{toDate(date)}</span>
                  <span className={`${className}-name`}>
                    {name}
                  </span>
                  <span className={`${className}-email`}>
                    {email}
                  </span>
                </div>
              )
            })
          }
        </div>
        <div className={`${className}-message`}>
          <span className={`${className}-date`}>ip: {current.ip}</span>
          <span className={`${className}-name-main`}>{current.name}</span>
          <span className={`${className}-email`}>{current.email}</span>
          <span className={`${className}-text`}>{current.message}</span>
          <span className={`${className}-date-bottom`}>{toDate(current.date)}</span>
        </div>
      </div>
    )
  }
})

