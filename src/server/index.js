import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import render from './render'
import routes from './routes'


let app = express()

app
  .use(render())
  .use(bodyParser.urlencoded({limit: '50mb', extended: false}))
  .use(bodyParser.json({limit: '50mb'}))
  .use(morgan('dev'))
  .use('/api', routes())
  .use((error, req, res, next) =>
    res
      .status(error.status || 500)
      .send({message: error.message, error}))

app.listen(process.env.PORT || 5555)
console.log(`Server listening on http://localhost:${process.env.PORT || 5555}`)
