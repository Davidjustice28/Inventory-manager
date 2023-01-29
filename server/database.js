const {MongoClient, ObjectId} = require("mongodb")
const env = require("dotenv").config()

const {password} = process.env
const URI = `mongodb+srv://Admin:${password}@inventory-manager.s8gd6.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(URI,{useNewUrlParser: true,useUnifiedTopology:true})

// User functions

async function getUsers() {
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

async function addUser(name,password,username) {
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

async function addItem(item,id) {
    await client.connect()
    const db = client.db("Inventoryapp").collection("Users")
    const updatedDoc = {
        $push: {
            Inventory: item
        }
    }
    const result = await db.updateOne({_id: ObjectId(id)},updatedDoc)
    return result.modifiedCount
}

async function deleteItem(Id,itemName) {
    await client.connect()
    const db = client.db("Inventoryapp").collection("Users")
    const user = await db.findOne({_id: ObjectId(Id)})
    
    let newInventory = [...user.Inventory]
    newInventory = newInventory.filter((item) => {
        return item.name != itemName
    })

    const updatedInventory = {
        $set: {
            Inventory: newInventory
        }
    }
    const result = await db.updateOne({_id:ObjectId(Id)},updatedInventory)
    console.log(`Item ${itemName} was removed from inventory`)
    return result
}


async function updateItem(updatedItem,Id) {
    await client.connect()
    const db = client.db('Inventoryapp').collection('Users')
    let user = await db.findOne({_id:ObjectId(Id)})
    let inventory = user.Inventory
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
    const result = await db.updateOne({_id: ObjectId(Id)}, updatedDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    return result.modifiedCount
}


//notes operations

async function updateNote(updatedNote,id,projectTitle) {
    await client.connect()
    const db = client.db("Inventoryapp").collection("Users")
    const user = await db.findOne({_id:ObjectId(id)})
    let projects = user.Projects
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
    const result = await db.updateOne({_id:ObjectId(id)},updatedDoc)
    return result.modifiedCount
}

//project  crud operations
async function addProject(project,id) {
    await client.connect()
    const db = client.db("Inventoryapp").collection("Users")
    const updatedDoc = {
        $push: {
            Projects: project
        }
    }
    const result = await db.updateOne({_id: ObjectId(id)},updatedDoc)
    return result.modifiedCount
}

async function deleteProject(Id,projectName) {
    await client.connect()
    const db = client.db("Inventoryapp").collection("Users")
    const user = await db.findOne({_id: ObjectId(Id)})
    
    let projects = [...user.Projects]
    projects = projects.filter((item) => {
        return item.name != projectName
    })

    const updatedDoc = {
        $set: {
            Projects: projects
        }
    }
    const result = await db.updateOne({_id:ObjectId(Id)},updatedDoc)
    console.log(`Project ${projectName} was removed from inventory`)
    return result.modifiedCount
}

async function updateProject(updatedProject,Id) {
    //console.log("updated project mongodb line 188",Id)
    await client.connect()
    const db = client.db('Inventoryapp').collection('Users')
    let user = await db.findOne({_id:ObjectId(Id)})
    let projects = user.Projects
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
    const result = await db.updateOne({_id: ObjectId(Id)}, updatedDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    return result.modifiedCount
}

module.exports = { addUser,getUsers,addItem,updateItem,deleteItem,updateNote,addProject,deleteProject,updateProject}