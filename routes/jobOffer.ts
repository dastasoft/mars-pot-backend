import express from "express";

import {
  list,
  create,
  details,
  update,
  remove,
  findPublished
} from "controller/jobOffer";
import { ROUTES } from "lib/constants";

const router = express.Router();

router.get(ROUTES.LIST_JOB_OFFERS, list);
router.post(ROUTES.CREATE_JOB_OFFER, create);
router.get(ROUTES.FIND_JOB_OFFER, details);
router.put(ROUTES.UPDATE_JOB_OFFER, update);
router.delete(ROUTES.DELETE_JOB_OFFER, remove);
router.get(ROUTES.FIND_PUBLISHED_JOB_OFFERS, findPublished);

export default router;
