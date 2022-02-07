import { Request, Response } from 'express'

import JobOfferModel from '../model/jobOffer'
import { Company } from '../types'

const list = (req: Request, res: Response) => {
  JobOfferModel.find()
    .populate<{ companyId: Company }>('companyId')
    .sort({ createdAt: -1 })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({ error: err, message: 'No job offers were found.' })
    })
}

const create = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({ message: 'No job offer has provided' })
  }

  JobOfferModel.create(req.body)
    .then(result => res.status(200).send(result))
    .catch(err =>
      res
        .status(500)
        .send({ error: err, message: 'Error creating the job offer' })
    )
}

const details = (req: Request, res: Response) => {
  const { id } = req.params

  JobOfferModel.findById(id)
    .populate<{ companyId: Company }>('companyId')
    .sort({ createdAt: -1 })
    .then(result => {
      if (result) {
        res.status(200).send(result)
      } else {
        res
          .status(404)
          .send({ message: `No job offers were found with id ${id}` })
      }
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: err, message: 'Error retrieving the job offer' })
    )
}

const update = (req: Request, res: Response) => {
  const { id } = req.params

  JobOfferModel.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Job Offer with id ${id}. Job Offer was not found.`,
        })
      } else {
        res.status(200).send(result)
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: `Error updating Job Offer with id ${id}.`,
      })
    })
}

const remove = (req: Request, res: Response) => {
  const { id } = req.params

  JobOfferModel.findByIdAndRemove(id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Job Offer with id ${id}. Job Offer was not found.`,
        })
      } else {
        res.status(200).send(result)
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: `Error deleting Job Offer with id ${id}.`,
      })
    })
}

const findPublished = (req: Request, res: Response) => {
  JobOfferModel.find({ published: true })
    .populate<{ companyId: Company }>('companyId')
    .sort({ createdAt: -1 })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({ error: err, message: 'No job offers were found.' })
    })
}

export { list, create, details, update, remove, findPublished }
