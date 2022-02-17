import { Schema, Model, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

import { User as UserProps } from '../types'

interface UserDocument extends Document, UserProps {
  fullName: string
  handleLogin(password: string): Promise<Error | void>
}

interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema<UserDocument, UserModel>(
  {
    avatar: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: String,
    password: { type: String, required: true, minlength: 8 },
    type: {
      type: String,
      enum: ['applicant', 'recruiter'],
      default: 'applicant',
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxLength: 24,
    },
  },
  { timestamps: true }
)

// Document middlewares
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const rounds = 10
    const hash = await bcrypt.hash(this.password, rounds)
    this.password = hash
  }
  next()
})

// Methods
UserSchema.methods.handleLogin = function (password: string) {
  return new Promise<Error | void>((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, result) {
      if (err) return reject(err)
      if (result) return resolve()
      return reject()
    })
  })
}

// Virtuals
UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return this.firstName + this.lastName
})

const User = model<UserDocument, UserModel>('User', UserSchema)

export default User
