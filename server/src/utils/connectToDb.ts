import { MongoClient } from "mongodb";

export async function connectToDB(client: MongoClient| undefined): Promise<boolean> {
  if(client  === undefined) {
    return false
  } 
  else {
    try {
      await client.connect()
      return true
  
    }catch(err) {
      return false
    }
  }
}