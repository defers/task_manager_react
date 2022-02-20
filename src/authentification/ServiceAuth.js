
export const isAuthenticated = () => {
    
    localStorage.setItem("isAuth", "true");
    
    let isAuth = localStorage.getItem("isAuth");

    return isAuth == "true";

}

