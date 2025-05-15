import React, { useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import { productService } from "../../services";
import { toast } from "react-toastify";

export default function Desplegable({ product }) {
  const [status, setStatus] = useState(product.status || "Estado");

  const handleStatusChange = async (status) => {
    try {
      setStatus(status);
      const response = await productService.status(product.id, status);
      if (response.status === "vendido") {
        toast.success("Producto vendido!");
      } else {
        toast.success("Producto disponible!");
      }
      toast.success();
    } catch (error) {
      console.error("error al cambiar el estado", error);
    }
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
        <Dropdown.Item onClick={() => handleStatusChange("disponible")}>
          Disponible
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("vendido")}>
          Vendido
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
