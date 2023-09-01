import { MongoClient, ObjectId} from "mongodb";
import { DBMethods } from "../_types/database.types.js";
import { InventoryItem } from "../_types/index.types.js";

export function wrapGetUsers(client: MongoClient) {
    async function getUsers() {
        try{
            await client.connect()
            let db = client.db("Inventoryapp").collection("Users")
            let users = await db.find().toArray()
            client.close()
            return users
        }catch(err) {
            return null
        }
    }
    return(getUsers)
}
export function wrapAddUser(client: MongoClient) {
    async function addUser(name:string,password:string,username:string) {
        try {
        await client.connect()
        let db = client.db("Inventoryapp").collection("Users")
        let newUser = {
            Name:name,
            Username:username,
            Password:password,
            Inventory: [],
            Projects:[]
        }
        let result = await db.insertOne(newUser)
        console.log(`New user added to database with the this ID: ${result.insertedId}`)
        client.close()
        return result.insertedId
        }catch(err) {
            console.log(err)
        }
    }
    return(addUser)
}

// inventory crud operations
export function wrapAddItem(client: MongoClient) {
    async function addItem(item:InventoryItem, id:string) {
        await client.connect()
        const db = client.db("Inventoryapp").collection("Users")
        const updatedDoc = {
            $push: {
                Inventory: item
            }
        }
        const result = await db.updateOne({_id: new ObjectId(id)},updatedDoc)
        return result.modifiedCount
    }
    return addItem
}
export function wrapDeleteItem(client: MongoClient) {
    async function deleteItem(Id:string,itemName:string) {
        await client.connect()
        const db = client.db("Inventoryapp").collection("Users")
        const user = await db.findOne({_id: new ObjectId(Id)})
        
        let newInventory = [...user!.Inventory]
        newInventory = newInventory.filter((item) => {
            return item.name != itemName
        })

        const updatedInventory = {
            $set: {
                Inventory: newInventory
            }
        }
        const result = await db.updateOne({_id: new ObjectId(Id)},updatedInventory)
        console.log(`Item ${itemName} was removed from inventory`)
        return result
    }
    return deleteItem
}

export function wrapUpdateItem(client: MongoClient) {
    async function updateItem(updatedItem:any,Id:string) {
        await client.connect()
        const db = client.db('Inventoryapp').collection('Users')
        let user = await db.findOne({_id:new ObjectId(Id)})
        let inventory = user!.Inventory
        for(let i = 0; i < inventory.length; i++) {
            if(inventory[i].SKU === updatedItem.SKU) {
                console.log(`found ${inventory[i]} to update`)
                inventory[i] = updatedItem
            }
        }
        const updatedDoc = {
            $set: {
                Inventory: inventory
            }
        }
        const result = await db.updateOne({_id: new ObjectId(Id)}, updatedDoc);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
        return result.modifiedCount
    }
    return updateItem
}

//notes operations
export function wrapUpdateNote(client: MongoClient) {
    async function updateNote(updatedNote:string,id:string,projectTitle:string) {
        await client.connect()
        const db = client.db("Inventoryapp").collection("Users")
        const user = await db.findOne({_id:new ObjectId(id)})
        let projects = user!.Projects
        for(let i = 0; i < projects.length; i++) {
            if(projects[i].name == projectTitle) {
                projects[i].notes = updatedNote
            }
        }
        const updatedDoc = {
            $set: {
                Projects: projects
            }
        }
        const result = await db.updateOne({_id:new ObjectId(id)},updatedDoc)
        return result.modifiedCount
    }
    return updateNote
}

//project  crud operations
export function wrapAddProject(client: MongoClient) {
    async function addProject(project:any,id:string) {
        await client.connect()
        const db = client.db("Inventoryapp").collection("Users")
        const updatedDoc = {
            $push: {
                Projects: project
            }
        }
        const result = await db.updateOne({_id: new ObjectId(id)},updatedDoc)
        return result.modifiedCount
    }
    return addProject
}

export function wrapDeleteProject(client: MongoClient) {
    async function deleteProject(Id:string,projectName:string) {
        await client.connect()
        const db = client.db("Inventoryapp").collection("Users")
        const user = await db.findOne({_id: new ObjectId(Id)})
        
        let projects = [...user!.Projects]
        projects = projects.filter((item) => {
            return item.name != projectName
        })

        const updatedDoc = {
            $set: {
                Projects: projects
            }
        }
        const result = await db.updateOne({_id:new ObjectId(Id)},updatedDoc)
        console.log(`Project ${projectName} was removed from inventory`)
        return result.modifiedCount
    }
    return deleteProject
}

export function wrapUpdateProject(client: MongoClient) {
    async function updateProject(updatedProject:any,Id:string) {
        await client.connect()
        const db = client.db('Inventoryapp').collection('Users')
        let user = await db.findOne({_id: new ObjectId(Id)})
        let projects = user!.Projects
        for(let i = 0; i < projects.length; i++) {
            if(projects[i].name == updatedProject.name) {
                projects[i] = updatedProject
            }
        }
        const updatedDoc = {
            $set: {
                Projects: projects
            }
        }
        const result = await db.updateOne({_id: new ObjectId(Id)}, updatedDoc);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
        return result.modifiedCount
    }
    return updateProject
}

export function wrapDbMethods(client: MongoClient): DBMethods {
    const addUser = wrapAddUser(client)
    const getUsers = wrapGetUsers(client)
    const addItem = wrapAddItem(client)
    const updateItem = wrapUpdateItem(client)
    const deleteItem = wrapDeleteItem(client)
    const updateNote = wrapUpdateNote(client)
    const addProject = wrapAddProject(client)
    const deleteProject = wrapDeleteProject(client)
    const updateProject = wrapUpdateProject(client)
    return({ addUser,getUsers,addItem,updateItem,deleteItem,updateNote,addProject,deleteProject,updateProject})
}
