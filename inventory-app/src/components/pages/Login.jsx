import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loggedInContext } from '../../App';
import "../../styles/LoginPage.css"
import { loginUser } from '../../utilities/database-functions';


function LoginPage(props) {
    const navigate = useNavigate()
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users] = useContext(loggedInContext)
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)
    const smallRef = useRef(null)

    async function logIn() {
        /*
        let responseUser = await loginUser(passwordRef.current.value,usernameRef.current.value)
        //console.log(responseUser)
        if(responseUser.validated) {
            setLoggedUser(responseUser.user)
        */
       let user = users.filter((u) => {
            return (u.Password == passwordRef.current.value) && (u.Username == usernameRef.current.value)
       })[0]
        if(user) {
            setLoggedUser(user)
            setLoggedIn(true)
            navigate("/dashboard")
            smallRef.current.style.display = "none"
        } else {
            passwordRef.current.style.border = "2px solid red"
            usernameRef.current.style.border = "2px solid red"
            smallRef.current.style.display = "block"

        }
    }

    return (
        <div id='login-page'>
            <div id='login-grid'>
                <div id='login-mask'></div>
                <h1>Already Have An Account?</h1>
                <form id='login-form'>
                    <label>Username</label>
                    <input type="text" id='login-username'ref={usernameRef}/>
                    <label>Password</label>
                    <input type="password" id='login-password' ref={passwordRef}/>
                    <small style={{color:"red",display: "none"}} ref={smallRef}>Username or password was incorrect. Please try again</small>
                    <button type='button' onClick={logIn}>Login In</button>
                </form>
                <p>Need To Create An Account? Click the "Join" tab at the top of the page.</p>
            </div>
        </div>
    );
}

export default LoginPage;