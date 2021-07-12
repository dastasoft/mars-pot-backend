import express from "express";
import companyRoutes from "./routes/company";
import jobOfferRoutes from "./routes/jobOffer";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const PORT = 3000;

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .catch(err => console.log(err));

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/company", companyRoutes);
app.use("/job-offer", jobOfferRoutes);
