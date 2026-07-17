import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import * as authApi from "../api/auth";

interface User {
  userId: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(
  null
);

export function AuthProvider({children,}: {children: ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 
    async function loadUser() {
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const user = await authApi.me(token);
        if(isMounted){
          setUser(user);
          console.log('User authenticated:', user);
        }
      } catch (e){
        console.error('Auth check failed:', e);
        if(isMounted){
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } finally {
        if(isMounted){
          setLoading(false);
          console.log('Loading set to false');
        }
      }
    }

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [token]);

  async function login(email: string, password: string) {
    const { token } = await authApi.login(email, password);

    localStorage.setItem("token", token);
    setToken(token);

    const user = await authApi.me(token);
    setUser(user);
  }

  async function register(email: string, password: string) {
    await authApi.register(email, password);
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}