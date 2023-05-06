import { createContext, useEffect, useState } from 'react'
import Dashboard from './components/pages/Dashboard'
import Inventory from './components/pages/Inventory'
import NavBar from './components/reusables/NavBar'
import {Route,Routes} from "react-router-dom"
import './styles/App.css'
import Signup from './components/pages/Signup'
import LoginPage from './components/pages/Login'
import Projects from './components/pages/Projects'
import Home from './components/pages/Home'
import { getusers } from './utilities/database-functions'
import Project from './components/pages/Project'
import Item from './components/pages/Item'
import SettingsPage from './components/pages/Settings'
import NewProjectPage from './components/pages/NewProject'

export const loggedInContext = createContext()
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedUser,setLoggedUser] = useState({Name:" "})
  const [users,setUsers] = useState([])
  useEffect(() => {
    async function acquireUsers() {
      let result = await getusers()
      setUsers(result)
    }
    acquireUsers()
    if(localStorage.getItem("user")) {
      //let user = users.filter((u) => u._id == localStorage.getItem("user"))
      //console.log("found user from localstorage",user)
      let user = JSON.parse(localStorage.getItem("user"))
      //console.log("user", localStorage.getItem("user"))
      setLoggedUser(user)
      setLoggedIn(true)
      
    }
    
  },[])

  useEffect(() => {
    //console.log("users",users)
    //console.log("logged in?", loggedIn)
    if(loggedIn) {
      let savedUser = JSON.parse(localStorage.getItem("user"))
      let user = users.filter((u) => {
        return (u._id == savedUser._id)
      })[0]
      setLoggedUser(user)
    }
  },[users])


  return (
    <div className="App">
      <loggedInContext.Provider value={[loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers]}>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/inventory' element={<Inventory user={loggedUser}/>}></Route>
        <Route path='/signup' element={<Signup users={users} setuser ={setUsers}/>}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/settings' element={<SettingsPage/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/project/:projectname' element={<Project/>} loader={({ params }) => params.projectname}></Route>
        <Route path='/item/:itemSku' element={<Item/>} loader={({params}) => params.itemSku}></Route>
        <Route path='/newproject' element={<NewProjectPage/>}></Route>
      </Routes>
      </loggedInContext.Provider>
  
    </div>
  )
}

export default App
