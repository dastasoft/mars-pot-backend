import { Request, Response } from 'express'

import JobModel from '../models/job'
import { Company } from '../types'

const list = async (_req: Request, res: Response) => {
  try {
    const job = await JobModel.find()
      .populate<{ companyId: Company }>('companyId')
      .sort({
        createdAt: -1,
      })

    res.json(job)
  } catch (error) {
    res.status(500).json({ error, message: 'No jobs were found.' })
  }
}

const create = async (req: Request, res: Response) => {
  if (!req.body) res.status(400).json({ message: 'No job has provided' })

  try {
    const job = await JobModel.create(req.body)
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ error, message: 'Error creating the job' })
  }
}

const details = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const job = await JobModel.findById(id)
    if (!job)
      res.status(404).json({ message: `No jobs were found with id ${id}` })

    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({ error, message: 'Error retrieving the job' })
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const job = await JobModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: true,
    })

    if (!job)
      res.status(404).json({
        message: `Cannot update Job with id ${id}. Job was not found.`,
      })

    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({
      error,
      message: `Error updating Job with id ${id}.`,
    })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const job = await JobModel.findByIdAndRemove(id)
    if (!job)
      res.status(404).json({
        message: `Cannot delete Job with id ${id}. Job was not found.`,
      })

    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({
      error,
      message: `Error deleting Job with id ${id}.`,
    })
  }
}

export { list, create, details, update, remove }
