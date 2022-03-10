import s from "./Header.style.module.css";
import { ReactComponent as PacmanSvg } from "../../static/icons/videogame-pacman-game-video-svgrepo-com.svg";
import { NavLink } from "react-router-dom";
import AuthService from "../../authentification/ServiceAuth.js";
import { useState, useEffect } from "react";

const Header = () => {
  
  useEffect(() => { 
    let isAuth = AuthService.isAuthenticated();
    toggleIsAuth(isAuth);
  }, []);

  const [isAuth, toggleIsAuth] = useState(false);

  const logoutHandler = (e) => {
    AuthService.logout();
  }
  
  return (
    <header className={s.header}>
      
      <PacmanSvg className={s.logo_img}></PacmanSvg>  

      <div className={s.menu}>
        
        <input id={s.menu_toggle} type="checkbox" />
        <label class={s.menu_button_container} for={s.menu_toggle}>
          <div class={s.menu_button}></div>
        </label>

        <ul className={s.list_menu}>
          <li className={s.menu_element}>
            <NavLink to="/" className={s.btn}>Home</NavLink>
          </li>
          <li className={s.menu_element}>
            <NavLink to="/tasks" className={s.btn}>Tasks</NavLink>
          </li>
          
          <li className={s.menu_element}>
            <NavLink to="/users" className = {s.btn}>Users</NavLink>
          </li>
          <li className={s.menu_element}>
            <NavLink to="/projects" className = {s.btn}>Projects</NavLink>
          </li>

          <li className={s.menu_element}>
            {isAuth ? <NavLink to="/login" className = {s.btn} onClick = {logoutHandler}>Logout</NavLink> : null}
          </li>

        </ul>
      </div>


    </header>
  );
};

export default Header;
