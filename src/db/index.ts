import { MongoClient } from 'mongodb'

export class MongoHelper {
  public static client: MongoClient

  static async connect (url: string): Promise<any> {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    MongoHelper.client = client
  }

  static disconnect (): void {
    MongoHelper.client.close()
  }
}
