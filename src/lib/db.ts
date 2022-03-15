import mongoose from 'mongoose'

mongoose.connection.on('open', () => {
  console.log(`💿 MongoDB Connected`)
})

export default async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`)
  } catch (error) {
    console.error(error)
  }
}
