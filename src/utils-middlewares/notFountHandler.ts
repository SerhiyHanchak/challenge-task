import { Request, Response, NextFunction } from 'express'
import { RESPONSE_CODES, MESSAGES } from '../constant'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).send({
    code: RESPONSE_CODES.NOT_FOUND,
    msg: MESSAGES.NOT_FOUND_MESSAGE
  })
}
