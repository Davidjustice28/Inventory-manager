import React,{useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { loggedInContext } from '../../App';
import "../../styles/Projects.css"

function Projects(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    let projects = loggedUser.Projects


    return (
        <div id='projects-page'>
            <div id='projects-grid'>
                {projects.map(p => {
                    return <div className='project'><Link to={`/project/${p.name}`}>{p.name}</Link></div>
                })}
            </div>
            <Link to="/newproject">Create Project</Link>
        </div>
    );
}

export default Projects;