import { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";  // Import the new hook

import { PATH_ORG_ADMIN, PATH_TUTOR, PATH_CANDIDATE } from '../constants/routes';
import { AuthResponse, UserRole, User } from '../api/types';
import { getLoggedInUser } from "../utils/authUtils";

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (data: AuthResponse) => Promise<void>;
  logout: () => void;
  saveOrganization: (organizationId: number) => void;
  getOrganization: () => number | null;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useSessionStorage<User | null>('user', null);
  const [organizationId, setOrganizationId] = useSessionStorage<number | null>('organizationId', null);
  const navigate = useNavigate();

  const login = async (data: AuthResponse) => {
    // Save user data and token in session storage
    const { accessToken, ...userData } = data;
    sessionStorage.setItem('accessToken', accessToken);
    setUser(userData);
    //print user data in console User date:{userdata}
    const loggedUser = getLoggedInUser();
    console.log('User data:', loggedUser);

    // Redirect based on user role
    if (userData.role === UserRole.ORGANIZATION) {
      saveOrganization(userData.id);
      navigate(PATH_ORG_ADMIN.dashboard);
    } else if (userData.role === UserRole.CANDIDATE) {
      navigate(PATH_CANDIDATE.dashboard);
    } else if (userData.role === UserRole.EXAMSETTER) {
      navigate(PATH_TUTOR.dashboard);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setOrganizationId(null); // Clear the organization ID on logout
    navigate('/', { replace: true });
  };

  const saveOrganization = (id: number) => {
    setOrganizationId(id);
  };

  const getOrganization = () => {
    return sessionStorage.getItem('organizationId') ? Number(sessionStorage.getItem('organizationId')) : null;
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      saveOrganization,
      getOrganization,
    }),
    [user, organizationId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
