import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isauth }) => {
  if (isauth === undefined) {
    return <Navigate to="/" />;
  }

  return isauth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
