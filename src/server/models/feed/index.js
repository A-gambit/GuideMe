import mongoose from '../index'

let  {Schema} = mongoose
let schema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true,
    default: Date.now
  }
})

schema.statics.addValue = function ({title, author, avatar, text, img}, callback) {
  let Feed = this
  let post = new Feed({title, author, avatar, text, img})
  post.save(err => callback(err, post))
}

schema.statics.getValues = function (callback) {
  let Feed = this
  Feed.find({}).sort({'date': -1}).exec((err, post) => callback(post))
}

schema.statics.removeItems = function (callback) {
  let Feed = this
  Feed.remove({}, err => callback())
}

export default mongoose.model('Feed', schema)
