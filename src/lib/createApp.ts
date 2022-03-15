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
  const v1 = express.Router()
  v1.use('/auth', authRoutes)
  v1.use('/company', companyRoutes)
  v1.use('/job', jobRoutes)

  app.use('/api/v1', v1)
  app.use('/api', v1)

  return app
}
