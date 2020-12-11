import { Router, RequestHandler } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { getRecordsHandler } from '../src/records/methods/getRecords'
import { notFoundHandler, requestValidate, responseHandler, errorHandler } from './utils-middlewares'
import { getRecordsSchema } from './schemas'
import * as swagger from '../swagger.json'

class MainRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.init()
  }

  private init () {
    this.router.use('/api-docs', serve, setup(swagger))
    this.router.post('/', this.getRecordMiddlewares)
    this.router.use(responseHandler)
    this.router.use(notFoundHandler)
    this.router.use(errorHandler)
  }

  get getRecordMiddlewares (): RequestHandler[] {
    return [
      requestValidate(getRecordsSchema),
      getRecordsHandler
    ]
  }
}

export default new MainRouter().router
