import express from 'express'
import FeedHandler from '../handler/feed'
import ContactHandler from '../handler/contact'


export default () => {
  let app = express()
  let handler = {
    feed: new FeedHandler(),
    contact: new ContactHandler()
  }

  let feed = express.Router()
    .get('/', handler.feed.getFeed)
  app.use('/feed', feed)

  let contact = express.Router()
    .use(handler.contact.init)
    .post('/',
      handler.contact.checkName,
      handler.contact.checkEmail,
      handler.contact.checkMessage,
      handler.contact.checkValidation,
      handler.contact.setData
    )
    .get('/', handler.contact.getData)
    .get('/count', handler.contact.getСount)
  app.use('/contact', contact)

  return app
}