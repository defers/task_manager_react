import s from "./Projects.style.module.css";

import ControlPanel from '../ControlPanel/ControlPanel.component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProjectService from '../../service/ProjectService';
import AuthService from "../../authentification/ServiceAuth";
import Project from "../Project/Project.component";


const Projects = () => {

// vars
    const panelButtons = [
        "ADD",
        "DELETE",
        "EDIT"
    ];    

 // Handlers
    let navigate = useNavigate();

    const addHandler = (e) => {
        e.preventDefault();
        navigate("/projects/project/add");       
    }

    const delHandler = (e) => {
        e.preventDefault();

        let isAuth = AuthService.isAuthenticated();

        if (!isAuth) {
          navigate("/login")
        }

        if (activeElement) {
            ProjectService
                .deleteProject(activeElement.id)
                .then(response => setData());
        }   

    }

    const editHandler = (project) => {
        if (project.id) {
            navigate(`/projects/project/${project.id}`);    
        }
    }

    const [activeElement, setActiveElement] = useState({}); 

    const onClickHandler = (project) => {
        
        setActiveElement({...project});
        
    };

    const [projects, setProjects] = useState([]); 

    const setData = () => {
        
        ProjectService
            .getProjects()
            .then((response) => {
                setProjects(response.data);
                }   
            )
            .catch(error => console.log("ERRRROR: " + error.message));
        
    }

    useEffect(() => { 
        setData()
    }, []);

    // Service

    const isActive = (project, activeElement) => {
   
        if (activeElement && activeElement.id == project.id) {
            return true;
        }

        return false;
    }

    return(
        <div className = {s.projects_container}>
            <ControlPanel 
                addHandler = {addHandler}
                delHandler = {delHandler} 
                editHandler = {() => editHandler(activeElement)} 
                buttons = {panelButtons}
            />

            { (projects !== undefined && projects.length) 
                ? projects
                    .sort((a,b) => a.id - b.id)
                    .map((project) =>
                        <Project key={project.id} 
                            project={project} 
                            activeHandler = {onClickHandler}
                            isActive = {isActive(project, activeElement)}>
                        </Project>) 
                : null
            } 
        </div>
    )
}

export default Projects;