import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import router from './router'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware (): void {
    this.express.set('etag', false)
    this.express.use(morgan('dev'))

    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({
      extended: false
    }))
  }

  private routes (): void {
    this.express.use(router)
  }
}

export default new App().express
