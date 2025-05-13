import React, { useEffect, useState } from "react";
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
import { userProfile } from "../../config/data";
import UserRating from "../UserRating/UserRating";
import { metadataService, userService } from "../../services";
import apiClient from "../../services/apiClient";
import { API_CONFIG } from "../../config/api.config";
import PropTypes from 'prop-types';

export default function CustomAvatar({ regions, loadingRegions }) {
  // Log para ver las props recibidas
  console.log("[CustomAvatar] Props recibidas:", { regions, loadingRegions });

  const { user, setUser, setRefresh, refresh } = useAuth();
  const defaultUser = userProfile[0]; // Usando el primer usuario como default

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      country: "Chile",
      city: user?.city || defaultUser.city,
      region: user?.region || defaultUser.region,
    },
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.user) {
      setValue("name", user.user.name);
      setValue("phone_number", user.user.phone_number);
      setValue("city", user?.city || defaultUser.city);
      setValue("region", user?.region || defaultUser.region);
      setValue("country", "Chile"); // Forzar siempre Chile como país
      console.log(user.user);
    }
  }, [user, setValue, defaultUser.city, defaultUser.region]);

  const handleRegionChange = (field, value) => {
    setValue(field, value);
  };

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.put(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, data);
      if (response) {
        toast.success("Datos modificados correctamente");
        setShowModal(false);
        
        // Actualiza el estado del usuario respetando la estructura correcta
        setUser((prev) => {
          // Primero creamos una copia del objeto usuario actual
          const updatedUser = { ...prev };
          
          // Actualizamos los datos básicos del usuario
          if (updatedUser.user) {
            updatedUser.user = {
              ...updatedUser.user,
              name: data.name,
              phone_number: data.phone_number
            };
          }
          
          // Actualizamos los datos de dirección según la estructura del objeto
          // Esta actualización debe coincidir con cómo el backend devuelve los datos
          if (response.address) {
            // Si el backend devuelve un objeto address, usamos esa estructura
            updatedUser.address = response.address;
            // También actualizamos las propiedades de nivel superior por compatibilidad
            updatedUser.city = response.address.city;
            updatedUser.region = response.address.region;
            updatedUser.country = response.address.country;
          } else {
            // Si no hay un objeto address en la respuesta, actualizamos directamente
            updatedUser.city = data.city;
            updatedUser.region = data.region;
            updatedUser.country = data.country;
          }
          
          return updatedUser;
        });
      }
    } catch (error) {
      toast.error("Error al modificar datos personales");
      console.log("Error al modificar datos personales: ", error);
    }
  };

  // Función para obtener el nombre de la región a partir de su valor
  const getRegionLabel = (value) => {
    if (!value || regions.length === 0) return "";
    const region = regions.find((r) => r.value === value);
    return region ? region.label : value;
  };

  // Log antes del return para verificar la condición
  console.log("[CustomAvatar] Antes de renderizar select. loadingRegions:", loadingRegions);
  return (
    <div className="avatar-contain">
      <div className="info-user">
        <div className="rounded-circle bg-light p-3 d-inline-block mb-3">
          <FaUser size={25} className="text-primary" />
        </div>
        <div>
          <div className="d-flex align-items-center gap-3">
            <h3>{user.user.name}</h3>
            <UserRating
              averageRating={user?.rating?.average || 0}
              totalRatings={user?.rating?.total || 0}
            />
          </div>
          <p>
            {(user?.city || defaultUser.city) &&
            (user?.region || defaultUser.region)
              ? `${user?.city || defaultUser.city}, ${getRegionLabel(
                  user?.region || defaultUser.region
                )}, ${user?.country || defaultUser.country}`
              : `${defaultUser.city}, ${getRegionLabel(defaultUser.region)}, ${
                  defaultUser.country
                }`}
          </p>
        </div>
      </div>

      <div className="fono">
        <div className="d-flex gap-2 align-items-center">
          <PiPhone />
          <p>{user.user.phone_number}</p>
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
        <Form onSubmit={handleSubmit(onSubmit)} className="contain-form">
          <CustomInput
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
            label={"Teléfono"}
            type={"phone"}
            name={"phone_number"}
            required={"El número de teléfono es requerido"}
            register={register}
            errors={errors}
            icon={<PiPhone />}
          />

          {/* Campos de dirección */}
          <CustomInput
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
            {/* Log dentro de la condición */}
            {loadingRegions ? (
              console.log("[CustomAvatar] Renderizando 'Cargando regiones...'"),
              <p>Cargando regiones...</p>
            ) : (
              console.log("[CustomAvatar] Renderizando FilterSelect con regions:", regions),
              <FilterSelect
                onChange={handleRegionChange}
                options={regions}
                placeholder="Selecciona una región"
                name="region"
              />
            )}
            {errors.region && (
              <Form.Text className="text-danger">
                {errors.region.message}
              </Form.Text>
            )}
          </Form.Group>
          <CustomInput
            value="Chile"
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

CustomAvatar.propTypes = {
  regions: PropTypes.array.isRequired,
  loadingRegions: PropTypes.bool.isRequired,
};
