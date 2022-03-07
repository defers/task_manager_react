import s from "./LoginPage.module.css";
import StandartButton from "../Buttons/StandartButton/StandartButton.component";
import ServiceAuth from "../../authentification/ServiceAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");

    let navigate = useNavigate();

    useEffect(()=>{ 

      let isAuth = ServiceAuth.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }

      });

    const handleLogin = (e) => {
        e.preventDefault();
        ServiceAuth.login(userName, password);
        navigate("/");
    }

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


  return (
    <div className={s.loginpage_container}>
      <form className={s.form_login} onSubmit = {handleLogin}>
        <div className= {s.input_block}>
            <label for="login"> Login: </label>
            <input
            type={"text"}
            className={s.input}
            name="login"
            id="login"
            placeholder="Enter your login"
            onChange={handleChangeUserName}
            />
        </div>

        <div className= {s.input_block}>
            <label for="password"> Password: </label>
            <input
            type={"password"}
            className={s.input}
            name="password"
            placeholder="Enter your password"
            onChange={handleChangePassword}
            />
        </div>

        <StandartButton buttonValue="Login" onChange={(e)=>e.preventDefault()}/>

      </form>
    </div>
  );
};

export default LoginPage;
