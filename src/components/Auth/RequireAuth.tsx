import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "./userQueries";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentUser = useCurrentUser();
  const location = useLocation();

  if (!currentUser.data?.username)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};
