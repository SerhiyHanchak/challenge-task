import { Request, Response, NextFunction } from 'express'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).send({
    code: 1,
    msg: 'Resource not found'
  })
}
