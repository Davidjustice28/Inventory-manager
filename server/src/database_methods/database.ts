import { MongoClient, ObjectId} from "mongodb";
import { Item } from "../_types/classes.js"
import { mongoClient } from "../_config/mongodb_client_config.js";

const client:MongoClient = mongoClient;

// User functions

export async function getUsers() {
    try{
        await client.connect()
        let db = client.db("Inventoryapp").collection("Users")
        let users = await db.find().toArray()
        console.log(users)
        client.close()
        return users
    }catch(err) {
        console.log(err)
    }
}

export async function addUser(name:string,password:string,username:string) {
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

// inventory crud operations

export async function addItem(item:Item,id:string) {
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

export async function deleteItem(Id:string,itemName:string) {
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


export async function updateItem(updatedItem:any,Id:string) {
    await client.connect()
    const db = client.db('Inventoryapp').collection('Users')
    let user = await db.findOne({_id:new ObjectId(Id)})
    let inventory = user!.Inventory
    for(let i = 0; i < inventory.length; i++) {
        if(inventory[i].SKU == updatedItem.SKU) {
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


//notes operations

export async function updateNote(updatedNote:any,id:string,projectTitle:string) {
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

//project  crud operations
export async function addProject(project:any,id:string) {
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

export async function deleteProject(Id:string,projectName:string) {
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

export async function updateProject(updatedProject:any,Id:string) {
    //console.log("updated project mongodb line 188",Id)
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

export const databaseMethods = { addUser,getUsers,addItem,updateItem,deleteItem,updateNote,addProject,deleteProject,updateProject}