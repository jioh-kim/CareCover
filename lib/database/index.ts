import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  // if connection exists, use it
  if (cached.conn) return cached.conn;

  // if the URI doesn't exist, throw an error
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // otherwise, create a new connection
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "carecover",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
