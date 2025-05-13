import React from "react";
import "./Loading.css";

export default function Loading({ text = "Cargando..." }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-title">{text}</p>
    </div>
  );
}
