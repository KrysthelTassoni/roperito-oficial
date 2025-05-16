import React from "react";
import { Card } from "react-bootstrap";

export default function UserSales({ order }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={order.product_image}
        alt={order.product_title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="text-purchases">
          {order.product_title}
        </Card.Title>
        <Card.Text>
          <strong>Precio de venta:</strong> $
          {order.product_price.toLocaleString()}
          <br />
          <strong>Comprador:</strong> {order.buyer_name}
          <br />
          <strong>Fecha de venta:</strong>{" "}
          {new Date(order.created_at).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
