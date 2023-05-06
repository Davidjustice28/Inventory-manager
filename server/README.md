# Backend Directory
Stores all source files for Inventory-Manager backend

## Quick Codebase Breakdown (Src Folder)

| Directory | Description |
| --------- | ----------- |
| Config    | Setup and configurs server and database |
| Tests     | Testing instructions |
| Types     | Type definitions and classes |
| Database  | Various CRUD related MongoDB methods |

**Tech Stack** - TypeScript, Express, NodeJS, & MongoDB

\* *<small>Codebase is currently being converted from vanilla JavaScript to TypeScript</small>*

 ### Run Server Locally

 Before doing any server testing make sure to upload a .env file with the required credentials (email me to get the needed credentials as it expects mine): 

 ```env
 // environment variables
password = MONGO_DB_ATLAS_CLUSTER_PASSWORD
username = MONGO_DB_ATLAS_CLUSTER_USERNAME
port = 8000
 ```

 Then run the following scripts:

```Shell
// Compiles TypeScript src files
npm run build
// Starts server
npm start
```

### Testing Options

1. **Mocha Unit Tests**

``` shell
// Run just to make sure latest changes are built out
npm run build
// Runs all mocha unit tests
npm test
```

2. **VS Code Editor API Testing**
- Must have REST Client Extension installed
- Enter "npm start" into command line to start local server
- Click on src/_tests/rest_client.http file
- Hover over any of the test routes (ex: localhost:8000/route), right click to find SEND REQUEST command. Click and watch the magic!

3. **Postman** - COMING SOON!


#### Currently Happening
- Creating Postman JSON file
- Adding types to type directory
- Separating database methods out to separate files for readability
- Adding TsDocs and various markdown files for documentation