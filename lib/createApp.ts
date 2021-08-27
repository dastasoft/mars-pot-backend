import express from "express";
import morgan from "morgan";

import companyRoutes from "routes/company";
import jobOfferRoutes from "routes/jobOffer";
import { ROUTES } from "./constants";

export default function createApp() {
  const app = express();

  // middlewares
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // routes
  app.use(ROUTES.COMPANY, companyRoutes);
  app.use(ROUTES.JOB_OFFER, jobOfferRoutes);

  return app;
}
