import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'

export const wrap = (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction): Promise<any> =>
  await Promise.resolve(fn(req, res, next)).catch(next)
