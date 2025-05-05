import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  Carousel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import { useProducts } from "../../context/ProductContext";
import FavoriteButton from "../../components/CustomButton/FavoriteButton/FavoriteButton";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [showContactModal, setShowContactModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id, products]);

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Container className="product-detail-container">
      <Link to="/" className="back-link">
        ← Volver a Inicio
      </Link>

      <Row className="mt-4">
        <Col md={6} className="mb-4">
          {product.images && product.images.length > 1 && (
            <>
              <Carousel
                variant="dark"
                interval={null}
                activeIndex={activeIndex}
                onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
              >
                {product.images.map((imgUrl, index) => (
                  <Carousel.Item key={index}>
                    <div className="carousel-container">
                      <img
                        className="carousel-image"
                        src={imgUrl}
                        alt={`Imagen ${index + 1}`}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="thumbnail-container">
                {product.images.map((thumbUrl, index) => (
                  <img
                    key={index}
                    src={thumbUrl}
                    alt={`Miniatura ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`thumbnail-image ${activeIndex === index ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </Col>

        <Col md={6}>
          <div className="product-header">
            <div>
              <h1 className="mb-3">{product.name || product.title}</h1>
              <div className="status-container">
                <BsCircleFill className={`status-icon ${product.status.toLowerCase() === 'disponible' ? 'available' : 'sold'}`} />
                <span className="status-text">
                  {product.status.toLowerCase() === 'disponible' ? 'Disponible' : 'Vendido'}
                </span>
              </div>
            </div>
            <FavoriteButton product={product} />
          </div>

          <h2 className="product-price">${product.price}</h2>

          <div className="product-badges">
            <Badge bg="light" text="dark" className="product-badge">
              Talla: {product.size}
            </Badge>
            <Badge bg="light" text="dark">
              {product.category}
            </Badge>
          </div>

          <div className="product-section">
            <h5>Descripción</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-section">
            <h5>Vendedor</h5>
            <p className="mb-2">{product.seller.name}</p>
            <div className="seller-rating">
              <FaStar className="star-icon" />
              <span>
                {product.seller.rating} ({product.seller.totalRatings})
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="contact-button"
            onClick={() => setShowContactModal(true)}
          >
            Contactar al Vendedor
          </Button>
        </Col>
      </Row>

      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Información de Contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Teléfono:</strong> {product.seller.phone}
          </p>
          <p>
            <strong>Email:</strong> {product.seller.email}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowContactModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetail; 