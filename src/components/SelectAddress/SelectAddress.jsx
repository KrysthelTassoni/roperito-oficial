import React from "react";
import { Form } from "react-bootstrap";

export const SelectAddress = ({
  title,
  loading = false,
  name,
  places,
  value,
  onChange,
}) => {
  return (
    <Form.Group className="mb-4">
      <Form.Label>{title}</Form.Label>
      {loading ? (
        <p>Cargando {title}...</p>
      ) : (
        <div>
          <Form.Select name={name} value={value} onChange={onChange} required>
            <option value="">Selecciona una {title}</option>
            {places.map((place) => (
              <option key={place.codigo} value={place.codigo}>
                {place.nombre}
              </option>
            ))}
          </Form.Select>
        </div>
      )}
    </Form.Group>
  );
};
