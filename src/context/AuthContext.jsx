import { createContext, useState, useContext, useEffect } from "react";
import { productService, ratingService, userService } from "../services";
import { notifyUser } from "../utils/notifyUser";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshAuth, setRefreshAuth] = useState(false);
  const [redirectLink, setRedirectLink] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await userService.getProfile(token);

        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error al obtener perfil de usuario:", error);
      logout(); // Si el token ya no es válido
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      verifyRating();
    }
  }, [isAuthenticated]);

  const verifyRating = async () => {
    try {
      const res = await ratingService.ifRatingSeller();
      if (res.OrderId !== null) {
        toast.info(
          <div
            onClick={() => setRedirectLink(true)}
            style={{ cursor: "pointer" }}
          >
            👉 Tienes una valoración pendiente. Haz clic aquí para calificar.
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        // Solo mostrar 1 toast como pediste
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [refreshAuth]);

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
        setRefreshAuth,
        refreshAuth,
        fetchUserProfile,
        redirectLink,
        setRedirectLink,
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
