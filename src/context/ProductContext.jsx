import { createContext, useState, useContext, useEffect } from "react";
import { AllProducts, userProfile } from "../config/data";
import { useAuth } from "./AuthContext";

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
  const { user } = useAuth();
  const [products] = useState(AllProducts);
  const [searchResults, setSearchResults] = useState(null);
  const [favorites, setFavorites] = useState(user?.favorites || userProfile[0].favorites || []);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    price: "",
    search: "",
    is_active: true
  });

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
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesSize = !filters.size || product.size === filters.size;
      const matchesPrice = !filters.price || isInPriceRange(product.price, filters.price);
      const matchesSearch = !filters.search || 
        product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesActive = product.is_active !== false; // Solo filtrar si es explícitamente false

      return matchesCategory && matchesSize && matchesPrice && matchesSearch && matchesActive;
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

  const addToFavorites = (product) => {
    setFavorites((prev) => [...prev, product]);
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Exportar ambos como objetos nombrados
export { ProductProvider, useProducts };
