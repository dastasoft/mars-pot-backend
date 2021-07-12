import express from "express";

import {
  list,
  create,
  details,
  update,
  remove,
  findPublished
} from "../controller/jobOffer";

const router = express.Router();

router.get("/", list);
router.post("/", create);
router.get("/find/:id", details);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/published", findPublished);

export default router;
