import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./FilterSelect.css";

const FilterSelect = ({ value, onChange, options, placeholder, name }) => {
  return (
    <Form.Select
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="filter-select"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

FilterSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FilterSelect; 