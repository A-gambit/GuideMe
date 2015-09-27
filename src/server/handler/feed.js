import Feed from '../models/feed'

class FeedHandler {
  getFeed(req, res, next) {
    Feed.getValues((posts) => res.status(200).send({posts}))
  }
}

export default FeedHandler
