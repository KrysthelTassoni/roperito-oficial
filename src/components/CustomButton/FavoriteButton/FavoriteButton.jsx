import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./FavoriteButton.css";

export default function FavoriteButton({ product, isGallery = false }) {
  const { isAuthenticated } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites } = useProducts();

  const isFavorite = isGallery
    ? favorites.some((fav) => fav.product_id === product.id)
    : favorites.some((fav) => fav.id === product.id);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) return;
    if (isFavorite) {
      removeFromFavorites(product.product_id);
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
      {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
    </Button>
  );
}
