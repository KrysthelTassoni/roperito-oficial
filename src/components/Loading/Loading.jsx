import React from "react";
import "./Loading.css";
import CustomModal from "../CustomModal/CustomModal";

export default function Loading({ text = "Cargando...", show }) {
  return (
    <CustomModal showModal={show} isLoading>
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-title">{text}</p>
      </div>
    </CustomModal>
  );
}
