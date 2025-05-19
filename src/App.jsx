import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MisRutas from "./routes/MisRutas";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <MisRutas />
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
