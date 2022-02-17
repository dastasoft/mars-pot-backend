import { ObjectId } from 'mongoose'

type Company = {
  about: string
  createdAt: Date
  industries: string[]
  logo?: string
  name: string
  numberEmployees: string
  updatedAt: Date
  yearFounded: number
}

type JobOffer = {
  availablePositions?: number
  companyId: ObjectId
  createdAt: Date
  description: string
  function: string
  industry: string
  location: string
  numberApplicants?: number
  postDate?: Date
  published: boolean
  requirements: string[]
  salary?: number
  updatedAt: Date
  workType: string
}

type User = {
  avatar?: string
  createdAt: Date
  email: string
  firstName: string
  lastName?: string
  password: string
  type: 'applicant' | 'recruiter'
  updatedAt: Date
  username: string
}

export { Company, JobOffer, User }
