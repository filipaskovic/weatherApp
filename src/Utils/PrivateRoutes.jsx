import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

const PrivateRoutes = () => {
  const { currentUser } = useUserContext();
  return currentUser ? <Outlet /> : <Navigate to='/signup' />;
};

export default PrivateRoutes;
