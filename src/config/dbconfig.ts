import * as joi from 'joi'

const mongoSchema = joi.object({
  MONGO_URL: joi.string()
}).unknown().required()

const { error, value: envVars } = mongoSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const MONGO_URL = envVars.MONGO_URL
