import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h1 className="display-4 fw-bold mb-4 gradient-primary">
              Dale una segunda vida a tu ropa
            </h1>
            <p className="lead mb-4">
            "Moda circular con historias por contar"
            </p>
            <Button 
              as={Link} 
              to="/gallery" 
              variant="primary" 
              size="lg"
              className="mb-3"
            >
              Ver publicaciones
            </Button>
          </Col>
          <Col md={6} className="text-center">
            <img
              src="/images/hero-image.jpg"
              alt="Ropa de segunda mano"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection; 