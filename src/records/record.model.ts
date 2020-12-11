import { Collection } from 'mongodb'
import { MongoHelper } from '../db'

export class RecordModel {
  private readonly collectionName = 'records'

  public async getRecordsFromDb (projection: any[]): Promise<any> {
    const recordsCollection = this.getCollection()

    const result = await recordsCollection.aggregate(projection).toArray()

    return result
  }

  private readonly getCollection = (): Collection => {
    return MongoHelper.client.db().collection(this.collectionName)
  }
}
