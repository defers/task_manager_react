import s from './Tasks.style.module.css';
import Task from '../Task/Task.component.jsx';
import ControlPanel from '../ControlPanel/ControlPanel.component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TasksService from '../../service/TasksService';
import AuthService from "../../authentification/ServiceAuth";

const Tasks = () => {
    
 // vars
    const panelButtons = [
        "ADD",
        "DELETE",
        "EDIT"
    ];    

 // Handlers
    let navigate = useNavigate();

    const addTaskHandler = (e) => {
        e.preventDefault();
        navigate("/tasks/task/add");       
    }

    const delTaskHandler = (e) => {
        e.preventDefault();

        let isAuth = AuthService.isAuthenticated();

        if (!isAuth) {
          navigate("/login")
        }

        if (activeTask) {
            TasksService
                .deleteTask(activeTask.id)
                .then((response => setTasksData()));
        }   

    }

    const editTaskHandler = (task) => {
        if (task) {
            navigate(`/tasks/task/${task.id}`);    
        }
    }

    const [activeTask, setActiveTask] = useState({}); 

    const onClickHandle = (task) => {
        
        setActiveTask({...task});
        
    };

    const [tasks, setTasks] = useState([]); 

    const setTasksData = () => {
        
        const data = TasksService.getTasks().then((response) => {
            setTasks(response.data);
        }   
        );
        
    }

    useEffect(() => { 
        setTasksData()
    }, []);

    // Service

    const isActive = (task, activeTask) => {
   
        if (activeTask && activeTask.id == task.id) {
            return true;
        }

        return false;
    }

    return(
    
    <div className={s.tasksContainer}>
    
        <ControlPanel 
            addHandler = {addTaskHandler}
            delHandler = {delTaskHandler} 
            editHandler = {()=>editTaskHandler(activeTask)} 
            buttons = {panelButtons}
        />

        { (tasks !== undefined && tasks.length) 
            ? tasks
                .sort((a,b) =>  
                    {
                        if (a.date == null || b.date ==null) {
                            return 1;
                        }

                        return (
                        a.date.getTime() - b.date.getTime())
                    })
                .map((task) =>
                    <Task key={task.id} 
                          task={task} 
                          activeTaskHandler = {onClickHandle}
                          isActive = {isActive(task, activeTask)}>
                    </Task>) 
            : null
        } 
        
    </div>);
}

export default Tasks;