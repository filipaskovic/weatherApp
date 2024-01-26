import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
const PublicRoutes = () => {
  const { currentUser } = useUserContext();

  return !currentUser ? <Outlet /> : <Navigate to='/' />;
};

export default PublicRoutes;
