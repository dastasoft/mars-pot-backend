import { Request, Response } from "express";

import JobOfferModel from "../model/jobOffer";

const list = (req: Request, res: Response) => {
  JobOfferModel.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: "No job offers were found." });
    });
};

const create = (req: Request, res: Response) => {
  const jobOffer = new JobOfferModel(req.body);

  jobOffer
    .save()
    .then(result => res.status(200).send(result))
    .catch(err =>
      res
        .status(500)
        .send({ error: err, message: "Error creating the job offer" })
    );
};

const details = (req: Request, res: Response) => {
  const { id } = req.params;

  JobOfferModel.findById(id)
    .then(result => {
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send({ message: `No job offers were found with id ${id}` });
      }
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: err, message: "Error retrieving the job offer" })
    );
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;

  JobOfferModel.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Job Offer with id ${id}. Job Offer was not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: `Error updating Job Offer with id ${id}.`
      });
    });
};

const remove = (req: Request, res: Response) => {
  const { id } = req.params;

  JobOfferModel.findByIdAndRemove(id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Job Offer with id ${id}. Job Offer was not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: `Error deleting Job Offer with id ${id}.`
      });
    });
};

const findPublished = (req: Request, res: Response) => {
  JobOfferModel.find({ published: true })
    .sort({ createdAt: -1 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: "No job offers were found." });
    });
};

export { list, create, details, update, remove, findPublished };
