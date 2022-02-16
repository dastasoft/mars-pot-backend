import { Schema, Model, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

import { User as UserProps } from '../types'

interface UserModel extends Model<UserProps> {}

interface UserDocument extends Document, UserProps {
  fullName: string
  isStrongPassword(): boolean
}

const UserSchema = new Schema<UserProps, UserModel>(
  {
    avatar: String,
    email: { type: String, required: true, lowercase: true, trim: true },
    firstName: { type: String, required: true },
    lastName: String,
    password: { type: String, required: true, minlength: 8 },
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
UserSchema.pre<UserDocument>('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      return next()
    })
  }
})

// Methods
UserSchema.methods.isStrongPassword = function (password: string) {
  return false
}

// Virtuals
UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return this.firstName + this.lastName
})

const User = model<UserProps, UserModel>('User', UserSchema)

export default User
