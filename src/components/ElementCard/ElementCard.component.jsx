import s from './ElementCard.module.css';

const ElementCard = ({ element, activeHandler, isActive }) => {

    return (
    
    <div className={ s.element + " " + (isActive ? s.active : "") } onClick = {()=>activeHandler(element)}>

        <div className = {s.elementHeader}>
            
            {element 
            ? Object.entries(element).map(([key, value]) => {

                return(
                    <p key={key}>{key}: {value}</p>              
                )          
            })
            : null
            }

        </div>

    </div>
  
    )

}

export default ElementCard;