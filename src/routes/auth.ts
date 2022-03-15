import express from 'express'

import { signup, login } from '../controllers/user'

const router = express.Router()

router.post('/singup', signup)
router.post('/login', login)

export default router
