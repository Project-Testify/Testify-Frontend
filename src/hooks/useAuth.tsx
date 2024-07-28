import { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

import { PATH_ORG_ADMIN, PATH_TUTOR, PATH_CANDIDATE } from '../constants/routes';
import { AuthResponse, UserRole, User } from '../api/types';
// import { getLoggedInUser } from "../utils/authUtils";


// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (data: AuthResponse) => Promise<void>;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const navigate = useNavigate();

  const login = async (data: AuthResponse) => {
    // Save user data and token in local storage
    const { accessToken, ...userData } = data;
    localStorage.setItem('accessToken', accessToken);
    setUser(userData);
    //print user data in console User date:{userdata}
    const loggedUser = getLoggedInUser();
    console.log('User data:', loggedUser);

    // Redirect based on user role
    if (userData.role === UserRole.ORGANIZATION) {
      navigate(PATH_ORG_ADMIN.dashboard);
    } else if (userData.role === UserRole.CANDIDATE) {
      navigate(PATH_CANDIDATE.dashboard);
    } else if (userData.role === UserRole.EXAMSETTER) {
      navigate(PATH_TUTOR.dashboard);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken'); // Remove token from local storage
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
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
