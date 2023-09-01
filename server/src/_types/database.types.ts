import { Document, ObjectId, UpdateResult, WithId } from "mongodb";
import { InventoryItem } from "./index.types";

export type AddUser = (name: string, password: string, username: string) => Promise<ObjectId | undefined>;
export type GetUsers = () =>  Promise<WithId<Document>[] | null>;
export type UpdateItem = (updatedItem: any, Id: string) => Promise<number>;
export type AddItem = (item: InventoryItem, id: string) => Promise<number>;
export type DeleteItem = (Id: string, itemName: string) => Promise<UpdateResult>;
export type AddProject = (project: any, id: string) => Promise<number>;
export type DeleteProject = (Id: string, projectName: string) => Promise<number>;
export type UpdateProject = (updatedProject: any, Id: string) => Promise<number>;
export type UpdateNote = (updatedNote: string, id: string, projectTitle: string) => Promise<number>;

export interface DBMethods {
  addUser: AddUser,
  getUsers: GetUsers,
  updateItem: UpdateItem,
  addItem: AddItem,
  deleteItem: DeleteItem,
  addProject: AddProject,
  deleteProject: DeleteProject,
  updateProject: UpdateProject,
  updateNote: UpdateNote
}