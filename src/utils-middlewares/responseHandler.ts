import * as httpStatus from 'http-status'
import {
  NextFunction,
  Request,
  Response
} from 'express'
import { MESSAGES } from '../constant/messages'

const { OK } = httpStatus

export function responseHandler (req: Request, res: Response, next: NextFunction) {
  const { result, status } = res.locals

  if (result || status) {
    res.status(status || OK)
    if (result) {
      res.send({
        code: 0,
        msg: MESSAGES.SUCCESS_MESSAGE,
        records: result
      })
    }
    return res.end()
  }

  return next()
}
