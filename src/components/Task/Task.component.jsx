import s from './Task.style.module.css';

const Task = ({ task, activeTaskHandler, isActive }) => {


    return (
    
    <div className={ s.task + " " + (isActive ? s.active : "") } onClick = {()=>activeTaskHandler(task)}>

        <div className = {s.taskHeader}>
            <p>Id: {task.id}</p>
            <time dateTime={task.date}>
                Date created: {task.date ? task.date.toLocaleString('ru-RU'): null}
            </time>
            <p>Author: {task.user}</p>
            <p>Project: {task.projectName}</p>
        </div>

        <div className = {s.taskDescription}>
            {task.description}
        </div>

    </div>

    
    
    )

}

export default Task;