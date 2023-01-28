import React from "react";
import { Link } from "react-router-dom";
import soapImg from "../../assets/soap-store.jpg"
import "../../styles/Signup.css"

function Signup(props) {
    return (
        <div id="signup-page">
            <div id="signup-div">
                <img src={soapImg} />
                <form id="signup-form">
                    <label>Name</label>
                    <input type="text"/>
                    <label>Email Address</label>
                    <input type="email"/>
                    <label>Password</label>
                    <input type="password"/>
                    <label>Confirm Password</label>
                    <input type="password" />
                    <button type="button">Create Account</button>
                </form>
            </div>
            <p>Already have an account? Click <Link to="/login" style={{textDecoration:"underline",color: "blue"}}>here</Link>.</p>
        </div>
    );
}

export default Signup

