import { Request, Response } from 'express'

import UserModel from '../model/user'

const list = (req: Request, res: Response) => {
  UserModel.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({ error: err, message: 'No users were found.' })
    })
}

const create = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({ message: 'No user data has been provided' })
  }

  UserModel.create(req.body)
    .then(result => res.status(200).send(result))
    .catch(err =>
      res.status(500).send({ error: err, message: 'Error creating the user' })
    )
}

const details = (req: Request, res: Response) => {
  const { id } = req.params

  UserModel.findById(id)
    .sort({ createdAt: -1 })
    .then(result => {
      if (result) {
        res.status(200).send(result)
      } else {
        res.status(404).send({ message: `No users were found with id ${id}` })
      }
    })
    .catch(err =>
      res.status(500).send({ error: err, message: 'Error retrieving the user' })
    )
}

const update = (req: Request, res: Response) => {
  const { id } = req.params

  UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update user with id ${id}. User was not found.`,
        })
      } else {
        res.status(200).send(result)
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: `Error updating user with id ${id}.`,
      })
    })
}

const remove = (req: Request, res: Response) => {
  const { id } = req.params

  UserModel.findByIdAndRemove(id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete user with id ${id}. User was not found.`,
        })
      } else {
        res.status(200).send(result)
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: `Error deleting user with id ${id}.`,
      })
    })
}

export { list, create, details, update, remove }
