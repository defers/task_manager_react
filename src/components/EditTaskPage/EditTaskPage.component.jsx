import s from "./EditTaskPage.module.css";
import StandartButton from "../Buttons/StandartButton/StandartButton.component";
import TasksService from "../../service/TasksService";
import ProjectService from "../../service/ProjectService";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import AuthService from "../../authentification/ServiceAuth.js";

const EditTaskPage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [isLoaded, toggleIsLoaded] = useState(false);
  let [isLoadedProjects, toggleIsLoadedProjects] = useState(false);

  useEffect(() => {
    if (id && !isLoaded) {
      TasksService.findTaskById(id).then((response) => {
        let data = response.data;
        
        setTaskFormValue({
          id: data.id,
          description: data.description,
          date: data.date,
          projectId: data.projectId,
        });
        
        toggleIsLoaded(true);
        });
    };

    if (id && !isLoadedProjects) {
        ProjectService
        .getProjects()
        .then((response) => {
            let data = response.data;
            debugger
            setProjects(data);
            toggleIsLoadedProjects(true);
            console.log("projects: " + data)
        });
    };

  });

  const [taskFormValue, setTaskFormValue] = useState({
    id: "",
    description: "",
    date: "",
    projectId: null
  });

  const [projects, setProjects] = useState([]);

  const handleChange = (event) => {
    
    setTaskFormValue({
      ...taskFormValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    let isAuth = AuthService.isAuthenticated();

    if (!isAuth) {
      navigate("/login");
    }

    taskFormValue.date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

    TasksService.saveTask(taskFormValue).then((response) => navigate("/tasks"));
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSave}>
        <div className={s.input_block}>
          <label for="id"> Id: </label>
          <input
            type={"text"}
            readOnly
            className={s.input}
            name="id"
            id="id"
            value={taskFormValue.id}
          />
        </div>

        <div className={s.input_block}>
          <label for="description"> Description: </label>
          <textarea
            className={s.input}
            rows="5"
            cols="60"
            name="description"
            placeholder="Description..."
            onChange={handleChange}
            value={taskFormValue.description}
          ></textarea>
        </div>

        <div className={s.input_block}>
          <label for="date"> Date: </label>
          <input
            type={"text"}
            className={s.input}
            name="date"
            readOnly
            value={taskFormValue.date}
          />
        </div>

        <div className={s.input_block}>
            <label for="project">Project:</label>

            <select 
              name="projectId" 
              id="projectId" 
              value={taskFormValue.projectId ? taskFormValue.projectId : 0}
              onChange={handleChange}
            >
                <option value="">--Please choose an option--</option>
                { projects 
                    ? projects.map((project) => {
                        console.log("option: " + project) 
                        return(
                            <option 
                                key = {project.id} 
                                value={project.id}                              
                            >
                                {project.name}
                            </option>  
                         )
                    })
                    : null
                   }

            </select>
        </div>

        <StandartButton
          buttonValue="Save"
          onChange={(e) => e.preventDefault()}
        />
      </form>
    </div>
  );
};

export default EditTaskPage;
