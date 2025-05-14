import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomInput/CustomInput";
import { BiUser } from "react-icons/bi";
import { MdEmail, MdPassword } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { PiPhone } from "react-icons/pi";
import CustomButton from "../../components/CustomButton/CustomButton";
import { authService } from "../../services";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Aquí irá la lógica de registro cuando conectemos con el backend

      const response = await authService.register(data);

      if (response) {
        toast.success("¡Registro exitoso!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Ocurrió un error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 section-title">Crea tu cuenta</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label={"Nombre"}
              type={"text"}
              name={"name"}
              placeholder="Juan Pérez"
              required={"El nombre es requerido"}
              minLength={{
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              }}
              register={register}
              errors={errors}
              icon={<BiUser />}
            />

            <CustomInput
              label={"Email"}
              type={"email"}
              name={"email"}
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
              label={"Telefono"}
              type={"phone"}
              name={"phone"}
              placeholder="+56912345678"
              required={"El número de teléfono es requerido"}
              minLength={{
                value: 9,
                message: "El número de teléfono debe tener al menos 9 dígitos",
              }}
              register={register}
              errors={errors}
              icon={<PiPhone />}
            />

            <CustomInput
              label={"Contraseña"}
              type={"password"}
              name={"password"}
              placeholder="contraseña123"
              required={"La contraseña es requerida"}
              minLength={{
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              }}
              register={register}
              errors={errors}
              icon={<MdPassword />}
            />

            <CustomInput
              label={"Confirmar contraseña"}
              type={"password"}
              name={"confirmPassword"}
              placeholder="contraseña123"
              required={"Por favor confirma tu contraseña"}
              validate={(value) =>
                value === password || "Las contraseñas no coinciden"
              }
              register={register}
              errors={errors}
              icon={<GiConfirmed />}
            />

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Acepto términos y condiciones"
                {...register("terms", {
                  required: "Debes aceptar los términos y condiciones",
                })}
                isInvalid={!!errors.terms}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.terms?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <CustomButton
              variant="primary"
              title={"Registrarse"}
              type={"submit"}
              style="w-100 mb-3"
            />

            <div className="text-center">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
