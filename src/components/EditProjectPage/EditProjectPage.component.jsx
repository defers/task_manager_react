import s from "./EditProjectPage.module.css";
import StandartButton from "../Buttons/StandartButton/StandartButton.component";
import ProjectService from "../../service/ProjectService";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../authentification/ServiceAuth.js"

const EditProjectPage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [isLoaded, toggleIsLoaded] = useState(false);

  useEffect(() => {
    if (id && !isLoaded) {
        ProjectService.findProjectById(id).then((response) => {
        let data = response.data;
        setProjectFormValue({
          id: data.id,
          name: data.name
        });
        toggleIsLoaded(true);
      });
    }
  });

  const [projectFormValue, setProjectFormValue] = useState({
    id: "",
    name: "",
  });

  const handleChange = (event) => {

    setProjectFormValue({
      ...projectFormValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    let isAuth = AuthService.isAuthenticated();

    if (!isAuth) {
      navigate("/login")
    }

    ProjectService.saveProject(projectFormValue).then((response) => navigate("/projects"));
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
            value={projectFormValue.id}
          />
        </div>

        <div className={s.input_block}>
          <label for="name"> Name: </label>
          <input
            type={"text"}
            className={s.input}
            name="name"
            placeholder="name..."
            onChange={handleChange}
            value={projectFormValue.name}
          ></input>
        </div>

        <StandartButton
          buttonValue="Save"
          onChange={(e) => e.preventDefault()}
        />
      </form>
    </div>
  );
};

export default EditProjectPage;
