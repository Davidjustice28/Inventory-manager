import { createContext, useState } from 'react'
import Dashboard from './components/pages/Dashboard'
import Inventory from './components/pages/Inventory'
import NavBar from './components/reusables/NavBar'
import {Route,Routes} from "react-router-dom"
import './styles/App.css'
import Signup from './components/pages/Signup'
import LoginPage from './components/pages/Login'
import Projects from './components/pages/Projects'
import Home from './components/pages/Home'

export const loggedInContext = createContext()
function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [loggedUser,setLoggedUser] = useState({name: "David"})
  return (
    <div className="App">
      <loggedInContext.Provider value={[loggedIn,setLoggedIn,loggedUser]}>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/inventory' element={<Inventory/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
      </Routes>
      </loggedInContext.Provider>
  
    </div>
  )
}

export default App
