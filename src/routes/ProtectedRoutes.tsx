import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  roles: string[];  // Array of roles that are authorized to access the route
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user } = useAuth(); //can get logged in user details 
  if (!user || !roles.includes(user.role)) {
    // User is not authenticated or does not have the required role
    // window.location.href = '/auth/signin';
    return <Navigate to="/auth/signin" />;
}
  return <>{children}</>;
};
