import { Route, Navigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "./contexts";

export const PrivateRoute = ({ path, ...props }) => {
  const { user } = useAuth();
  const route = useLocation().pathname;

  return user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: route }} replace to="/login" />
  );
};
