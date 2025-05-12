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
        <option key={option.id} value={option.id}>
          {option.name}
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
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FilterSelect;
