import { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

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
    navigate("/profile");
    window.location.href = '/profile';
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
    window.location.href = '/';
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
