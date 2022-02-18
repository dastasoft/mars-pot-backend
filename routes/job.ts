import express from 'express'

import { list, create, details, update, remove } from '../controllers/job'

const router = express.Router()

router.get('/', list)
router.post('/', create)
router.get('/:id', details)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
