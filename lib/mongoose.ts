import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI it's not defined on the .env.local");
  }

  await mongoose.connect(uri);

  isConnected = true;
}
