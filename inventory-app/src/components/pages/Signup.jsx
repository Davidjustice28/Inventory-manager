import React, { useRef,useContext, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import soapImg from "../../assets/soap-store.jpg"
import "../../styles/Signup.css"
import { signupUser,getusers } from "../../utilities/database-functions";
import { loggedInContext } from "../../App";

function Signup(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const sNameRef = useRef(null)
    const sPasswordRef = useRef(null)
    const sUsernameRef = useRef(null)
    const sEmailRef = useRef(null)
    const sConfirmPasswordRef = useRef(null)
    const navigate = useNavigate()

    //console.log(users instanceof Array)
    //console.log(users, "signup page")
    
    async function signup(props) {
        let newUser;
        let usernameFound = users.some((u) => {
            return u.Username == sUsernameRef.current.value
        })
        if((sPasswordRef.current.value == sConfirmPasswordRef.current.value) && !usernameFound) {
            let responseId = await signupUser(sPasswordRef.current.value,sUsernameRef.current.value,sNameRef.current.value)
            //console.log(responseId)
            setUsers(await getusers())
            setLoggedIn(true)
        }
        
    }

    useEffect(() => {
        console.log("new users", users)
        if(loggedIn) {
            setLoggedUser(users[users.length -1])
            navigate("/dashboard")
        }
    },[users])

    return (
        <div id="signup-page">
            <div id="signup-div">
                <img src={soapImg}/>
                <form id="signup-form">
                    <label>Name</label>
                    <input type="text" ref={sNameRef}/>
                    <label>Username</label>
                    <input type="text" ref={sUsernameRef}/>
                    <label>Email Address</label>
                    <input type="email" ref={sEmailRef}/>
                    <label>Password</label>
                    <input type="password" ref={sPasswordRef}/>
                    <label>Confirm Password</label>
                    <input type="password" ref={sConfirmPasswordRef} />
                    <button type="button" onClick={signup}>Create Account</button>
                </form>
            </div>
            <p>Already have an account? Click <Link to="/login" style={{textDecoration:"underline",color: "blue"}}>here</Link>.</p>
        </div>
    );
}

export default Signup

