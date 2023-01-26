const express = require("express")
const env = require("dotenv").config()
const bodyParser = require("body-parser")
const databaseMethods = require("./database")
const { Item } = require("./classes")

const app = express()
const PORT = process.env.port

app.use(bodyParser.json())

app.get("/users",async (req,res) => {
    let users = await databaseMethods.getUsers()
    res.json(users)
})

app.post("/get-user", async(req,res) => {
    let {username,password} = req.body
    let users = await databaseMethods.getUsers()
    let foundUser = users.some(u => {
        return u.Password == password && u.Username == username
    })
    let responseUser = {user:{}, validated:false}
    if(foundUser) {
        console.log("founduser is ",foundUser)
        let user = users.filter(u => {
            return (u.Password == password) && (u.Username == username)
        })[0]
        responseUser.user = user
        responseUser.validated = true
        res.json(responseUser)
        
    }else {
        console.log("founduser is",foundUser)
        res.json(responseUser)
    }
})

app.post("/new-user",async(req,res) => {
    let {password,username,name} = req.body
    let id = await databaseMethods.addUser(name,password,username)
    res.send(id)
})

app.post("/new-item", async(req,res) => {
    let {item,id} = req.body
    await databaseMethods.addItem(item,id)
    let users = await databaseMethods.getUsers()
    res.json(users)
})


app.delete("/item", async(req,res) => {
    let {id,item} = req.body
    let count = await databaseMethods.deleteItem(id,item)
    res.send(`${item} was deleted from inventory`)
})


app.put("/update-item",async(req,res) => {
    let {item,id} = req.body
    console.log(req.body)
    let count = await databaseMethods.updateItem(item,id)
    res.send(`Items updated: ${count}`)
})

app.post("/new-project", async(req,res) => {
    let {project,id} = req.body
    let count = await databaseMethods.addProject(project,id)
    res.send(`Project "${project.name}" was created`)
})

app.delete("/delete-project", async(req,res) => {
    let {id,projectName} = req.body
    let count = await databaseMethods.deleteProject(id,projectName)
    res.send(`Project "${projectName}" was deleted.`)
})

app.post("/updateproject", async (req,res) => {
    console.log(req.body)
    let {project,id} = req.body
    console.log(req.body)
    let count = await databaseMethods.updateProject(project,id)
    res.send(`${count} project updated`)
})



app.put("/updatenote",async(req,res) => {
    let {note,projectName,id} = req.body
    let count = await databaseMethods.updateNote(note,id,projectName)
    if(count > 0) {
        res.send(`The ${projectName} project's notes were updated`)
    }else {
        res.send("No notes were updated")
    }

})





app.listen(PORT || 8000,() =>{
    console.log("Server listening on port 8000")
})