import express from "express";

import { list, create, details, update, remove } from "controller/company";
import { ROUTES } from "lib/constants";

const router = express.Router();

router.get(ROUTES.LIST_COMPANIES, list);
router.post(ROUTES.CREATE_COMPANY, create);
router.get(ROUTES.FIND_COMPANY, details);
router.put(ROUTES.UPDATE_COMPANY, update);
router.delete(ROUTES.DELETE_COMPANY, remove);

export default router;
