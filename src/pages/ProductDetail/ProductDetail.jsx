import { Container, Row, Col, Badge, Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import { useProducts } from "../../context/ProductContext";
import FavoriteButton from "../../components/CustomButton/FavoriteButton/FavoriteButton";
import "./ProductDetail.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import { toast } from "react-toastify";
import { orderService, ratingService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { closedQuestions } from "../../constants/answers";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { user } = useAuth();
  const [showContactModal, setShowContactModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [ifSentMessage, setIfSentMessage] = useState(false);
  const [ratingInfo, setRatingInfo] = useState();

  useEffect(() => {
    try {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        verifyMessageSent(foundProduct.id);
        getRating(foundProduct.seller.id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar el producto:", error);
      toast.error("Error al cargar el producto. Inténtalo de nuevo más tarde.");
    }
  }, [id, products]);

  const getRating = async (user_id) => {
    try {
      const response = await ratingService.getRatings(user_id);

      setRatingInfo(response);
    } catch (error) {
      console.error("Error al obtener el rating del vendedor", error);
    }
  };

  const verifyMessageSent = async (product_id) => {
    try {
      const response = await orderService.ifsentMessage(product_id);
      setIfSentMessage(response.exists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitMessage = async () => {
    try {
      const response = await orderService.sendMessage(
        product.id,
        selectedMessage
      );
      toast.success(response.message);
      setShowContactModal(false);
    } catch (error) {
      console.error("error al enviar el mensaje", error);
      toast.error("Error al enviar el mensaje");
    }
  };

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
          {product.images.length > 1 ? (
            <>
              <Carousel
                variant="dark"
                interval={null}
                activeIndex={activeIndex}
                onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
              >
                {[...product.images]
                  .sort((a, b) => a.order - b.order)
                  .map((img, index) => (
                    <Carousel.Item key={img.id}>
                      <div className="carousel-container">
                        <img
                          className="carousel-image"
                          src={img.image_url}
                          alt={`Imagen ${index + 1}`}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel>

              <div className="thumbnail-container">
                {[...product.images]
                  .sort((a, b) => a.order - b.order)
                  .map((img, index) => (
                    <img
                      key={img.id} // mejor usar id único en key
                      src={img.image_url}
                      alt={`Miniatura ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={`thumbnail-image ${
                        activeIndex === index ? "active" : ""
                      }`}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="single-image-container">
              <img
                className="carousel-image"
                src={product.images[0].image_url}
                alt="Imagen única del producto"
              />
            </div>
          )}
        </Col>

        <Col md={6}>
          <div className="product-header">
            <div>
              <h1 className="mb-3">{product.title}</h1>
              <div className="status-container">
                <BsCircleFill
                  className={`status-icon ${
                    product.status.toLowerCase() === "disponible"
                      ? "available"
                      : "sold"
                  }`}
                />
                <span className="status-text">
                  {product.status.toLowerCase() === "disponible"
                    ? "Disponible"
                    : "Vendido"}
                </span>
              </div>
            </div>
            <FavoriteButton product={product} isProductDetail />
          </div>

          <h2 className="product-price">${product.price}</h2>

          <div className="product-badges">
            <Badge bg="light" text="dark" className="product-badge">
              Talla: {product.size_name}
            </Badge>
            <Badge bg="light" text="dark">
              {product.category_name}
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
              {ratingInfo && (
                <span>
                  {ratingInfo.averageRating} ({ratingInfo.totalRatings})
                </span>
              )}
            </div>
          </div>
          {!user.products.some((p) => p.id === product.id) && (
            <CustomButton
              title={"Contactar al Vendedor"}
              variant="primary"
              style="contact-button"
              onClick={() => setShowContactModal(true)}
            />
          )}
        </Col>
      </Row>

      <CustomModal
        showModal={showContactModal}
        closeModal={() => setShowContactModal(false)}
        textHeader={"Información de Contacto"}
        textButtonCancel="Cerrar"
        variant="danger"
        textButtonConfirm={!ifSentMessage && "Enviar"}
        confirm={!ifSentMessage && handleSubmitMessage}
      >
        <p>
          <strong>Teléfono:</strong> {product.seller?.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {product.seller?.email}
        </p>
        {!ifSentMessage && (
          <>
            <hr />
            <p>
              <strong>Mensaje rápido:</strong>
            </p>

            <div className="mb-3">
              {closedQuestions.map((res, index) => (
                <CustomButton
                  key={index}
                  title={res.question}
                  variant={
                    selectedMessage === res.question
                      ? "primary"
                      : "outline-secondary"
                  }
                  style="me-2 mb-2"
                  onClick={() => setSelectedMessage(res.question)}
                />
              ))}
            </div>
          </>
        )}
      </CustomModal>
    </Container>
  );
};

export default ProductDetail;
