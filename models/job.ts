import { Schema, Model, model } from 'mongoose'

import { Job as JobProps } from '../types'

const JobSchema = new Schema<JobProps, Model<JobProps>>(
  {
    availablePositions: { type: Number, min: 1 },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    description: { type: String, required: true },
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

const JobModel = model<JobProps>('Job', JobSchema)

export default JobModel
