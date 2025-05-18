import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./UserPurchases.css";
import RatingModal from "../RatingModal/RatingModal";
import { CiStar } from "react-icons/ci";

export default function PurchaseCard({ order }) {
  const [showRating, setShowRating] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={order.product_image}
          alt={order.product_title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-purchases mb-0">
            {order.product_title}
          </Card.Title>

          <Card.Text>
            <strong>Precio pagado:</strong> $
            {order.product_price.toLocaleString()} <br />
            <strong>Vendedor:</strong> {order.seller_name}{" "}
            <span
              onClick={() => setShowRating(true)}
              style={{
                cursor: "pointer",
                marginLeft: "8px",
                fontSize: "0.875rem",
              }}
            >
              <CiStar /> Valorar vendedor
            </span>
            <br />
            <strong>Fecha:</strong>{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
      <RatingModal
        show={showRating}
        close={() => setShowRating(false)}
        order_id={order.id}
        seller_name={order.seller_name}
      />
    </>
  );
}
