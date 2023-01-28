import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loggedInContext } from '../../App';
import "../../styles/LoginPage.css"


function LoginPage(props) {
    const navigate = useNavigate()
    const [loggedIn,setLoggedIn,loggedUser] = useContext(loggedInContext)

    function logIn() {
        setLoggedIn(true)
        navigate("/dashboard")
    }

    return (
        <div id='login-page'>
            <div id='login-mask'></div>
            <h1>Already Have An Account?</h1>
            <form id='login-form'>
                <label>Username</label>
                <input type="text"/>
                <label>Password</label>
                <input type="password"/>
                <button type='button' onClick={logIn}>Login In</button>
            </form>
            <p>Need To Create An Account? Click the "Join" tab at the top of the page.</p>
        </div>
    );
}

export default LoginPage;