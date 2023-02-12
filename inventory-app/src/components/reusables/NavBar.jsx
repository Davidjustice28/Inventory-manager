import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loggedInContext } from '../../App';
import logo from "../../assets/logo.png"
import "../../styles/Navbar.css"


function ProjectsTab(props) {
    if(!props.status) {
        return null
    }
    return <li><Link to="/projects">Projects</Link></li>
}

function DashboardTab(props) {
    if(!props.status) {
        return null
    }
    return <li><Link to="/dashboard">Dashboard</Link></li>
}

function InventoryTab(props) {
    if(!props.status) {
        return null
    }
    return <li><Link to="/inventory">Inventory</Link></li>
}

function ProfileTab(props) {
    if(!props.status) {
        return null
    }
    return (
        <li id='profile-tab' onMouseOver={props.showFunc}>{props.name}
            <ul id='dropdown' onMouseOut={props.hideFunc}>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/login" onClick={props.logout}>Log Out</Link></li>
            </ul>
        </li>
    )
}

function JoinTab(props) {
    if(props.status) {
        return null
    }
    return <li><Link to="/signup">Join Now</Link></li>
}

function NavBar(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser] = useContext(loggedInContext)

    function showDropdown() {
        let li = document.getElementById("dropdown")
        li.style.display = "flex"
    }

    function hideDropdown() {
        let li = document.getElementById("dropdown")
        li.style.display = "none"
    }

    //console.log(loggedUser)

    useEffect(() => {
        //console.log("navbar",typeof loggedUser,loggedUser)

    },[loggedUser])

    return (
        <div id="header">
            <Link to="/" id='logo-link'>
                <div id='logo-div'>
                    <img src={logo}/>
                </div>
            </Link>
            <nav>
                <ul id='navbar'>
                    <DashboardTab status={loggedIn}/>
                    <InventoryTab status={loggedIn}/>
                    <ProjectsTab status={loggedIn}/>
                    <ProfileTab status={loggedIn} name={loggedUser.Name} showFunc={showDropdown} hideFunc={hideDropdown} logout={() => {
                        setLoggedIn(false);
                        setLoggedUser({Name:""})
                        localStorage.clear()
                        
                    }}/>
                    <JoinTab status={loggedIn}/>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;