
const SelectItem = ({ itemName, selectedValue, handleChange, 
    optionsArray, keyOption, nameOption}) => {

    const component = (
        <select
        name= {itemName} 
        id= {itemName} 
        value= {selectedValue ? selectedValue : ""} 
        onChange={handleChange}
        >
        <option value="">--Please choose an option--</option>
        { optionsArray 
            ? optionsArray.map((option) => {
                return (
                <option key={option[keyOption]} value={option[keyOption]}>
                    {option[nameOption]}
                </option>
                );
            })
            : null}
        </select>
    );

    return component;
};

export default SelectItem;
