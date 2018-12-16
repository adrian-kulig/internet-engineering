import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Offer } from '.'

const app = () => express(apiRoot, routes)

let offer

beforeEach(async () => {
  offer = await Offer.create({})
})

test('POST /offers 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', origin: 'test', founded: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.origin).toEqual('test')
  expect(body.founded).toEqual('test')
})

test('GET /offers 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /offers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${offer.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(offer.id)
})

test('GET /offers/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /offers/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${offer.id}`)
    .send({ name: 'test', origin: 'test', founded: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(offer.id)
  expect(body.name).toEqual('test')
  expect(body.origin).toEqual('test')
  expect(body.founded).toEqual('test')
})

test('PUT /offers/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', origin: 'test', founded: 'test' })
  expect(status).toBe(404)
})

test('DELETE /offers/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${offer.id}`)
  expect(status).toBe(204)
})

test('DELETE /offers/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
