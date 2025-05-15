import { Container, Row, Col } from "react-bootstrap";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";
import { useProducts } from "../../context/ProductContext";
import { toast } from "react-toastify";

const Home = () => {
  const { products, loading, error, filters, updateFilters, isSearching } =
    useProducts();

  const handleSearchChange = (e) => {
    try {
      updateFilters({ search: e.target.value });
    } catch (error) {
      console.error("Error al actualizar el filtro de búsqueda:", error);
      toast.error(
        "Ocurrió un error al actualizar el filtro de búsqueda. Por favor, inténtalo de nuevo."
      );
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <div className="home">
      <HeroSection />

      <Container className="py-5">
        <h2 className="text-center mb-4">
          {isSearching
            ? "Resultados de la búsqueda"
            : "Publicaciones recientes"}
        </h2>

        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <SearchBar value={filters.search} onChange={handleSearchChange} />
          </Col>
        </Row>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <p className="lead text-muted">
              {isSearching
                ? "No se encontraron productos que coincidan con tu búsqueda"
                : "No hay publicaciones disponibles"}
            </p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(
              (product) =>
                product.status !== "vendido" && (
                  <Col key={product.id}>
                    <ProductCard product={product} isGallery />
                  </Col>
                )
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
