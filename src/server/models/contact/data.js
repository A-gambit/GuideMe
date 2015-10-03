import Contact from './index.js'
import Charlatan from 'charlatan'
import async from 'async'

export default (cb) => Contact.removeItems(() => {
  let contacts = []
  for (let i = 0; i < 100; i++) {
    contacts.push({
      name: Charlatan.Name.name(),
      email: Charlatan.Internet.email(),
      message: Charlatan.Lorem.text(),
      ip: Charlatan.Internet.IPv4(),
      date: Charlatan.Date.birthday(0, 1)
    })
  }
  async.each(contacts, (contact, callback) => {
    Contact.addValue(contact, (err, contact) => {
      console.log(contact)
      callback()
    })
  }, err => cb(err))
})

