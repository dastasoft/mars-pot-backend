import mongoose from "mongoose";

export default function connect(URL: string) {
  return mongoose.connect(URL);
}
