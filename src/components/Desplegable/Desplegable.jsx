import React, { useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";

export default function Desplegable({ product }) {
  const [status, setStatus] = useState(product.status || "Estado");

  const handleStatusChange = (status) => {
    console.log("Nuevo estado:", status, "para el producto", product.id);
    setStatus(status);
  };

  return (
    <Dropdown as={ButtonGroup}>
      <CustomButton title={status} />
      <Dropdown.Toggle
        split
        variant="light"
        id="dropdown-split-basic"
        size="sm"
      />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleStatusChange("Disponible")}>
          Disponible
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("Vendido")}>
          Vendido
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
