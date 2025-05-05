import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import { AllProducts } from "../../config/data";
import "./Gallery.css";
import { useProducts } from "../../context/ProductContext";

// Extraer categorías únicas de los productos
const CATEGORY_OPTIONS = [...new Set(AllProducts.map(product => product.category))]
  .map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1)
  }));

const SIZE_OPTIONS = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "U", label: "U" },
  { value: "42", label: "42" },
];

const PRICE_RANGE_OPTIONS = [
  { value: "0-5000", label: "$0 - $5.000" },
  { value: "5000-10000", label: "$5.000 - $10.000" },
  { value: "10000-50000", label: "$10.000 - $50.000" },
  { value: "100000+", label: "$100.000+" },
];

const Gallery = () => {
  const { products, filters, updateFilters } = useProducts();

  const handleFilterChange = (field, value) => {
    console.log(value);
    updateFilters({ [field]: value });
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
            options={CATEGORY_OPTIONS}
            placeholder="Prenda"
            name="category"
          />
        </Col>
        <Col md={2}>
          <FilterSelect
            value={filters.size}
            onChange={handleFilterChange}
            options={SIZE_OPTIONS}
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
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
