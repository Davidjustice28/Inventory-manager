import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const {password} = process.env;
const URI = `mongodb+srv://Admin:${password}@inventory-manager.s8gd6.mongodb.net/?retryWrites=true&w=majority`;
export const mongoClient:MongoClient = new MongoClient(URI);