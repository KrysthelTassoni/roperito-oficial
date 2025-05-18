import { useState, useEffect } from "react";
import { Card, Row, Col, Alert } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import { ratingService } from "../../services";
import { toast } from "react-toastify";

export default function RatingModal({ seller_name, order_id, show, close }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = async (value) => {
    if (submitted) return;

    setRating(value);

    try {
      const response = await ratingService.create(order_id, value);

      setSubmitted(true);
    } catch (error) {
      console.error("Error al registrar valoracion", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <CustomModal
      showModal={show}
      closeModal={close}
      textHeader={`Valora a ${seller_name}`}
      textButtonCancel="Cerrar"
    >
      <Card
        style={{
          background: "var(--background-light)",
          boxShadow: "var(--box-shadow)",
          border: "none",
          borderRadius: "1rem",
        }}
      >
        <Card.Body>
          <Row className="justify-content-center">
            {[1, 2, 3, 4, 5].map((star, i) => {
              const isFilled = (hover || rating || 0) >= star;
              return (
                <Col key={i} xs="auto">
                  <span
                    style={{
                      fontSize: "2rem",
                      color: isFilled
                        ? "var(--primary-color)"
                        : "var(--text-muted)",
                      cursor: submitted ? "default" : "pointer",
                      transition: "var(--transition)",
                    }}
                    onMouseEnter={() => !submitted && setHover(star)}
                    onMouseLeave={() => !submitted && setHover(0)}
                    onClick={() => !submitted && handleRating(star)}
                  >
                    ★
                  </span>
                </Col>
              );
            })}
          </Row>
          {submitted && (
            <Alert
              variant="success"
              className="mt-3"
              style={{
                backgroundColor: "var(--background-secondary)",
                color: "var(--secondary-color)",
              }}
            >
              ¡Gracias por tu valoración!
            </Alert>
          )}
        </Card.Body>
      </Card>
    </CustomModal>
  );
}
