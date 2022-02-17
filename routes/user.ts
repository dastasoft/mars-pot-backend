import express from 'express'

import { list, signup, login, update, remove } from '../controller/user'

const router = express.Router()

router.get('/', list)
router.post('/singup', signup)
router.post('/login', login)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
