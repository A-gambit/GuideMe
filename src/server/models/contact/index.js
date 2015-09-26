import mongoose from '../index'

let  {Schema} = mongoose
let schema = new Schema({
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


schema.statics.addValue = function ({name, email, message}, callback) {
  let Contact = this
  let contact = new Contact({name, email, message})
  contact.save((err) => {
    if (err) return callback(err)
    callback(null, contact)
  })
}

schema.statics.getValues = function (callback) {
  let Contact = this
  Contact.find({}, (err, contacts) => callback(contacts))
}

export default mongoose.model('Contact', schema)
