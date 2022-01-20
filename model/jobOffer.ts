import { Schema, Model, model } from "mongoose";

import { JobOffer as JobOfferProps } from "../types";

const jobOfferSchema = new Schema<
  JobOfferProps,
  Model<JobOfferProps>,
  JobOfferProps
>(
  {
    availablePositions: { type: Number },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    description: { type: String, required: true },
    function: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    numberApplicants: { type: Number },
    postDate: { type: Date, required: true },
    published: { type: Boolean, required: true },
    requirements: { type: [String], required: true },
    salary: { type: Number },
    workType: { type: String, required: true },
  },
  { timestamps: true }
);

const JobOffer = model<JobOfferProps>("JobOffer", jobOfferSchema);

export default JobOffer;
