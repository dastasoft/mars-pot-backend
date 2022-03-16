import { Request, Response } from 'express'

import UserModel from '../models/user'

const signup = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'No user data has been provided' })
  }

  try {
    const user = await UserModel.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error, message: 'Error creating the user' })
  }
}

const login = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'No user data has been provided' })
  }

  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })
    let isCorrectLogin: boolean | Error = false

    if (user) {
      isCorrectLogin = await user.isCorrectLogin(password)
      if (isCorrectLogin)
        res.status(200).json({ message: `Welcome ${user.fullName}` })
      else
        res.status(401).json({
          message: 'Email password combination is not correct',
        })
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Error retrieving the user' })
  }
}

export { signup, login }
