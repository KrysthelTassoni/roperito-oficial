import { createContext, useState, useContext, useEffect } from "react";
import { productService, userService } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await userService.getProfile(token);

        // Comprobar la estructura de los datos
        if (userData.user) {
          if (userData.user.address) {
            console.log("[AuthContext] Objeto address:", userData.user.address);
          } else {
            console.log("[AuthContext] El usuario no tiene objeto address");
          }
        }

        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error al obtener perfil de usuario:", error);
      logout(); // Si el token ya no es válido
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [refresh]);

  const login = (userData, token) => {
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
        fetchUserProfile,
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
