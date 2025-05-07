import React from "react";
import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import "./UserRating.css";

const UserRating = ({ averageRating = 0, totalRatings = 0 }) => {
  // Asegurarse de que los valores sean números
  const rating = Number(averageRating) || 0;
  const total = Number(totalRatings) || 0;

  return (
    <div 
      className="user-rating" 
      title={`Calificación promedio: ${rating.toFixed(1)} de ${total} calificaciones`}
    >
      <div className="d-flex align-items-center">
        <FaStar className="text-warning me-1" aria-hidden="true" />
        <small className="text-muted">{rating.toFixed(1)}</small>
        <small className="text-muted ms-1">({total})</small>
      </div>
    </div>
  );
};

UserRating.propTypes = {
  averageRating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  totalRatings: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default UserRating; 