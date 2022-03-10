

export const convertArrayOfNumberToDate = (numberArray) => {
    
    if (numberArray == null) {
        return numberArray;
    }

    numberArray[1] = numberArray[1] - 1;
    let date = new Date(...numberArray);

    return date;
}

