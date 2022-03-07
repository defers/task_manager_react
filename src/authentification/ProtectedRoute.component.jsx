import { Navigate } from "react-router-dom";
import AuthService from "./ServiceAuth";

const PrivateRoute = ({ children }) => {

  let isAuth = AuthService.isAuthenticated();

  if (isAuth === undefined) {
    return <Navigate to="/login" />;
  }

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
