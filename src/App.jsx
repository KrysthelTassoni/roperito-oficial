import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MisRutas from "./routes/MisRutas";

function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <MisRutas />
        </ProductProvider>
      </AuthProvider>
    </>
  );
}

export default App;
