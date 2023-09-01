const PRODUCTION_API_URL = "https://brokersphere-api.fly.dev"
const DEV_API_URL = "http://localhost:8000/users"
const ROOT_URL = DEV_API_URL
export async function getusers() {
    let response = await fetch(`${ROOT_URL}/users`)
      .then((res) => res.json())
      .finally((res) => {
        return res
      })
    //console.log("line 8 database functions",response)
    return response    
  }
  
  async function postdata(data,path) {
    let response = await fetch(`${ROOT_URL}/${path}`,{method:"POST", body: JSON.stringify(data),headers: {'Content-Type': 'application/json',}})
    .then((res) => res.json())
    .then((res) => {
      //console.log(res)
      return res
    })
    // console.log(response)
    return response
  }

  async function deletedata(data,path) {
    let response = await fetch(`${ROOT_URL}/${path}`,{method:"DELETE", body: JSON.stringify(data),headers: {'Content-Type': 'application/json',}})
    // console.log(response)
  }

export async function loginUser(password,username) {
    let response = await postdata({password:password,username:username},"get-user")
    //console.log(response)
    return response
}

export async function signupUser(password,username,name) {
    let response = await postdata({password:password,username:username,name:name},"new-user")
    //console.log(response)
    return response
  }

export async function createProject(name,userId,deadline,notes,cost) {
    let newProject =  {
      name: name,
      deadline: deadline,
      estimatedCost: cost,
      notes: notes,
      items: []
    }
    let data = {
      project: newProject,
      id: userId
    }
    let response = await postdata(data,"new-project")
    //console.log(response)
    return response
}

export async function deleteProject(project,userId) {
  let data = {
    projectName: project,
    id:userId

  }
  let response = await deletedata(data,"delete-project")
    //console.log(response)
    return response
}

export async function updateProject(name,deadline,estimatedCost,notes) {
  let updatedProject =  {
    "name": name,
    "deadline": deadline,
    "estimatedCost": estimatedCost,
    "notes": notes
  }
  let data = {
    project: updatedProject,
    id: userId
  }
  let response = await postdata(data,"updateproject")
  //console.log(response)
  return response
}

export async function updateNote(note,userId,project) {
  let data = {
    note: note,
    id: userId,
    projectName: project
  }
  let response = await postdata(data,"updatenote")
  console.log(response)
  return response
}

export async function addItem(item,userId) {
  let data = {
    item: item,
    id: userId
  }
  let response = await postdata(data,"new-item")
  //console.log(response)
  return response
}

export async function reloggedUser(id) {
  let users = await getusers()
  let user = users.filter((u) => {
       return (u._id == id)
  })[0]
   return user
}

export async function deleteItem(userId,itemName) {
  let data = {
    id: userId,
    item: itemName
  }
  let response = await deletedata(data,"item")
  let users = await getusers()
  return users
}