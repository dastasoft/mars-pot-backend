import express from 'express'
import morgan from 'morgan'

import companyRoutes from '../routes/company'
import jobOfferRoutes from '../routes/jobOffer'

export default function createApp() {
  const app = express()

  // middlewares
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // routes
  app.use('/company', companyRoutes)
  app.use('/job-offer', jobOfferRoutes)

  return app
}
