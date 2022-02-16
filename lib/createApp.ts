import express from 'express'
import morgan from 'morgan'

import companyRoutes from '../routes/company'
import jobOfferRoutes from '../routes/jobOffer'
import userRoutes from '../routes/user'

export default function createApp() {
  const app = express()

  // middlewares
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // routes
  app.use('/companies', companyRoutes)
  app.use('/job-offers', jobOfferRoutes)
  app.use('/users', userRoutes)

  return app
}
