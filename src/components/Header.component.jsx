import s from './Header.style.module.css';
import { ReactComponent as PacmanSvg } from '../static/icons/videogame-pacman-game-video-svgrepo-com.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return(
        <header className = {s.header}>
            
            <div className = {s.menu_items}>
                
                <PacmanSvg className = {s.logo_img}/>
                

                    <NavLink to="/home" className = {s.btn}>Home</NavLink>
                    <NavLink to="/home" className = {s.btn}>Tasks</NavLink>
                    <NavLink to="/home" className = {s.btn}>Users</NavLink>
                    <NavLink to="/home" className = {s.btn}>Projects</NavLink>
         

                

            </div>


        </header>
    );
}

export default Header;