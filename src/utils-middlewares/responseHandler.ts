import * as httpStatus from 'http-status'
import {
  NextFunction,
  Request,
  Response
} from 'express'

const { OK } = httpStatus

export function responseHandler (req: Request, res: Response, next: NextFunction) {
  const { result, status } = res.locals

  if (result || status) {
    res.status(status || OK)
    if (result) {
      res.send({
        code: 0,
        msg: 'Success',
        records: result
      })
    }
    return res.end()
  }

  return next()
}
