import assert from "assert";
import { MongoClient } from "mongodb";
import { connectToDB } from "../../utils/connectToDb.js";
import { mongoClient } from "../../_config/mongodb_client_config.js";

describe("connectToDB utility", function() {
  let mockClient: MongoClient;
  it("Returns false when error occurs connecting to db", async function() {
    const connected = await connectToDB(mockClient);
    assert.strictEqual(connected, false, "function connected to db unexpectedly. Returned true")
  })

  it("Returns true when successfully connects to db", async function() {
    const connected = await connectToDB(mongoClient)
    assert(connected, "function did not successfully connect to db. Returned false")
  })

  this.afterAll(async function() {
    await mongoClient.close();
  })
})