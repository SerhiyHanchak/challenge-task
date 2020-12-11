import { RecordModel } from './record.model'
import { IBodyData } from './record.interface'

export class RecordService {
  private readonly recordModel = new RecordModel()

  private prepareProjection (params: IBodyData) {
    const { startDate, endDate, minCount, maxCount } = params

    return [
      {
        $project: {
          totalCount: {
            $sum: '$counts'
          },
          key: 1,
          createdAt: 1,
          _id: 0
        }
      }, {
        $match: {
          $and: [
            { totalCount: { $gt: minCount, $lt: maxCount } },
            { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } }
          ]
        }
      }
    ]
  }

  public async getRecords (params: IBodyData): Promise<any> {
    const projection = this.prepareProjection(params)

    return await this.recordModel.getRecordsFromDb(projection)
  }
}
