import React from 'react';
import "../../styles/Projects.css"

function Projects(props) {
    const projects = ["Project 1","Project 2","Project 3","Project 4", "Project 5","Project 6", "Project 7", "Project 8"]
    return (
        <div id='projects-page'>
            <div id='projects-grid'>
                {projects.map(p => {
                    return <div className='project'>{p}</div>
                })}
            </div>
        </div>
    );
}

export default Projects;