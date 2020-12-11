import { expect } from 'chai'
import * as request from 'supertest'
import { server } from '../../server'

describe('few tests to check validation and not found status', () => {
  const testServer = server.getServerInstance()

  it('should return 404 - page not found', async () => {
    const res = await request(testServer)
      .get('/abracadabra')
      .expect(404)

    expect(res.body).to.has.property('code', 3)
    expect(res.body).to.has.property('msg', 'Resource not found')
  })

  it('should return 400 - missed maxCount parameter', async () => {
    const res = await request(testServer)
      .post('/')
      .send({
        startDate: '2015-06-01',
        endDate: '2017-07-02',
        minCount: 3000
      })
      .expect(400)

    expect(res.body).to.has.property('code', 1)
    expect(res.body).to.has.property('msg', 'Bad request - ValidationError: "body.maxCount" is required')
  })

  it('should return 400 - maxCount less that minCount', async () => {
    const res = await request(testServer)
      .post('/')
      .send({
        startDate: '2015-06-01',
        endDate: '2017-07-02',
        minCount: 3000,
        maxCount: 2500
      })
      .expect(400)

    expect(res.body).to.has.property('code', 1)
    expect(res.body).to.has.property('msg', 'Bad request - ValidationError: "body.maxCount" must be greater than ref:minCount')
  })

  it('should return 400 - endDate less that startDate', async () => {
    const res = await request(testServer)
      .post('/')
      .send({
        startDate: '2017-06-01',
        endDate: '2015-07-02',
        minCount: 3000,
        maxCount: 4000
      })
      .expect(400)

    expect(res.body).to.has.property('code', 1)
    expect(res.body).to.has.property('msg', 'Bad request - ValidationError: "body.endDate" must be greater than "ref:startDate"')
  })
})
