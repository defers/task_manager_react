import s from "./SidePanel.module.css";
import { useState, useEffect } from "react";

const SidePanel = ({ isOpened, togglerOpenSelection }) => {
    
    const checkHandler = () => {

        togglerOpenSelection(!isOpened)
    }

    return(
        <div className={s.container}>
        <input type="checkbox" id={s.side_checkbox} checked={isOpened}/>
        <div className={s.side_panel}>
            <label className={s.side_button_2} for={s.side_checkbox} onClick={checkHandler}>+</label>   
            <div className={s.side_title}>Selections:</div>
            <select>
                <option>test1</option>    
                <option>test2</option>    
            </select>
            <p>Данные</p>
            <p>Данные</p>
            <p>Данные</p>
        </div>
        </div>

    );
}

export default SidePanel;