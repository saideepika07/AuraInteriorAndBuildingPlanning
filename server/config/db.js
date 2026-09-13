import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aura_spaces";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`✓ MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`! MongoDB Connection Warning: ${error.message}`);
    console.warn(`! The server is running in memory/graceful mode until a valid MONGO_URI is set in server/.env`);
    return null;
  }
};

export const isDbConnected = () => isConnected;

export default connectDB;
