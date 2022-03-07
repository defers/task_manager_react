import s from './Project.style.module.css';

const Project = ({ project, activeHandler, isActive }) => {


    return (
    
    <div className={ s.project + " " + (isActive ? s.active : "") } onClick = {()=>activeHandler(project)}>

        <div className = {s.projectHeader}>
            <p>Id: {project.id}</p>
            <p>Project name: {project.name}</p>
            <p>{isActive ? "TRUE" : "FALSE"}</p>
        </div>

    </div>
  
    )

}

export default Project;