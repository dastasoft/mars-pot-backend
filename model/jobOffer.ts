import { Schema, Model, model } from 'mongoose'

import { JobOffer as JobOfferProps } from '../types'

const jobOfferSchema = new Schema<
  JobOfferProps,
  Model<JobOfferProps>,
  JobOfferProps
>(
  {
    availablePositions: { type: Number, min: 1 },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    description: { type: String, required: true, minLength: 250 },
    function: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    numberApplicants: Number,
    postDate: { type: Date, default: () => Date.now() },
    published: { type: Boolean, required: true },
    requirements: { type: [String], required: true },
    salary: Number,
    workType: { type: String, required: true },
  },
  { timestamps: true }
)

const JobOffer = model<JobOfferProps>('JobOffer', jobOfferSchema)

export default JobOffer
