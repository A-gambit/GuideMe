import async from 'async'
import setContact from './contact/data'
import setFeed from './feed/data'

async.waterfall([
  callback => setFeed(err => callback(err)),
  callback => setContact(err => callback(err))
], err => process.exit(err ? 1 : 0))
