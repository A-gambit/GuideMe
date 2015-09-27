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
  post.save((err) => {
    if (err) return callback(err)
    callback(null, post)
  })
}

schema.statics.getValues = function (callback) {
  let Feed = this
  Feed.find({}, (err, post) => callback(post))
}

export default mongoose.model('Feed', schema)
