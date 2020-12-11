import { Request, Response, NextFunction } from 'express'
import { RESPONCE_CODES } from '../constant'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).send({
    code: RESPONCE_CODES.NOT_FOUND,
    msg: 'Resource not found'
  })
}
