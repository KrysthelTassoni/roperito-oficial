import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <Container className="text-center container-fluid">
        <Row className="justify-content-center">
          <Col md={6}>
            <img
              src="/images/404.png"
              alt="Ropa perdida"
              className="w-100 h-100 object-fit-cover"
            />
          </Col>
          <Col
            md={6}
            className="p-5 d-flex flex-column justify-content-center align-items-center"
          >
            <h1 className="display-4 mb-4 gradient-primary">
              ¡Ups! Parece que esta prenda se perdió
            </h1>
            <p className="lead mb-4">
              La página que buscas no está en nuestro armario.
              <br />
              Pero no te preocupes, tenemos muchas otras prendas esperándote.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                as={Link}
                to="/"
                variant="primary"
                size="lg"
                className="d-flex align-items-center gap-2"
              >
                <FaHome />
                Volver al inicio
              </Button>
              <Button
                as={Link}
                to="/gallery"
                variant="outline-primary"
                size="lg"
                className="d-flex align-items-center gap-2"
              >
                <FaSearch />
                Explorar prendas
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
