import { Request, Response, NextFunction } from 'express'
import { RecordService } from '../record.service'
import { wrap } from '../../utils-middlewares'

async function getRecords (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { startDate, endDate, minCount, maxCount } = res.locals.body
  const recordService = new RecordService()

  const result = await recordService.getRecords({ startDate, endDate, minCount, maxCount })

  res.locals.result = result

  next()
}

export const getRecordsHandler = wrap(getRecords)
