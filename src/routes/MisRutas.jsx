import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import Gallery from "../pages/Gallery/Gallery";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "../config/PrivateRoute";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NotFound from "../pages/NotFound/NotFound";

function MisRutas() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app min-vh-100 min-vw-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <div className="container-fluid px-0 general-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to={"/profile"} /> : <Register />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to={"/profile"} /> : <Login />
              }
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
          </Routes>
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default MisRutas;
