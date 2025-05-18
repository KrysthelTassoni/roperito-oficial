import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaUserPlus,
  FaTshirt,
  FaComments,
  FaShieldAlt,
  FaSearch,
} from "react-icons/fa";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <Container>
        <h1 className="text-center section-title">¿Cómo funciona Roperito?</h1>
        <p className="text-center lead">
          Te guiamos paso a paso para que puedas <strong>vender </strong>
          prendas usadas de una forma simple y rápida.
        </p>

        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="step-card">
              <Card.Body>
                <div className="icon-container">
                  <FaUserPlus size={40} className="icon-primary" />
                </div>
                <h3>1. Crea una cuenta</h3>
                <p>
                  Regístrate rápidamente con tu correo para comenzar a vender en
                  Roperito, si ya estás registrado inicia sesión.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="step-card">
              <Card.Body>
                <div className="icon-container">
                  <FaTshirt size={40} className="icon-primary" />
                </div>
                <h3>2. Haz una publicación</h3>
                <p>
                  Toma una buena foto, agrega detalles y elige el precio de tu
                  prenda.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="step-card">
              <Card.Body>
                <div className="icon-container">
                  <FaComments size={40} className="icon-primary" />
                </div>
                <h3>3. Interactúa con compradores</h3>
                <p>
                  Resuelve dudas de los interesados y coordina la venta sin
                  intermediarios. Al concretar la venta, cambia el estado de tu
                  publicación.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <p className="text-center lead">
          Tambien puedes <strong>comprar</strong> moda circular a un precio muy
          conveniente.
        </p>

        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="step-card">
              <Card.Body>
                <div className="icon-container">
                  <FaUserPlus size={40} className="icon-primary" />
                </div>
                <h3>1. Accede a Roperito </h3>
                <p>
                  Regístrate rápidamente con tu correo para comenzar, o inicia
                  sesión si ya estás registrado.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="step-card">
              <Card.Body>
                <div className="icon-container">
                  <FaSearch size={40} className="icon-primary" />
                </div>
                <h3>2. Descubre nuestro catálogo</h3>
                <p>
                  Revisa todas nuestras publicaciones activas y selecciona tu
                  artículo preferido.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="step-card">
              <Card.Body>
                <div className="icon-container">
                  <FaComments size={40} className="icon-primary" />
                </div>
                <h3>3. ¡Contacta al vendedor!</h3>
                <p>
                  Resuelve tus dudas, cierra el trato directamente y valora al
                  vendedor después de la compra para ayudar a otros usuarios a
                  confiar
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="security-card">
          <Card.Body>
            <h2 className="text-center mb-4">
              <FaShieldAlt className="me-2 icon-primary" />
              Consejos de seguridad y uso responsable
            </h2>
            <Row>
              <Col md={6}>
                <ul className="list-unstyled security-list">
                  <li>Usa fotos claras y que tu prenda esté limpia.</li>
                  <li>Elige precios justos según el estado de la ropa.</li>
                  <li>Responde con respeto y claridad a los interesados.</li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="list-unstyled security-list">
                  <li>Nunca compartas información personal sensible.</li>
                  <li>¡Prioriza Encuentros en Lugares Públicos!</li>
                  <li>
                    Revisa siempre la calificación del comprador/vendedor antes
                    de concretar.
                  </li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default HowItWorks;
