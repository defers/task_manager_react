
import s from "./StandartButton.module.css";

const StandartButton = ( {buttonValue, handler} ) => {

    return(

        <button className={s.btn} onClick={handler} >
            {buttonValue}
        </button>
    )

}

export default StandartButton;