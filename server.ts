import * as http from 'http'
import App from './src/app'
import { MongoHelper } from './src/db'
import { MONGO_URL } from './src/config'

class Server {
  private static serverInstance: Server
  private server: any
  private port: number

  public getServerInstance (): any {
    return this.server
  }

  public static bootstrap (): Server {
    if (!this.serverInstance) {
      this.serverInstance = new Server()
      return this.serverInstance
    }
    return this.serverInstance
  }

  public constructor () {
    this.runServer()
  }

  private runServer (): void {
    this.port = this.normalizePort(process.env.PORT || 3600)
    App.set('port', this.port)
    this.createServer()
  }

  private createServer (): void {
    this.server = http.createServer(App)
    this.server.listen(this.port)

    this.server.on('listening', async () => {
      const address = this.server.address()
      await MongoHelper.connect(MONGO_URL)
      // eslint-disable-next-line
      const bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`
      console.log(`The server is running on ${bind}`)
    })

    this.server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') throw error
      process.exit(1)
    })
  }

  /**
     * normalize port
     * @param {number | string} val
     * @returns {number}
     */
  private normalizePort (val: number | string): number {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val
    return port
  }
}

export const server = Server.bootstrap()
