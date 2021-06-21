import { Route, Navigate, useParams } from "react-router-dom";
import { useAuth } from "./contexts";

export const PrivateRoute = ({ path, ...props }) => {
  const { user } = useAuth();
  const { playlistId } = useParams();
  console.log({ path });
  console.log({ props });
  console.log({ playlistId });
  const actualPath = playlistId ? `playlist/${playlistId}` : path;
  return user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: actualPath }} replace to="/login" />
  );
};
