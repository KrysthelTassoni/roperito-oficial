import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import "./Gallery.css";
import { useProducts } from "../../context/ProductContext";
import {
  CATEGORY_OPTIONS,
  SIZE_OPTIONS,
  PRICE_RANGE_OPTIONS,
} from "../../constants/selectOptions";
import { toast } from "react-toastify";

const Gallery = () => {
  const { products, filters, updateFilters, categories, sizes } = useProducts();

  const handleFilterChange = (field, value) => {
    try {
      updateFilters({ [field]: value });
    } catch (error) {
      console.error("Error al actualizar el filtro:", error);
      toast.error(
        "Error al actualizar el filtro. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Galería de Publicaciones</h1>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <SearchBar
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </Col>
        <Col md={2} className="mb-3 mb-md-0">
          <FilterSelect
            value={filters.category}
            onChange={handleFilterChange}
            options={categories}
            placeholder="Prenda"
            name="category"
          />
        </Col>
        <Col md={2}>
          <FilterSelect
            value={filters.size}
            onChange={handleFilterChange}
            options={sizes}
            placeholder="Talla"
            name="size"
          />
        </Col>
        <Col md={2}>
          <FilterSelect
            value={filters.price}
            onChange={handleFilterChange}
            options={PRICE_RANGE_OPTIONS}
            placeholder="Rango de $"
            name="price"
          />
        </Col>
      </Row>

      {/* Grid de productos */}
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
    </Container>
  );
};

export default Gallery;
