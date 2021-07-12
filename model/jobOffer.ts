import { Schema, Model, model } from "mongoose";
import { JobOffer as JobOfferProps } from "../types";

const jobOfferSchema = new Schema<
  JobOfferProps,
  Model<JobOfferProps>,
  JobOfferProps
>(
  {
    availablePositions: Number,
    companyId: { type: String, required: true },
    description: { type: String, required: true },
    function: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    numberApplicants: Number,
    postDate: { type: Date, required: true },
    published: { type: Boolean, required: true },
    requirements: { type: [String], required: true },
    salary: Number,
    workType: { type: String, required: true }
  },
  { timestamps: true }
);

const JobOffer = model<JobOfferProps>("JobOffer", jobOfferSchema);

export default JobOffer;
