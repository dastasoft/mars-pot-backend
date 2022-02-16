import { Schema, Model, model } from 'mongoose'

import { Company as CompanyProps } from '../types'

const companySchema = new Schema<CompanyProps, Model<CompanyProps>>(
  {
    about: { type: String, required: true },
    industries: { type: [String], required: true },
    logo: String,
    name: { type: String, required: true },
    numberEmployees: { type: String, required: true },
    yearFounded: { type: Number, required: true },
  },
  { timestamps: true }
)

const Company = model<CompanyProps>('Company', companySchema)

export default Company
