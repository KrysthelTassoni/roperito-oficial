import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { defaultImages } from "../../config/images";
import Desplegable from "../Desplegable/Desplegable";
import FavoriteButton from "../CustomButton/FavoriteButton/FavoriteButton";
import CustomButton from "../CustomButton/CustomButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import UserRating from "../UserRating/UserRating";
import { productService } from "../../services";
import Loading from "../Loading/Loading";

const ProductCard = ({
  product,
  myProducts = false,
  isFavorite = false,
  isGallery = false,
}) => {
  const { isAuthenticated, setRefreshAuth, refreshAuth } = useAuth();
  const navigation = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await productService.delete(product.id);
      setRefreshAuth(!refreshAuth);
    } catch (error) {
      console.error(error);
    }
    setShowConfirm(false);
    setLoading(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  // Función para obtener el rating correcto
  const getRatingInfo = () => {
    if (myProducts && product.rating) {
      return {
        rating: product.rating.average || 0,
        total: product.rating.total || 0,
      };
    }
    return {
      rating: product.seller?.rating?.average || 0,
      total: product.seller?.rating?.total || 0,
    };
  };

  const ratingInfo = getRatingInfo();

  return (
    <Card className="h-100 product-card position-relative">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={
            product.images && product.images.length > 0
              ? product.images.find((img) => img.order === 1)?.image_url || defaultImages.fallback
              : defaultImages.fallback
          }
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={handleImageError}
        />

        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
          {myProducts ? (
            <>
              {product.status === "disponible" && (
                <CustomButton
                  title={"Editar"}
                  icon={<FaEdit />}
                  onClick={handleEdit}
                />
              )}

              <Desplegable product={product} />

              {product.status === "disponible" && (
                <CustomButton
                  title={"Eliminar"}
                  icon={<FaTrash />}
                  variant="danger"
                  iconColor={"white"}
                  onClick={handleDeleteClick}
                />
              )}
            </>
          ) : (
            isAuthenticated && (
              <FavoriteButton
                product={product}
                isGallery={isGallery}
                isFavorite={isFavorite}
              />
            )
          )}
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name || product.title}</Card.Title>
        <Card.Text className="text-primary fw-bold">${product.price}</Card.Text>
        {(ratingInfo.rating > 0 || ratingInfo.total > 0) && (
          <div className="mb-2">
            <UserRating
              averageRating={ratingInfo.rating}
              totalRatings={ratingInfo.total}
            />
          </div>
        )}
        <Button
          as={Link}
          to={`/product/${isFavorite ? product.product_id : product.id}`}
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
      {loading && <Loading show={loading} text="Eliminando producto" />}
    </Card>
  );
};

export default ProductCard;
