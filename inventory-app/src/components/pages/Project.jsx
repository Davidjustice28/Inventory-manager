import React, { useState,useContext } from 'react';
import { useParams } from 'react-router';
import { loggedInContext } from '../../App';

function Project(props) {
    let urlParams = useParams()
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const chosenProject = loggedUser.Projects.filter((p) => {
        if(p.name == urlParams.projectname) {
            return p
        }
    })[0]
    return (
        <div id='project-page'>
             <h1>{urlParams.projectname}</h1>
             <p>{chosenProject.name}</p>
             <p>Deadline: {chosenProject.deadline}</p>
             <p>Cost: {chosenProject.estimatedCost}</p>
             <p>Notes: {chosenProject.notes}</p>
        </div>
    );
}

export default Project;