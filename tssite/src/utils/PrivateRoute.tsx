import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login", children }: any) => {
  let { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
