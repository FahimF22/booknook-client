import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing in .env.local");

// Reuse one client across hot reloads in development
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const mongoClient = globalForMongo._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = mongoClient;

export const db = mongoClient.db(process.env.DB_NAME || "booknook");
