import s from './Task.style.module.css';

const Task = ({ task, activeTaskHandler, isActive }) => {


    return (
    
    <div className={ s.task + " " + (isActive ? s.active : "") } onClick = {()=>activeTaskHandler(task)}>

        <div className = {s.taskHeader}>
            <p>Id: {task.id}</p>
            <time dateTime={task.date}>
                Date created: {task.date.toLocaleString('ru-RU')}
            </time>
            <p>Author:</p>
            <p>Project:</p>
            <p>{isActive ? "TRUE" : "FALSE"}</p>
        </div>

        <div className = {s.taskDescription}>
            {task.description}
        </div>

    </div>

    
    
    )

}

export default Task;