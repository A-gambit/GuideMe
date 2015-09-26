import DB from '../db'

class FeedHandler {
  getFeed(req, res, next) {
    let feed = DB.getData('feed')
    res.send(feed)
  }
}

export default FeedHandler
