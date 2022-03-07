
const authHeader = () => {

    const user = JSON.parse(localStorage.getItem("jwttoken"));
    if (user && user.jwttoken) {
        return {"Authorization" : "Bearer " + user.jwttoken}
    }
    else return {};
}

export default authHeader;