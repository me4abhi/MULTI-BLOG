import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let isAuthenticated = localStorage.getItem("isLoggedIn");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
