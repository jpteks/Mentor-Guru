import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_DB_URI));
    console.log("MongoDB Connected");
    
    return conn;
  } catch (error) {
    console.error("eror connecting to db",error);
  }
}
