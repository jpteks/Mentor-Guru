import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_DB_URI));
    return conn;
  } catch (error) {
    console.error(error);
  }
}
