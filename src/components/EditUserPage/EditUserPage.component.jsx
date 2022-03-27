import StandartButton from "../Buttons/StandartButton/StandartButton.component";
import UserService from "../../service/UserService";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../authentification/ServiceAuth.js"
import s from "./EditUserPage.module.css";

const EditUserPage = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    let [isLoaded, toggleIsLoaded] = useState(false);
  
    useEffect(() => {
      if (id && !isLoaded) {
          UserService.findUserById(id).then((response) => {
          let data = response.data;
          setUserFormValue({
            id: data.id,
            username: data.username,
            email: data.email,
            isNewPassword: false
            
          });
          toggleIsLoaded(true);
        });
      }
    }, []);
  
    const [userFormValue, setUserFormValue] = useState({
      id: "",
      username: "",
      email: "",
      isNewPassword: false,
      password: ""
    });
  
    const handleChange = (event) => {
        
        let name = event.target.name;
        let value = (name === "isNewPassword") ? event.target.checked : event.target.value; 

        setUserFormValue({
        ...userFormValue,
        [name]: value
      });
    };
  
    const handleSave = (event) => {
      event.preventDefault();
  
      let isAuth = AuthService.isAuthenticated();
  
      if (!isAuth) {
        navigate("/login")
      }
    
      UserService.saveUser(userFormValue).then((response) => navigate("/users"));
    };

    const isUsernameReadOnly = () => {
        return userFormValue.id ? true : false;    
    }

    const isPasswordReadOnly = () => {
        return isUsernameReadOnly() && !userFormValue.isNewPassword
    }
  
    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={handleSave}>
          <div className={s.input_block}>
            <label for="id"> Id: </label>
            <input
              type={"text"}
              readOnly={true}  
              className={s.input + " " + s.input_readonly}
              name="id"
              id="id"
              value={userFormValue.id}
            />
          </div>
  
          <div className={s.input_block}>
            <label for="username"> Username: </label>
            <input
              type={"text"}
              className={s.input + (isUsernameReadOnly() ? " " + s.input_readonly : "")}
              readOnly={isUsernameReadOnly()}  
              name="username"
              placeholder="username..."
              onChange={handleChange}
              value={userFormValue.username}
            ></input>
          </div>

          <div className={s.input_block}>
            <label for="email"> Email: </label>
            <input
              type={"text"}
              className={s.input}
              name="email"
              placeholder="email..."
              onChange={handleChange}
              value={userFormValue.email}
            ></input>
          </div>

          <div className={s.input_block}>
            <label for="password"> Password: </label>
            <input
              type={"password"}
              className={s.input + (isPasswordReadOnly() ? " " + s.input_readonly : "")}
              readOnly={isPasswordReadOnly()}  
              name="password"
              placeholder="password..."
              onChange={handleChange}
              value={userFormValue.password}
            ></input>
          </div>
  
          <div className={s.input_block}>
            <label for="isNewPassword"> Change password: </label>
            <input
              type={"checkbox"}           
              className={s.checkbox}
              disabled={!isUsernameReadOnly()}  
              name="isNewPassword"
              onChange={handleChange}
            ></input>
          </div>

          <StandartButton
            buttonValue="Save"
            onChange={(e) => e.preventDefault()}
          />
        </form>
      </div>
    );

}

export default EditUserPage;