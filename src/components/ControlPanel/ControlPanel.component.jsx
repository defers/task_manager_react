import s from "./ControlPanel.module.css";
import StandartButton from "../Buttons/StandartButton/StandartButton.component";

const ControlPanel = ( {addHandler, delHandler, editHandler, buttons} ) => {
    
    return(
        <div className= {s.container}>

            {buttons.find(button => button.startsWith("ADD")) 
                ? <StandartButton buttonValue = "add" handler = {addHandler}/> : null}
            
            {buttons.find(button => button.startsWith("DELETE")) 
                ? <StandartButton buttonValue = "del" handler = {delHandler}/> : null}

            {buttons.find(button => button.startsWith("EDIT")) 
                ? <StandartButton buttonValue = "edit" handler = {editHandler}/> : null}      
            
        </div>
    )

}

export default ControlPanel;