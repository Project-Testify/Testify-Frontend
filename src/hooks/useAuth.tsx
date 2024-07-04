import { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

import { PATH_ORG_ADMIN, PATH_TUTOR } from '../constants/routes';


interface User {
  id: number;
//   name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();

  const login = async (data: User) => {
    setUser(data);

    console.log(data.role)
    // navigate("/profile");
    if (data.role === "ORGANIZATION") {
        navigate(PATH_ORG_ADMIN.dashboard);
        }
        if (data.role === "ATTENDEE") {
          navigate(PATH_ORG_ADMIN.dashboard);
        }
        if (data.role === "EXAMSETTER") {
          navigate(PATH_TUTOR.dashboard);
        }

    

  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
