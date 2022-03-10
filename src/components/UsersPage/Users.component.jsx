import s from "./Users.style.module.css";

import ControlPanel from '../ControlPanel/ControlPanel.component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserService from '../../service/UserService';
import AuthService from "../../authentification/ServiceAuth";
import ElementCard from "../ElementCard/ElementCard.component";


const Users = () => {

// vars
    const panelButtons = [
        "ADD",
        "DELETE",
        "EDIT"
    ];    

 // Handlers
    let navigate = useNavigate();

    const addHandler = (e) => {
        e.preventDefault();
        navigate("/users/user/add");       
    }

    const delHandler = (e) => {
        e.preventDefault();

        let isAuth = AuthService.isAuthenticated();

        if (!isAuth) {
          navigate("/login")
        }

        if (activeElement) {
            UserService
                .deleteProject(activeElement.id)
                .then(response => setData());
        }   

    }

    const editHandler = (user) => {
        if (user) {
            navigate(`/users/user/${user.id}`);    
        }
    }

    const [activeElement, setActiveElement] = useState({}); 

    const onClickHandler = (user) => {
        
        setActiveElement({...user});
        
    };

    const [users, setUsers] = useState([]); 

    const setData = () => {

        UserService
            .getUsers()
            .then((response) => {
                setUsers(response.data);
                console.log(response.data)
            }   
        );
        
    }

    useEffect(() => { 
        setData()
    }, []);

    // Service

    const isActive = (user, activeElement) => {
   
        if (activeElement && activeElement.id == user.id) {
            return true;
        }

        return false;
    }


    return(
        <div className = {s.users_container}>
            <ControlPanel 
                addHandler = {addHandler}
                delHandler = {delHandler} 
                editHandler = {() => editHandler(activeElement)} 
                buttons = {panelButtons}
            />

            { (users !== undefined && users.length) 
                ? users
                    .sort((a,b) => a.id - b.id)
                    .map((user) =>
                        <ElementCard key={user.id} 
                            element={user} 
                            activeHandler = {onClickHandler}
                            isActive = {isActive(user, activeElement)}>
                        </ElementCard>) 
                : null
            } 
        </div>
    )
}

export default Users;