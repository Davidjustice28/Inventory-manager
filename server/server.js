const express = require("express")
const env = require("dotenv").config()
const bodyParser = require("body-parser")
const databaseMethods = require("./database")
const { Item } = require("./classes")

const app = express()
app.use(bodyParser.json())
const PORT = process.env.port

app.get("/users",async (req,res) => {
    let users = await databaseMethods.getUsers()
    res.json(users)
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
    let {updatedItem,id} = req.body
    let count = await databaseMethods.updateItem(updatedItem,id)
    res.send(`Items updated: ${count}`)
})

app.listen(PORT || 8000,() =>{
    console.log("Server listening on port 8000")
})