import React, { useState,useContext,useRef } from 'react';
import { useParams } from 'react-router';
import { loggedInContext } from '../../App';
import "../../styles/Project.css"
import ItemSearchBar from '../reusables/ItemSearchBar';

function Project(props) {
    let urlParams = useParams()
    const EditButtonRef = useRef(null)
    const [editMode, setEditMode] = useState(false)
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const chosenProject = loggedUser.Projects.filter((p) => {
        if(p.name == urlParams.projectname) {
            return p
        }
    })[0]

    function NameInput() {
        if(editMode) {
            return (
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Project Name:</label>
                    <input type="text" id='projectname-input' value={chosenProject.name}/>
                </div>
            )
        }else {
            return (
                <h1 id='project-name'>{chosenProject.name}</h1>
            )
        }
    }

    function DeadlineInput() {
        if(editMode) {
            return (
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Deadline:</label>
                    <input type="text" id='deadline-input' value={chosenProject.deadline}/>
                </div>
            )
        }else {
            return <p id='project-deadline'>Deadline: {chosenProject.deadline}</p>
        }
    }

    function CostInput() {
        if(editMode) {
            return (
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Cost: </label>
                    <input type="text" id='cost-input' value={chosenProject.estimatedCost}/>
                </div>
            )
        }else {
            return <p id='project-cost'>Cost: {chosenProject.estimatedCost}</p>
        }
    }

    function NotesInput() {
        if(editMode) {
            return <textarea id='notes-input'>{chosenProject.notes}</textarea>
        }else {
            return <p id='project-notes'>{chosenProject.notes}</p>
        }
    }

    function ItemsInput(props) {
        if(editMode) {
            return (
                <div className='item-input'>
                    <label>{props.name}: </label>
                    <input type="number"/>
                    <button type='button'>Remove</button>
                </div>
            )
        }else {
            return <li className='project-item'><span style={{fontWeight:"bold"}}>{props.name}</span> Needed: {props.num}</li>
        }
    }

    function toggleEditButton() {
        if(!editMode) {
            EditButtonRef.current.innerText = "Back"
            setEditMode(true)
        }else {
            EditButtonRef.current.innerText = "Edit"
            setEditMode(false)
        }
    }


    return (
        <div id='project-page'>
            <div id='project-content'>
                <div id='project-info'>
                    <div id='inputs-div'>
                        <NameInput/>
                        <DeadlineInput/>
                        <CostInput/>
                    </div>
                    <div id='project-itemsdiv'>
                        <ItemSearchBar items={loggedUser.Inventory} dropdown={true} buttonDisplay={false}/>
                        <h3>Needed Supplies</h3>
                        <ul>
                            <li><ItemsInput name ="Item 1" num={5}/></li>
                            <li><ItemsInput name ="Item 2" num={10}/></li>
                            <li><ItemsInput name ="Item 3" num={7}/></li>
                        </ul>
                    </div>
                </div>
                <div id='notes-div'>
                    <h2>Notes</h2>
                    <NotesInput/>
                </div>
            </div>
            <div id='project-buttons'>
                <button onClick={toggleEditButton} ref={EditButtonRef}>Edit</button>
                <button>Update</button>
            </div>
        </div>
    );
}

export default Project;