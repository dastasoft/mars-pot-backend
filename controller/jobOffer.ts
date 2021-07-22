import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import { JobOffer } from "../types";

const DB_PATH = path.resolve("database/joboffers.json");

const list = (req: Request, res: Response) => {
  fs.readFile(DB_PATH, (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).end();
    } else {
      res.status(200).send(JSON.parse(data.toString()));
    }
  });
};

const create = (req: Request, res: Response) => {
  const jobOffer: JobOffer = req.body;

  const jobOffers: JobOffer[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const newJobOffers = [...jobOffers, jobOffer];

  fs.writeFile(DB_PATH, JSON.stringify(newJobOffers, null, 2), error => {
    if (error) {
      console.error(error);
      res.status(500).end();
    } else {
      res.status(200).send({ message: "New job offer added." });
    }
  });
};

const details = (req: Request, res: Response) => {
  const { id } = req.params;
  const jobOffers: JobOffer[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const jobOffer = jobOffers.find(jobOffer => jobOffer.id === id);

  if (jobOffer) {
    res.status(200).send(jobOffer);
  } else {
    res.status(404).send({ message: `Job offer with id ${id} not found.` });
  }
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const jobOfferData: JobOffer = req.body;

  const jobOffers: JobOffer[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const jobOffer = jobOffers.find(jobOffer => jobOffer.id === id);
  const updatedJobOffer = { ...jobOffer, ...jobOfferData };

  if (jobOffer) {
    const newJobOffers: JobOffer[] = [
      ...jobOffers.filter(jobOffer => jobOffer.id !== id),
      updatedJobOffer
    ];

    fs.writeFile(DB_PATH, JSON.stringify(newJobOffers, null, 2), error => {
      if (error) {
        console.error(error);
        res.status(500).end();
      } else {
        res.status(200).send({ message: `Job offer with id ${id} updated.` });
      }
    });
  } else {
    res.status(404).send({ message: `Job offer with id ${id} not found.` });
  }
};

const remove = (req: Request, res: Response) => {
  const { id } = req.params;

  const jobOffers: JobOffer[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const jobOffer = jobOffers.find(jobOffer => jobOffer.id === id);
  const newJobOffers = jobOffers.filter(jobOffer => jobOffer.id !== id);

  if (jobOffer) {
    fs.writeFile(DB_PATH, JSON.stringify(newJobOffers), error => {
      if (error) {
        console.error(error);
        res.status(500).end();
      } else {
        res.status(200).send({ message: `Job offer with id ${id} removed.` });
      }
    });
  } else {
    res.status(404).send({ message: `Job offer with id ${id} not found.` });
  }
};

const findPublished = (req: Request, res: Response) => {
  const jobOffers: JobOffer[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const published: JobOffer[] = jobOffers.filter(
    jobOffer => jobOffer.published
  );

  res.status(200).send(JSON.parse(published.toString()));
};

export { list, create, details, update, remove, findPublished };
