import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import { Company } from "../types";

const DB_PATH = path.resolve("database/companies.json");

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
  const company: Company = req.body;

  const companies: Company[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const newCompanies = [
    ...companies,
    { ...company, id: companies.length.toString() }
  ];

  fs.writeFile(DB_PATH, JSON.stringify(newCompanies, null, 2), error => {
    if (error) {
      console.error(error);
      res.status(500).end();
    } else {
      res.status(200).send({ message: "New company added." });
    }
  });
};

const details = (req: Request, res: Response) => {
  const { id } = req.params;
  const companies: Company[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const company = companies.find(company => company.id === id);

  if (company) {
    res.status(200).send(company);
  } else {
    res.status(404).send({ message: `Company with id ${id} not found.` });
  }
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const companyData: Company = req.body;

  const companies: Company[] = JSON.parse(fs.readFileSync(DB_PATH).toString());

  const company = companies.find(company => company.id === id);
  const updatedCompany: Company = { ...company, ...companyData };

  if (company) {
    const newCompanies: Company[] = [
      ...companies.filter(company => company.id !== id),
      updatedCompany
    ];

    fs.writeFile(DB_PATH, JSON.stringify(newCompanies, null, 2), error => {
      if (error) {
        console.error(error);
        res.status(500).end();
      } else {
        res.status(200).send({ message: `Company with id ${id} updated.` });
      }
    });
  } else {
    res.status(404).send({ message: `Company with id ${id} not found.` });
  }
};

const remove = (req: Request, res: Response) => {
  const { id } = req.params;

  const companies: Company[] = JSON.parse(fs.readFileSync(DB_PATH).toString());
  const company = companies.find(company => company.id === id);
  const newCompanies = companies.filter(company => company.id !== id);

  if (company) {
    fs.writeFile(DB_PATH, JSON.stringify(newCompanies, null, 2), error => {
      if (error) {
        console.error(error);
        res.status(500).end();
      } else {
        res.status(200).send({ message: `Company with id ${id} removed.` });
      }
    });
  } else {
    res.status(404).send({ message: `Company with id ${id} not found.` });
  }
};

export { list, create, details, update, remove };
