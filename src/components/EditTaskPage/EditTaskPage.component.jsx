import s from "./EditTaskPage.module.css";
import StandartButton from "../Buttons/StandartButton/StandartButton.component";
import TasksService from "../../service/TasksService";
import ProjectService from "../../service/ProjectService";
import UserService from "../../service/UserService";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import AuthService from "../../authentification/ServiceAuth.js";
import SelectItem from "../FormComponents/SelectItem/SelectItem.component";


const EditTaskPage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [isLoaded, toggleIsLoaded] = useState(false);
  let [isLoadedProjects, toggleIsLoadedProjects] = useState(false);
  let isNewObject = true;

  const [taskFormValue, setTaskFormValue] = useState({
    id: "",
    description: "",
    date: "",
    projectId: null,
    performerName: "",
    userName: ""
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  function loadTask() {
    if (id && !isLoaded) {
      TasksService.findTaskById(id).then((response) => {
        let data = response.data;
  
        if (data.id) {
          isNewObject = false;
        }
        setTaskFormValue({
          id: data.id,
          description: data.description,
          date: data.date,
          projectId: data.projectId,
          performerName: data.performerName,
          userName: isNewObject
            ? localStorage.getItem("username")
            : data.userName,
        });

        toggleIsLoaded(true);
      }).finally(() => {

        taskFormValue.userName = isNewObject ? localStorage.getItem("username") : "";}
      );

    }
  }

  function loadProjects() {
    if (id && !isLoadedProjects) {
      ProjectService.getProjects().then((response) => {
        let data = response.data;
        setProjects(data);
        toggleIsLoadedProjects(true);
      });
    }
  }

  function loadUsers() {
    UserService.getUsers().then((response) => {
      let data = response.data;
      setUsers(data);

    });
    
  }

  useEffect(() => {
    
    loadTask();
    loadProjects();
    loadUsers();

  }, []);


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

    if (!taskFormValue.date) {
      taskFormValue.date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
    }
    
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
            className={s.input + " " + s.input_readonly}
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
            className={s.input + " " + s.input_readonly}
            name="date"
            readOnly
            value={taskFormValue.date}
          />
        </div>

        <div className={s.input_block}>
          
          <label for="project">Project:</label>
          
          <SelectItem
            itemName="projectId"
            selectedValue={taskFormValue.projectId}
            handleChange={handleChange}
            optionsArray={projects}
            keyOption="id"
            nameOption="name"
          />

        </div>

        <div className={s.input_block}>
          <label for="performer"> Performer: </label>
          
          <SelectItem
            itemName="performerName"
            selectedValue={taskFormValue.performerName}
            handleChange={handleChange}
            optionsArray={users}
            keyOption="username"
            nameOption="username"
          />

        </div>

        <div className={s.input_block}>
          <label for="author"> Author: </label>
          <input
            type={"text"}
            readOnly
            className={s.input + " " + s.input_readonly}
            name="author"
            id="author"
            value={taskFormValue.userName}
          />
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
