import { createContext, useState, useContext, useEffect } from "react";
import { productService, userService } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await userService.getProfile(token);
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error cargando perfil:", error);
          logout(); // opcional: si el token ya no es válido
        }
      }
    };

    initializeAuth();
  }, [refresh]);

  const login = (userData, token) => {
    // console.log("que recibe data: ", userData);
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        setUser,
        setRefresh,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
