import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput/CustomInput";
import { MdEmail, MdPassword } from "react-icons/md";
import CustomButton from "../../components/CustomButton/CustomButton";
import { userProfile } from "../../config/data";
import { authService } from "../../services";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);

      if (response.token) {
        login(response, response.token);
        toast.success("¡Bienvenido de vuelta!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("error al iniciar sesión: ", error);
      toast.error("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 section-title">Iniciar sesión</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label={"Email"}
              name={"email"}
              type={"email"}
              placeholder="test@example.com"
              required={"El email es requerido"}
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              }}
              register={register}
              errors={errors}
              icon={<MdEmail />}
            />

            <CustomInput
              label={"Contraseña"}
              name={"password"}
              type={"password"}
              placeholder="contraseña123"
              required={"La contraseña es requerida"}
              register={register}
              errors={errors}
              icon={<MdPassword />}
            />

            <CustomButton
              variant="primary"
              title={"Iniciar Sesión"}
              type={"submit"}
              style="w-100 mb-3"
            />

            <div className="text-center mb-3">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>

            <div className="text-center">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
