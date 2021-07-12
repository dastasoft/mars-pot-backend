import mongoose from "mongoose";

export default function connect() {
  return mongoose.connect(`${process.env.MONGO_URI}`, {
    useFindAndModify: false
  });
}
