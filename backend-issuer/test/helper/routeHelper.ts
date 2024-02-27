import request from 'supertest'
import express from 'express'

const basePath = `/api`

export const get = async (
  app: express.Express,
  endpoint: string,
  headers: Record<string, string> = {}
): Promise<request.Test> => {
  return request(app).get(`${basePath}${endpoint}`).set(headers)
}

export const post = async (
  app: express.Express,
  endpoint: string,
  body: object,
  headers: Record<string, string> = {}
): Promise<request.Test> => {
  return request(app).post(`${basePath}${endpoint}`).send(body).set(headers)
}
