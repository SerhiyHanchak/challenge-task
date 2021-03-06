import { Response, Request, NextFunction } from 'express'
import { Schema } from 'joi'
import * as _ from 'lodash'

import { HttpError } from '../utils/httpError'
import { RESPONSE_CODES } from '../constant'

export const requestValidate = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: any = await schema.validateAsync(req, {
      stripUnknown: {
        arrays: false,
        objects: true
      },
      convert: true,
      abortEarly: false
    })
    res.locals = Object.assign({}, res.locals, data)
    return next()
  } catch (err) {
    const details: any = _.head(err.details)
    err.message = details.message
    err.statusCode = 400
    // eslint-disable-next-line
    return next(new HttpError(400, `Bad request - ${err}`, RESPONSE_CODES.VALIDATION_ERROR))
  }
}
