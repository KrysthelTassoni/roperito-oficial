import React from "react";
import { Form } from "react-bootstrap";
import "./CustomInput.css";

export default function CustomInput({
  label,
  name,
  placeholder = "",
  type,
  required,
  pattern = null,
  minLength = null,
  validate = null,
  register,
  errors,
  icon = null,
  value = "",
}) {
  return (
    <Form.Group className="mb-4">
      <Form.Label className="custom-input-label">{label}</Form.Label>

      <div
        className={`custom-input-wrapper ${errors[name] ? "has-error" : ""}`}
      >
        {icon && <span className="custom-input-icon">{icon}</span>}
        <div style={{ width: "100%" }}>
          <Form.Control
            type={type}
            defaultValue={value}
            {...register(name, {
              required:
                typeof required === "string"
                  ? { value: true, message: required }
                  : required,
              pattern,
              minLength,
              validate,
            })}
            isInvalid={!!errors[name]}
            className="custom-input"
            placeholder={placeholder}
          />
          <Form.Control.Feedback type="invalid" className="custom-feedback">
            {errors[name]?.message}
          </Form.Control.Feedback>
        </div>
      </div>
    </Form.Group>
  );
}

//
