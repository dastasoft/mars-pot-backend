import express from 'express'
import morgan from 'morgan'

import authRoutes from '../routes/auth'
import companyRoutes from '../routes/company'
import jobRoutes from '../routes/job'

export default function createApp() {
  const app = express()

  // middlewares
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // routes
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/company', companyRoutes)
  app.use('/api/v1/job', jobRoutes)

  return app
}
