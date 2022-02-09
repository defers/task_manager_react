import s from './Tasks.style.module.css';
import Task from '../Task/Task.component.jsx';

const Tasks = ({ tasks }) => {
    return(
    
    <div className={s.tasksContainer}>
        
        { (tasks != undefined) ?
            tasks
                .sort((a,b) =>  
                    new Date(a.data).getTime() - new Date(b.data).getTime())
                .map((task) =>
                    <Task key={task.id} task={task}></Task>) 
            : null
        } 
        
    </div>);
}

export default Tasks;