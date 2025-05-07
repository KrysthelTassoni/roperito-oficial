import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import "./CustomAvatar.css";
import { PiPhone } from "react-icons/pi";
import CustomButton from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import CustomInput from "../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import FilterSelect from "../FilterSelect/FilterSelect";
import { REGIONS_CHILE } from "../../config/locations";
import { userProfile } from "../../config/data";
import UserRating from "../UserRating/UserRating";

export default function CustomAvatar() {
  const { user } = useAuth();
  const defaultUser = userProfile[0]; // Usando el primer usuario como default

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      country: "Chile",
      city: user?.city || defaultUser.city,
      region: user?.region || defaultUser.region,
    }
  });

  const [showModal, setShowModal] = useState(false);

  const handleRegionChange = (field, value) => {
    setValue(field, value);
  };

  const onSubmit = (data) => {
    // Aquí irá la lógica de registro cuando conectemos con el backend
    console.log(data);
    toast.success("¡Registro exitoso!");
  };

  // Función para obtener el nombre de la región a partir de su valor
  const getRegionLabel = (value) => {
    const region = REGIONS_CHILE.find(r => r.value === value);
    return region ? region.label : value;
  };

  return (
    <div className="avatar-contain">
      <div className="info-user">
        <div className="rounded-circle bg-light p-3 d-inline-block mb-3">
          <FaUser size={25} className="text-primary" />
        </div>
        <div>
          <div className="d-flex align-items-center gap-3">
            <h3>{user?.name || defaultUser.name}</h3>
            <UserRating 
              averageRating={user?.rating?.average || 0} 
              totalRatings={user?.rating?.total || 0} 
            />
          </div>
          <p>
            {(user?.city || defaultUser.city) && (user?.region || defaultUser.region)
              ? `${user?.city || defaultUser.city}, ${getRegionLabel(user?.region || defaultUser.region)}, ${user?.country || defaultUser.country}`
              : `${defaultUser.city}, ${getRegionLabel(defaultUser.region)}, ${defaultUser.country}`}
          </p>
        </div>
      </div>

      <div className="fono">
        <div className="d-flex gap-2 align-items-center">
          <PiPhone />
          <p>{user?.phone || defaultUser.phone}</p>
        </div>

        <CustomButton
          title={"Editar perfil"}
          icon={<FaEdit />}
          onClick={() => setShowModal(true)}
        />
      </div>
      <CustomModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        confirm={handleSubmit(onSubmit)}
        textButtonConfirm={"Guardar cambios"}
        textHeader={"Editar perfil"}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            value={user?.name || defaultUser.name}
            label={"Nombre"}
            type={"text"}
            name={"name"}
            required={"El nombre es requerido"}
            minLength={{
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            }}
            register={register}
            errors={errors}
            icon={<FaUser />}
          />
          <CustomInput
            value={user?.email || defaultUser.email}
            label={"Correo electrónico"}
            type={"email"}
            name={"email"}
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
            value={user?.phone || defaultUser.phone}
            label={"Teléfono"}
            type={"phone"}
            name={"phone"}
            required={"El número de teléfono es requerido"}
            register={register}
            errors={errors}
            icon={<PiPhone />}
          />

          {/* Campos de dirección */}
          <CustomInput
            value={user?.city || defaultUser.city}
            label={"Ciudad"}
            type={"text"}
            name={"city"}
            required={"La ciudad es requerida"}
            register={register}
            errors={errors}
            icon={<FaMapMarkerAlt />}
          />
          <Form.Group className="mb-4">
            <Form.Label className="custom-input-label">Región</Form.Label>
            <FilterSelect
              value={watch("region") || defaultUser.region}
              onChange={handleRegionChange}
              options={REGIONS_CHILE}
              placeholder="Selecciona una región"
              name="region"
            />
            {errors.region && (
              <Form.Text className="text-danger">
                {errors.region.message}
              </Form.Text>
            )}
          </Form.Group>
          <CustomInput
            value={user?.country || defaultUser.country}
            label={"País"}
            type={"text"}
            name={"country"}
            disabled={true}
            register={register}
            errors={errors}
            icon={<FaMapMarkerAlt />}
          />
        </Form>
      </CustomModal>
    </div>
  );
}
