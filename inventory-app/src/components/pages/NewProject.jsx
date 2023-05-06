import React, { useEffect, useState, useContext, useRef } from "react";
import { loggedInContext } from "../../App";
import "../../styles/NewProject.css"
import { createProject } from "../../utilities/database-functions";

function NewProjectPage(props) {
    const [loggedIn, setLoggedIn, loggedUser, setLoggedUser, users, setUsers] = useContext(loggedInContext)
    const TitleRef = useRef(null)
    const DeadLineRef = useRef(null)
    const CostRef = useRef(null)
    const NotesRef = useRef(null)

    function addProject() {
        createProject(TitleRef.current.value,loggedUser._id,DeadLineRef.current.value,NotesRef.current.value,CostRef.current.value)
    }
    return (
        <div id="newproject-page">
            <form id="newproject-form">
                <label>Title</label>
                <input type="text" ref={TitleRef}></input>
                <label>Deadline</label>
                <input type="date" ref={DeadLineRef}></input>
                <label>Estimated Cost</label>
                <input type="number" ref={CostRef}></input>
                <label>Notes</label>
                <input type="text" ref={NotesRef}></input>
                <button type="button" onClick={addProject}>Create</button>
            </form>
        </div>
    )
}

export default NewProjectPage