import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./FavoriteButton.css";
import { toast } from "react-toastify";

export default function FavoriteButton({ product }) {
  const { isAuthenticated } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites } = useProducts();

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) return;
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
      toast.success("Producto añadido a favorito!");
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
