import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./FilterSelect.css";

const FilterSelect = ({ value, onChange, options, placeholder, name }) => {
  return (
    <Form.Select
      value={value}
      onChange={(e) => {
        onChange(name, e.target.value);
      }}
      className="filter-select"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => {
        const optionValue = option.value || option.id;
        const optionLabel = option.label || option.name;
        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </Form.Select>
  );
};

FilterSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

// Establecer valores por defecto para evitar errores de PropTypes
FilterSelect.defaultProps = {
  value: "",
};

export default FilterSelect;
