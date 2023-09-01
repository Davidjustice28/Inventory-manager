import { mongoClient } from "../_config/mongodb_client_config.js";
import { Request, Response, NextFunction } from "express";
import { wrapGetUsers } from "../database_methods/database.js";

export async function validateUsername(req: Request, res: Response, next: NextFunction) {
  const getUsers = wrapGetUsers(mongoClient);
  const body = await req.body() as Object;
  if( "username" in body) {
    const username = body["username"];
    const users = await getUsers() 
    if(!users) {
      res.status(400).send("No users were found in db to check");
    }
    else if(users.length < 1) {
      next()
    }

    else {
      let usernameIsUnique:boolean = users.every(user => user.Username !== username);
      if( usernameIsUnique) {
        next()
      }
      else {
        res.status(400).send("Username provided has already been taken");
      }
    }
  }
  next();
}
