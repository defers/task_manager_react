import s from './Task.style.module.css';

const Task = ({ task }) => {
    
    return (
    
    <div className={s.task}>

        <div className = {s.taskHeader}>
            <time dateTime={task.data}>
                Date created: {task.data.toLocaleDateString()}
            </time>
            <p>Author:</p>
            <p>Project:</p>
        </div>

        <div className = {s.taskDescription}>
            {task.description}
        </div>

    </div>
    
    )

}

export default Task;