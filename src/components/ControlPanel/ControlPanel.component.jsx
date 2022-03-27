import s from "./ControlPanel.module.css";
import StandartButton from "../Buttons/StandartButton/StandartButton.component";

const ControlPanel = ( {addHandler, delHandler, editHandler, selectionHandler, buttons} ) => {
    
    return(
        <div className= {s.container}>

            {buttons.find(button => button.startsWith("ADD")) 
                ? <StandartButton buttonValue = "add" handler = {addHandler}/> : null}
            
            {buttons.find(button => button.startsWith("DELETE")) 
                ? <StandartButton buttonValue = "del" handler = {delHandler}/> : null}

            {buttons.find(button => button.startsWith("EDIT")) 
                ? <StandartButton buttonValue = "edit" handler = {editHandler}/> : null} 

            {buttons.find(button => button.startsWith("SELECTION")) 
                ? <StandartButton buttonValue = "sel" handler = {selectionHandler}/> : null}      
            
        </div>
    )

}

export default ControlPanel;