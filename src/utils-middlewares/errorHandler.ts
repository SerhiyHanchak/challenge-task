import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../utils/httpError'
import { RESPONCE_CODES } from '../constant'

export function errorHandler (error: HttpError, req: Request, res: Response, next: NextFunction): void {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  const code = error.code || RESPONCE_CODES.ERROR

  res
    .status(status)
    .send({
      code,
      msg: message
    })
}
