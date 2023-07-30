import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login", children }: any) => {
  let { decodedAuthToken } = useContext(AuthContext);
  if (!decodedAuthToken) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
