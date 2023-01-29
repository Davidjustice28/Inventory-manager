export async function getusers() {
    let response = await fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .finally((res) => {
        return res
      })
    //console.log("line 8 database functions",response)
    return response    
  }
  
  async function postdata(data,path) {
    let response = await fetch(`http://localhost:8000/${path}`,{method:"POST", body: JSON.stringify(data),headers: {'Content-Type': 'application/json',}})
    .then((res) => res.json())
    .then((res) => {
      //console.log(res)
      return res
    })
    // console.log(response)
    return response
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

