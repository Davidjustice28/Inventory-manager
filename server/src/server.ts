import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { app, port } from "./_config/app_config.js";
import { wrapDbMethods } from "./database_methods/database.js";
import { mongoClient } from "./_config/mongodb_client_config.js";
import { validateUsername } from "./middleware/validateUsername.js";
dotenv.config();

const databaseMethods = wrapDbMethods(mongoClient);

app.use(cors());
app.use(bodyParser.json());

app.get("/users",async (req,res) => {
    let users = await databaseMethods.getUsers();
    res.json(users);
});

app.post("/get-user", async(req,res) => {
    let {username,password} = req.body;
    let users = await databaseMethods.getUsers();
    let foundUser = users!.some((u:any) => {
        return ((u.Password == password) && (u.Username == username));
    });
    let responseUser = {user:{}, validated:false};
    if(foundUser) {
        let user = users!.filter((u:any) => {
            return (u.Password == password) && (u.Username == username);
        })[0];
        responseUser.user = user;
        responseUser.validated = true;
        res.json(responseUser);
        
    }else {
        res.json(responseUser);
    }
});

app.post("/new-user", validateUsername, async(req,res) => {
    let {password,username,name} = req.body;
    let id = await databaseMethods.addUser(name,password,username);
    res.send(id);
});

app.post("/new-item", async(req,res) => {
    let {item,id} = req.body;
    await databaseMethods.addItem(item,id);
    let users = await databaseMethods.getUsers();
    res.json(users);
});

app.delete("/item", async(req,res) => {
    let {id,item} = req.body;
    let count = await databaseMethods.deleteItem(id,item);
    res.send(`${item} was deleted from inventory`);
});

app.post("/update-item",async(req,res) => {
    let {item,id} = req.body;
    console.log("req item")
    console.log(item)
    let count = await databaseMethods.updateItem(item,id);
    res.send(`Items updated: ${count}`);
});

app.post("/new-project", async(req,res) => {
    let {project,id} = req.body;
    let count = await databaseMethods.addProject(project,id);
    res.send(`Project "${project.name}" was created`);
});

app.delete("/delete-project", async(req,res) => {
    let {id,projectName} = req.body;
    let count = await databaseMethods.deleteProject(id,projectName);
    res.send(`Project "${projectName}" was deleted.`);
});

app.post("/updateproject", async (req,res) => {
    let {project,id} = req.body;
    let count = await databaseMethods.updateProject(project,id);
    res.send(`${count} project updated`);
});

app.post("/updatenote",async(req,res) => {
    let {note,projectName,id} = req.body;
    let count = await databaseMethods.updateNote(note,id,projectName);
    if(count === null) {
        res.send("No value for project update count was found")
    }
    else if(count > 0) {
        res.send(`The ${projectName} project's notes were updated`);
    }else {
        res.send("No notes were updated");
    }
});


app.listen(process.env.PORT || port,() =>{
    console.log(`Server listening on port ${process.env.PORT || port}`);
});