class Utils {

    findInArrayOfObjectsById = (arrayOfObjects, id) => {
    
        if (!arrayOfObjects || !id) {
            return null;
        }
    
        let result = null;
        for (let element in arrayOfObjects) {
            if (element.id == id) {
                result = element;
                break;
            }
        }
    
        return result;
    }

}

export default new Utils();
