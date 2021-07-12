import { Request, Response } from "express";

import CompanyModel from "../model/company";

const list = (req: Request, res: Response) => {
  CompanyModel.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err, message: "No companies were found." });
    });
};

const create = (req: Request, res: Response) => {
  const company = new CompanyModel(req.body);

  company
    .save()
    .then(result => res.status(200).send(result))
    .catch(err =>
      res
        .status(500)
        .send({ error: err, message: "Error creating the company" })
    );
};

const details = (req: Request, res: Response) => {
  const { id } = req.params;

  CompanyModel.findById(id)
    .then(result => {
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send({ message: `No companies were found with id ${id}` });
      }
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: err, message: "Error retrieving the company" })
    );
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;

  CompanyModel.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Company with id ${id}. Company was not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: `Error updating Company with id ${id}.` });
    });
};

const remove = (req: Request, res: Response) => {
  const { id } = req.params;

  CompanyModel.findByIdAndRemove(id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Company with id ${id}. Company was not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: `Error deleting Company with id ${id}.` });
    });
};

export { list, create, details, update, remove };
