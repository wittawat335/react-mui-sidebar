import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuth } from "@/types/Auth";

export const INITIAL_AUTH = {
  id: "",
  username: "",
  fullname: "",
  email: "",
  roles: [],
  token: "",
};

const INITIAL_STATE = {
  auth: INITIAL_AUTH,
  isLoading: false,
  isAuthenticated: false,
  setAuth: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  auth: IAuth;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<IAuth>(INITIAL_AUTH);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      if (auth != null) {
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/login");
    }

    checkAuthUser();
  }, []);

  const value = {
    auth,
    setAuth,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
