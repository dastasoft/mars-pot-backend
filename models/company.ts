import { Schema, Model, model } from 'mongoose'

import { Company as CompanyProps } from '../types'

const CompanySchema = new Schema<CompanyProps, Model<CompanyProps>>(
  {
    about: { type: String, required: true },
    industries: { type: [String], required: true },
    logo: String,
    name: { type: String, required: true },
    numberEmployees: { type: Number, required: true },
    yearFounded: { type: Number, required: true },
  },
  { timestamps: true }
)

const CompanyModel = model<CompanyProps>('Company', CompanySchema)

export default CompanyModel
