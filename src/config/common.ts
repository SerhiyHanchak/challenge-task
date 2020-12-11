import * as joi from 'joi'

const commonSchema = joi.object({
  PORT: joi.string().default(3600)
}).unknown().required()

const { error, value: envVars } = commonSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const PORT = envVars.PORT
