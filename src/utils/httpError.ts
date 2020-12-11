export class HttpError extends Error {
  public status: number
  public message: string
  public code: number

  constructor (status: number, message: string, code?: number) {
    super()
    this.status = status
    this.message = message
    this.code = code
  }
}
