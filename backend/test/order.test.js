import supertest from 'supertest'
import app from '../server.js' // pastikan ini adalah instance Express kamu

const request = supertest

describe('Order Routes', () => {
  it('POST /api/orders - should create a new order', async () => {
    const res = await request(app).post('/api/orders').send({
      user_id: '67f61edca3d55a1b55819f26',
      items: [
        {
          product_id: '67b4a6737da12644013e5890',
          quantity: 1,
          price: 200000
        }
      ],
      status: 'pending',
      payment_method: 'qris'
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('order')
  })
})
