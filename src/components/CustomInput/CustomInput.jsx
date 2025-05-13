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
  disabled = false,
}) {
  return (
    <Form.Group className="mb-4" style={{ width: "100%" }}>
      <Form.Label className="custom-input-label">{label}</Form.Label>

      <div
        className={`custom-input-wrapper ${errors[name] ? "has-error" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        {icon && <span className="custom-input-icon">{icon}</span>}
        <div style={{ width: "100%" }}>
          <Form.Control
            type={type}
            {...register(name, {
              required:
                disabled ? false : (typeof required === "string"
                  ? { value: true, message: required }
                  : required),
              pattern: disabled ? null : pattern,
              minLength: disabled ? null : minLength,
              validate: disabled ? null : validate,
              disabled: disabled
            })}
            isInvalid={!!errors[name] && !disabled}
            className="custom-input"
            placeholder={placeholder}
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid" className="custom-feedback">
            {!disabled && errors[name]?.message}
          </Form.Control.Feedback>
        </div>
      </div>
    </Form.Group>
  );
}

//
