import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../utils/httpError'
import { RESPONSE_CODES, MESSAGES } from '../constant'

export function errorHandler (error: HttpError, req: Request, res: Response, next: NextFunction): void {
  const status = error.status || 500
  const message = error.message || MESSAGES.DEFAULT_ERROR_MESSAGE
  const code = error.code || RESPONSE_CODES.ERROR

  res
    .status(status)
    .send({
      code,
      msg: message
    })
}
