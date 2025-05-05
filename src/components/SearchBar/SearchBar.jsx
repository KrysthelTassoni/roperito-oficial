import { InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, placeholder = "Buscar prendas..." }) => (
  <InputGroup>
    <InputGroup.Text>
      <FaSearch />
    </InputGroup.Text>
    <Form.Control
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </InputGroup>
);

export default SearchBar;