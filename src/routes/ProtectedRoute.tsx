import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

import { RootState } from "../redux/store";
import { RoutePath } from "../utils/enums";

const ProtectedRoute = () => {
  const username = useSelector((state: RootState) => state.username);

  if (username === "") {
    return <Navigate to={RoutePath.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
