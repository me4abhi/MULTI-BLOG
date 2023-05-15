import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let isAuthenticated = localStorage.getItem("isLoggedIn");
  return isAuthenticated ? <Navigate to="/posts" /> : <Outlet />;
};

export default PrivateRoutes;
