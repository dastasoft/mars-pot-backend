import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    const Mongoose = await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`💿 MongoDB Live: ${Mongoose.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
