import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomButton.css";

export default function CustomButton({
  title,
  to = null,
  type = null,
  icon = null,
  style = "",
  variant = "light",
  iconColor = "#7c4dff",
  onClick = null,
}) {
  return (
    <>
      <Button
        as={to ? Link : null}
        to={to}
        type={type}
        onClick={onClick}
        variant={variant}
        className={
          style !== ""
            ? style
            : "d-flex align-items-center gap-2 custom-icon-button"
        }
      >
        {icon && (
          <span className="icon-btn">
            {React.cloneElement(icon, { color: iconColor })}
          </span>
        )}
        {title}
      </Button>
    </>
  );
}
