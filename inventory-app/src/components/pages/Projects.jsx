import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { loggedInContext } from '../../App';
import "../../styles/Projects.css"

function Projects(props) {
    const [loggedIn,setLoggedIn,loggedUser,setLoggedUser,users,setUsers] = useContext(loggedInContext)
    const projects = loggedUser.Projects
    return (
        <div id='projects-page'>
            <div id='projects-grid'>
                {projects.map(p => {
                    return <div className='project'><Link to={`/project/${p.name}`}>{p.name}</Link></div>
                })}
            </div>
        </div>
    );
}

export default Projects;