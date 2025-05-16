import { Card, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { defaultImages } from "../../config/images";
//import { format } from "date-fns";
//import { es } from "date-fns/locale";
import { FaUser, FaClock, FaReply, FaCheck, FaBell } from "react-icons/fa";
import { useState } from "react";
//import { messageService } from "../../services"; // Asegúrate de tener esto creado
import Loading from "../Loading/Loading";
import "./NotificationCard.css";
import { BiBell, BiNotification } from "react-icons/bi";
import CustomModal from "../CustomModal/CustomModal";
import { orderService } from "../../services";
import { toast } from "react-toastify";
import { formatRelativeTime } from "../../utils/formatDate";
import CustomButton from "../CustomButton/CustomButton";

const NotificationCard = ({ message, onMarkedAsRead = null }) => {
  const {
    id,
    message: content,
    buyer_name,
    product_title,
    product_id,
    created_at,
    seller_response,
    seller_name,
    responded_at,
  } = message;

  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  // const formattedDate = format(new Date(created_at), "PPpp", { locale: es });

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      setLoading(true);
      await orderService.replyMessage(id, replyText);
      toast.success("Respuesta enviada!");

      setReplyText("");
      setShowModal(false);
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="h-100 product-card position-relative">
        <div className="position-relative">
          <FaBell
            size={20}
            color="#C5C5C5FF"
            className="position-absolute top-0 end-0 m-2"
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate title-notification">
            {product_title}
          </Card.Title>
          <Card.Text className="mb-2">
            <strong className="title-notification">Mensaje:</strong>{" "}
            {seller_response === null ? content : seller_response}
          </Card.Text>
          <Card.Text className="mb-1 d-flex align-items-center gap-2">
            <FaUser className="text-secondary" />
            <span>{seller_response === null ? buyer_name : seller_name}</span>
          </Card.Text>
          <Card.Text className="mb-3 d-flex align-items-center gap-2">
            <FaClock className="text-secondary" />
            <span className="text-time">
              {seller_name === null
                ? formatRelativeTime(created_at)
                : formatRelativeTime(responded_at)}
            </span>
          </Card.Text>

          <div className="d-flex gap-2 mt-auto flex-wrap">
            <CustomButton
              title={"Ver producto"}
              variant="outline-primary"
              to={`/product/${product_id}`}
            />

            {seller_response === null ? (
              <CustomButton
                title={"Responder"}
                variant="outline-secondary"
                onClick={() => setShowModal(true)}
                icon={<FaReply />}
              />
            ) : (
              <CustomButton
                title={"Contactar"}
                variant="outline-secondary"
                to={`/product/${product_id}`}
                icon={<FaReply />}
              />
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Modal para respuesta */}
      <CustomModal
        textHeader={`Responder a ${buyer_name}`}
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        textButtonCancel="Cancelar"
        textButtonConfirm={"Enviar"}
        confirm={handleReply}
      >
        <Form.Label>Selecciona una respuesta</Form.Label>
        <div className="d-flex flex-column gap-2">
          {[
            "Gracias por tu interés, ya te contacto.",
            "El producto sigue disponible.",
            "Lo siento, el producto ya fue vendido.",
          ].map((msg, index) => (
            <Button
              key={index}
              variant={replyText === msg ? "primary" : "outline-primary"}
              onClick={() => setReplyText(msg)}
            >
              {msg}
            </Button>
          ))}
        </div>
      </CustomModal>
    </>
  );
};

export default NotificationCard;
