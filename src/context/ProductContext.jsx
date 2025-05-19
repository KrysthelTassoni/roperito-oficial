import { createContext, useState, useContext, useEffect } from "react";
import { AllProducts, userProfile } from "../config/data";
import { useAuth } from "./AuthContext";
import { favoriteService, metadataService, productService } from "../services";
import { toast } from "react-toastify";
import socket from "../utils/socket";

const ProductContext = createContext();

// Definir el hook como una función nombrada
function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

// Exportar el Provider como una función nombrada
function ProductProvider({ children }) {
  const { user, refreshAuth, setRefreshAuth } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [favorites, setFavorites] = useState(
    user?.favorites || userProfile[0].favorites || []
  );
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    price: "",
    search: "",
    is_active: true,
  });
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const [inProfile, setInProfile] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await productService.getAll();
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };

    getAllProducts();
  }, [refresh]);

  // socket io
  useEffect(() => {
    socket.on("producto_creado", (data) => {
      setProducts((prev) => [data, ...prev]);
      toast.success("Nuevo producto disponible!");
    });

    //obtener mensaje del comprador
    socket.on("nuevo_mensaje_comprador", (data) => {
      toast.success("Nuevo mensaje de un comprador!");
      setNotifications((prev) => [data, ...prev]);
      setNewNotification(true);
      setInProfile(true);
    });

    //obtener respuesta del vendedor
    socket.on("respuesta_vendedor", (data) => {
      toast.success("Nuevo mensaje de vendedor!");
      setNotifications((prev) => [data, ...prev]);
      setNewNotification(true);
      setInProfile(true);
    });

    socket.on("cambio_status", (data) => {
      if (data.status === "vendido") {
        setProducts((prev) => prev.filter((n) => n.id !== data.id));
      } else {
        setProducts((prev) => [data, ...prev]);
      }
    });
    // Cleanup
    return () => {
      socket.off("producto_creado");
      socket.off("nuevo_mensaje_comprador");
      socket.off("respuesta_vendedor");
      socket.off("cambio_status");
    };
  }, []);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const { categories } = await metadataService.getCategories();
        const { sizes } = await metadataService.getSizes();
        setCategories(categories);
        setsizes(sizes);
      } catch (error) {
        console.error(error);
      }
    };

    getMetadata();
  }, []);

  // Actualizar favoritos cuando cambia el usuario
  useEffect(() => {
    setFavorites(user?.favorites || userProfile[0].favorites || []);
  }, [user]);

  // Función para verificar si un producto está en el rango de precio seleccionado
  const isInPriceRange = (price, range) => {
    if (!range) return true;
    const [min, max] = range.split("-").map(Number);
    if (range === "100000+") return price >= 100000;
    return price >= min && price <= (max || Infinity);
  };

  // Función para filtrar productos
  const filterProducts = (productsToFilter) => {
    return productsToFilter.filter((product) => {
      const matchesCategory =
        !filters.category || product.category_id === filters.category;
      const matchesSize = !filters.size || product.size_id === filters.size;
      const matchesPrice =
        !filters.price || isInPriceRange(product.price, filters.price);
      const matchesSearch =
        !filters.search ||
        product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      const matchesActive = product.is_active !== false; // Solo filtrar si es explícitamente false

      return (
        matchesCategory &&
        matchesSize &&
        matchesPrice &&
        matchesSearch &&
        matchesActive
      );
    });
  };

  // Efecto para manejar la búsqueda y filtros
  useEffect(() => {
    const filterTimer = setTimeout(() => {
      setLoading(true);
      const filteredResults = filterProducts(products);
      setSearchResults(filteredResults);
      setLoading(false);
    }, 300);

    return () => clearTimeout(filterTimer);
  }, [filters, products]);

  const addToFavorites = async (product) => {
    try {
      const response = await favoriteService.add(product.id);
      setFavorites((prev) => [...prev, product]);
      setRefreshAuth(!refreshAuth);
      toast.success("Producto añadido a favorito!");
    } catch (error) {
      console.error("error al agregar a favoritos", error);
      toast.error(error.response.data.error);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await favoriteService.remove(productId);
      setFavorites((prev) => prev.filter((p) => p.id !== productId));
      setRefreshAuth(!refreshAuth);
      toast.success("Producto eliminado de favorito!");
    } catch (error) {
      console.error("error al remover de favoritos", error);
      toast.error(error.response.data.error);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Obtener los productos a mostrar (filtrados o productos de ejemplo)
  const displayProducts = searchResults || products;

  return (
    <ProductContext.Provider
      value={{
        products: displayProducts,
        loading,
        favorites,
        addToFavorites,
        removeFromFavorites,
        filters,
        updateFilters,
        isSearching: !!searchResults,
        refresh,
        setRefresh,
        categories,
        sizes,
        notifications,
        setNotifications,
        newNotification,
        setNewNotification,
        inProfile,
        setInProfile,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Exportar ambos como objetos nombrados
export { ProductProvider, useProducts };
