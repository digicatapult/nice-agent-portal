import express, { Express } from 'express'
import { setup, serve } from 'swagger-ui-express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { errorHandler } from './lib/error-handler/index.js'
import { RegisterRoutes } from './routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async (): Promise<Express> => {
  const swaggerBuffer = await fs.readFile(
    path.join(__dirname, './swagger.json')
  )
  const swaggerJson = JSON.parse(swaggerBuffer.toString('utf8'))
  const app: Express = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())

  const root = path.join(__dirname, '../..', 'frontend', 'build')
  app.use(express.static(root))

  app.get('*', (_req, res) => {
    res.sendFile(`${root}/index.html`)
  })

  RegisterRoutes(app)
  app.use(errorHandler)
  app.get('/api-docs', (_req, res) => res.json(swaggerJson))
  app.use(
    '/docs',
    serve,
    setup(undefined, {
      swaggerOptions: {
        url: '/api-docs',
      },
    })
  )

  return app
}
