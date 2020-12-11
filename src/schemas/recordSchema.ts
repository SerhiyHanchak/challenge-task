import * as Joi from 'joi'

export const getRecordsSchema = Joi.object().keys({
  body: Joi.object().keys({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    minCount: Joi.number().positive().allow(0).required(),
    maxCount: Joi.number().positive().greater(Joi.ref('minCount')).required()
  })
})
