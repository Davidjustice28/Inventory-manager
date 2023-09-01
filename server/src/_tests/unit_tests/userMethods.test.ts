import assert from "assert";
import { MongoClient } from "mongodb";
import { wrapDbMethods, wrapGetUsers } from "../../database_methods/database.js";
import { mongoClient } from "../../_config/mongodb_client_config.js";

describe("User Database Methods", function() {
  let mockClient: MongoClient;
  describe("when client isn't initiated", function() {
    const dbMethods = wrapDbMethods(mockClient);
    const { getUsers } = dbMethods;
    
    it("Get Users Method Returns null response", async function() {
      const response = await getUsers()
      assert(response === null, "Users were unexpectedly returned when null was expected")
    });
  });

  describe("when client is setup", function() {
    it("Retrieves users from db", async function() {
      const client = mongoClient
      const getUsers = wrapGetUsers(client)
      const users = await getUsers()
      assert(users, "response was null indicating an unexpected error occurred")
      assert(users.length > 0, "The amount of users returned was unexpectedly 0")
    });
  });
});