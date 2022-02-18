import { Request, Response } from 'express'

import CompanyModel from '../models/company'

const list = async (req: Request, res: Response) => {
  try {
    const company = await CompanyModel.find().sort({ createdAt: -1 })

    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error, message: 'No companies were found.' })
  }
}

const create = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'No job offer has provided' })
  }

  try {
    const company = await CompanyModel.create(req.body)
    res.status(201).json(company)
  } catch (error) {
    res.status(500).json({ error, message: 'Error creating the company' })
  }
}

const details = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const company = await CompanyModel.findById(id)
    if (!company)
      res.status(404).json({ message: `No companies were found with id ${id}` })
    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error, message: 'Error retrieving the company' })
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const company = await CompanyModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: true,
    })
    if (!company)
      res.status(404).json({
        message: `Cannot update Company with id ${id}. Company was not found.`,
      })
    res.status(200).json(company)
  } catch (error) {
    res
      .status(500)
      .json({ error, message: `Error updating Company with id ${id}.` })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const company = await CompanyModel.findByIdAndRemove(id)
    if (!company)
      res.status(404).json({
        message: `Cannot delete Company with id ${id}. Company was not found.`,
      })
    res.status(200).json(company)
  } catch (error) {
    res
      .status(500)
      .json({ error, message: `Error deleting Company with id ${id}.` })
  }
}

export { list, create, details, update, remove }
