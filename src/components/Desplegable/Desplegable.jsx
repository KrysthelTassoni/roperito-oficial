import React, { useState } from "react";
import { ButtonGroup, Dropdown, Modal, Form, Button } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import { toast } from "react-toastify";
import { orderService, productService } from "../../services";
import { useAuth } from "../../context/AuthContext";

export default function Desplegable({ product }) {
  const [status, setStatus] = useState(product.status || "Estado");
  const [showModal, setShowModal] = useState(false);
  const [potentialBuyers, setPotentialBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const { refreshAuth, setRefreshAuth } = useAuth();

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "vendido") {
      try {
        const response = await orderService.getPotentialBuyers(product.id);
        setPotentialBuyers(response); // Assumes response.data is an array of { id, name }
        setShowModal(true);
      } catch (error) {
        toast.error("Error al obtener posibles compradores.");
        console.error(error);
      }
    } else {
      // Volver a disponible: eliminar orden y actualizar estado
      try {
        await orderService.deleteOrder(product.id);
        await productService.status(product.id, newStatus);
        setStatus(newStatus);
        toast.success("Producto marcado como disponible.");
        setRefreshAuth(!refreshAuth);
      } catch (error) {
        toast.error("Error al cambiar el estado.");
        console.error(error);
      }
    }
  };

  const handleConfirmSell = async () => {
    try {
      if (!selectedBuyer) {
        return toast.warn("Debe seleccionar un comprador.");
      }
      await orderService.createOrder(product.id, selectedBuyer);
      const response = await productService.status(product.id, "vendido");
      setStatus("vendido");
      setShowModal(false);
      setRefreshAuth(!refreshAuth);
      toast.success("Producto vendido!");
    } catch (error) {
      toast.error("Error al registrar la venta.");
      console.error(error);
    }
  };

  return (
    <>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar comprador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectBuyer">
            <Form.Label>Selecciona al comprador:</Form.Label>
            <Form.Select
              value={selectedBuyer}
              onChange={(e) => setSelectedBuyer(e.target.value)}
            >
              <option value=""> Elegir comprador </option>
              {potentialBuyers.map((buyer) => (
                <option key={buyer.id} value={buyer.id}>
                  {buyer.name} ({buyer.email})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSell}>
            Confirmar venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
