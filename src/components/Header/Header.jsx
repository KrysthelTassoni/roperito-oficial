import { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import CustomButton from "../CustomButton/CustomButton";
import { useProducts } from "../../context/ProductContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { inProfile, setInProfile } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      setInProfile(false);
    }
  }, [location.pathname, setInProfile]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center align-self-center"
        >
          <img
            src="/logo2.PNG"
            alt="Hanger"
            height="48"
            className="me-2"
            style={{ marginTop: "-2px" }}
          />
          <span className="section-title">Roperito</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/gallery">
              Explorar
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/create-product" className="me-2">
                  Publicar
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="d-flex align-items-center position-relative"
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <FaUser className="me-2" />
                    {inProfile && location.pathname !== "/profile" && (
                      <span className="notification-dot"></span>
                    )}
                  </div>
                  Mi Perfil
                </Nav.Link>

                <CustomButton
                  variant="outline-primary"
                  title={"Cerrar sesión"}
                  style="ms-2"
                  onClick={handleLogout}
                />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar sesión
                </Nav.Link>

                <CustomButton
                  variant="primary"
                  title={"Registrarse"}
                  to={"/register"}
                  style="ms-2"
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
