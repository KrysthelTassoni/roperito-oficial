import { Container, Row, Col, Card, Nav, Tab } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import "./Profile.css";
import { BiHeart, BiLogOut } from "react-icons/bi";
import { CiFolderOn } from "react-icons/ci";
import CustomButton from "../../components/CustomButton/CustomButton";
import { PiPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { metadataService } from "../../services";

// Regiones por defecto para cuando falla la carga
const DEFAULT_REGIONS = [
  { value: "metropolitana", label: "Metropolitana de Santiago" },
  { value: "valparaiso", label: "Valparaíso" },
  { value: "biobio", label: "Biobío" },
  { value: "arica", label: "Arica y Parinacota" },
  { value: "tarapaca", label: "Tarapacá" },
  { value: "antofagasta", label: "Antofagasta" },
  { value: "atacama", label: "Atacama" },
  { value: "coquimbo", label: "Coquimbo" },
  { value: "ohiggins", label: "O'Higgins" },
  { value: "maule", label: "Maule" },
  { value: "nuble", label: "Ñuble" },
  { value: "araucania", label: "La Araucanía" },
  { value: "losrios", label: "Los Ríos" },
  { value: "loslagos", label: "Los Lagos" },
  { value: "aysen", label: "Aysén" },
  { value: "magallanes", label: "Magallanes" }
];

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const hasShownError = useRef(false);
  const [regions, setRegions] = useState(DEFAULT_REGIONS); // Inicializar con regiones por defecto
  const [loadingRegions, setLoadingRegions] = useState(true);

  useEffect(() => {
    if (!user && !hasShownError.current) {
      toast.error("No se pudo cargar el perfil de usuario.");
      hasShownError.current = true;
    }
  }, [user]);

  useEffect(() => {
    console.log("[Profile.jsx] Iniciando fetch de regiones...");
    async function fetchRegions() {
      try {
        console.log("[Profile.jsx] Llamando a metadataService.getRegions...");
        const regionsData = await metadataService.getRegions();
        console.log("[Profile.jsx] Regiones recibidas:", regionsData);
        
        if (Array.isArray(regionsData) && regionsData.length > 0) { 
          setRegions(regionsData);
          console.log("[Profile.jsx] Estado 'regions' actualizado con datos del servidor:", regionsData);
        } else {
          console.warn("Advertencia: Usando regiones por defecto", DEFAULT_REGIONS);
          setRegions(DEFAULT_REGIONS);
        }
      } catch (error) {
        console.error("Error al cargar regiones:", error);
        toast.error("Se cargarán las regiones por defecto");
        setRegions(DEFAULT_REGIONS);
      } finally {
        setLoadingRegions(false);
        console.log("[Profile.jsx] Fetch de regiones finalizado. loadingRegions: false, regions.length:", regions.length);
      }
    }
    
    fetchRegions();
  }, []);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (!user) {
    return <div className="text-center py-5">Error al cargar el perfil.</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Sesión cerrada correctamente.");
    } catch (error) {
      toast.error("Error al cerrar sesión. Intenta nuevamente.");
    }
  };

  console.log("[Profile.jsx] Renderizando con regions =", regions);

  return (
    <Container className="py-5 profile-contain">
      <Col lg={7} className="mb-4">
        <Card>
          <Card.Body className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <CustomAvatar regions={regions} loadingRegions={loadingRegions} />
            </div>
            <div className="d-flex flex-column align-items-center gap-3">
              <div className="text-muted small">{user.user.email}</div>
              <CustomButton
                title="Cerrar Sesión"
                icon={<BiLogOut />}
                onClick={handleLogout}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={7}>
        <Tab.Container defaultActiveKey="publications">
          <Card>
            <Card.Header>
              <Nav variant="tabs" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="publications">
                    <CiFolderOn /> Mis publicaciones
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="favorites">
                    <BiHeart /> Mis favoritos
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <div className="div-publish">
              <CustomButton
                title="Crear publicación"
                icon={<PiPlus />}
                to="/create-product"
                variant="primary"
                iconColor="white"
              />
            </div>

            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="publications">
                  <Row xs={1} md={2} className="g-4">
                    {user.products.length > 0 ? (
                      user.products.map((product) => (
                        <Col key={product.id}>
                          <ProductCard product={product} myProducts />
                        </Col>
                      ))
                    ) : (
                      <Col xs={12} className="no-products">
                        <div className="text-center py-4">
                          <p className="text-muted">
                            No tienes publicaciones aún
                          </p>
                          <CustomButton
                            title="Crear mi primera publicación"
                            icon={<PiPlus />}
                            to="/create-product"
                            variant="primary"
                          />
                        </div>
                      </Col>
                    )}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="favorites">
                  <Row xs={1} md={2} className="g-4">
                    {user.favorites.length > 0 ? (
                      user.favorites.map((product) => (
                        <Col key={product.id}>
                          <ProductCard product={product} />
                        </Col>
                      ))
                    ) : (
                      <Col xs={12} className="no-products">
                        <div className="text-center py-4">
                          <p className="text-muted">No tienes favoritos aún</p>
                          <CustomButton
                            title="Explorar productos"
                            icon={<FaUser />}
                            to="/gallery"
                            variant="primary"
                          />
                        </div>
                      </Col>
                    )}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Container>
  );
};

export default Profile;
