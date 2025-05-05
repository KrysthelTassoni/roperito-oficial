import { Card, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { defaultImages } from "../../config/images";
import Desplegable from "../Desplegable/Desplegable";
import FavoriteButton from "../CustomButton/FavoriteButton/FavoriteButton";
import CustomButton from "../CustomButton/CustomButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";

const ProductCard = ({ product, myProducts = false }) => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleImageError = (e) => {
    e.target.src = defaultImages.fallback;
  };

  const handleEdit = () => {
    navigation("/create-product", {
      state: { product },
    });
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    console.log("Eliminar", product.id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  // Función para obtener el rating correcto
  const getRatingInfo = () => {
    if (myProducts && product.rating) {
      return {
        rating: product.rating.average,
        total: product.rating.total,
      };
    }
    return {
      rating: product.seller?.rating || 0,
      total: product.seller?.totalRatings || 0,
    };
  };

  const ratingInfo = getRatingInfo();

  return (
    <Card className="h-100 product-card position-relative">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.images[0] || product.mainImage || defaultImages.fallback}
          alt={product.name || product.title || "Producto"}
          style={{ height: "200px", objectFit: "cover" }}
          onError={handleImageError}
        />

        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
          {myProducts ? (
            <>
              <CustomButton
                title={"Editar"}
                icon={<FaEdit />}
                onClick={handleEdit}
              />
              <Desplegable product={product} />

              <CustomButton
                title={"Eliminar"}
                icon={<FaTrash />}
                variant="danger"
                iconColor={"white"}
                onClick={handleDeleteClick}
              />
            </>
          ) : (
            isAuthenticated && <FavoriteButton product={product} />
          )}
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name || product.title}</Card.Title>
        <Card.Text className="text-primary fw-bold">${product.price}</Card.Text>
        <div className="d-flex align-items-center mb-2">
          <FaStar className="text-warning me-1" />
          <span>
            {ratingInfo.rating} ({ratingInfo.total})
          </span>
        </div>
        <Button
          as={Link}
          to={`/product/${product.id}`}
          variant="outline-primary"
          className="mt-auto"
        >
          Ver detalle
        </Button>
      </Card.Body>
      <CustomModal
        textButtonConfirm={"Eliminar"}
        textHeader={"Confirmar eliminación"}
        children={"¿Estás seguro de que deseas eliminar este producto?"}
        showModal={showConfirm}
        confirm={confirmDelete}
        closeModal={cancelDelete}
      />
    </Card>
  );
};

export default ProductCard;
