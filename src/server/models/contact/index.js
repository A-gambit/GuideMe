import mongoose from '../index'

let  {Schema} = mongoose
let schema = new Schema({
  ip: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true,
    default: Date.now
  }
})


schema.statics.addValue = function ({name, email, message, ip, date}, callback) {
  let Contact = this
  let contact = new Contact({name, email, message, ip})
  if (date) contact.date = date
  contact.save(err => callback(err, contact))
}

schema.statics.getValues = function (callback) {
  let Contact = this
  Contact.find({}).sort({'date': -1}).exec((err, contacts) => callback(contacts))
}

schema.statics.getСount = function (callback) {
  let Contact = this
  Contact.count({}, (err, count) => callback(count))
}

schema.statics.removeItems = function (callback) {
  let Contact = this
  Contact.remove({}, err => callback())
}

export default mongoose.model('Contact', schema)
