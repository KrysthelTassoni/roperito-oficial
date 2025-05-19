import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./FavoriteButton.css";

export default function FavoriteButton({
  product,
  isGallery = false,
  isFavorite = false,
  isProductDetail = false,
}) {
  const { isAuthenticated } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites } = useProducts();

  const isFav = isFavorite
    ? favorites.some((fav) => fav.id === product.id)
    : favorites.some((fav) => fav.product_id === product.id);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) return;
    if (isFav) {
      removeFromFavorites(
        isGallery || isProductDetail ? product.id : product.product_id
      ); //se pasa el id del producto NO el id de la tabla favoritos
    } else {
      addToFavorites(product);
    }
  };

  return (
    <Button
      variant="link"
      className="p-0 btn-heart"
      onClick={handleFavoriteClick}
    >
      {isFav ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
    </Button>
  );
}
