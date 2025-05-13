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
  console.log("[CustomAvatar] Props recibidas:", { regions, loadingRegions });

  const { user, setUser, setRefresh, refresh, fetchUserProfile } = useAuth();
  const defaultUser = userProfile[0];
  
  // Estado local para formulario
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    city: "",
    region: "",
    country: "Chile"
  });
  
  const [showModal, setShowModal] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  // Inicializar datos del formulario cuando el usuario está disponible
  useEffect(() => {
    if (user?.user) {
      console.log("[CustomAvatar] Cargando datos del usuario:", user);
      console.log("[CustomAvatar] Estructura del objeto user:", user ? Object.keys(user) : "User vacío");
      console.log("[CustomAvatar] Tiene objeto address?", !!user.address);
      
      // Determinar de dónde obtener los datos de dirección
      let city, region;
      
      if (user.address && (user.address.city || user.address.region)) {
        city = user.address.city || "";
        region = user.address.region || "";
        console.log("[CustomAvatar] Usando dirección desde objeto address:", {city, region});
      } else {
        city = user.city || defaultUser.city || "";
        region = user.region || defaultUser.region || "";
        console.log("[CustomAvatar] Usando dirección desde campos a nivel raíz:", {city, region});
      }
      
      const newFormData = {
        name: user.user.name || "",
        phone_number: user.user.phone_number || "",
        city: city,
        region: region,
        country: "Chile"
      };
      
      console.log("[CustomAvatar] Formulario inicializado con:", newFormData);
      setFormData(newFormData);
      setIsFormReady(true);
    }
  }, [user, defaultUser]);

  // Manejar cambios en campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`[CustomAvatar] Campo ${name} cambiado a: "${value}"`);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[CustomAvatar] Enviando formulario con datos:", formData);
    
    // Validación
    if (!formData.name) {
      toast.error("El nombre es requerido");
      return;
    }
    
    if (!formData.phone_number) {
      toast.error("El teléfono es requerido");
      return;
    }
    
    if (!formData.city) {
      toast.error("La ciudad es requerida");
      return;
    }
    
    if (!formData.region) {
      toast.error("Por favor selecciona una región");
      return;
    }

    try {
      console.log("[CustomAvatar] Datos enviados a la API:", formData);
      
      // Obtener el perfil fusionado directamente del servicio
      const mergedProfile = await userService.updateProfile(formData);
      console.log("[CustomAvatar] Perfil fusionado recibido del servicio:", mergedProfile);
      
      toast.success("Datos modificados correctamente");
      setShowModal(false);
      
      // En lugar de hacer fetchUserProfile y luego modificar manualmente,
      // simplemente usamos el perfil fusionado que ya incluye los cambios
      console.log("[CustomAvatar] Actualizando el usuario con el perfil fusionado");
      setUser(mergedProfile);
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error al modificar datos personales");
      console.error("Error al modificar datos personales:", error);
    }
  };

  // Función para obtener el nombre de la región
  const getRegionLabel = (value) => {
    if (!value || !regions || regions.length === 0) return "";
    const region = regions.find((r) => r.value === value);
    return region ? region.label : value;
  };

  // Función para obtener la dirección formateada
  const getFormattedAddress = () => {
    if (!user) return "";
    
    // Obtener valores de dirección
    let city, region, country;
    
    // Verificar si los datos están en el objeto address
    if (user.address && (user.address.city || user.address.region)) {
      city = user.address.city || "";
      region = user.address.region || "";
      country = user.address.country || "Chile";
    } 
    // Si no están en address, intentar obtenerlos de nivel raíz
    else {
      city = user.city || defaultUser.city || "";
      region = user.region || defaultUser.region || "";
      country = user.country || "Chile";
    }
    
    // Mostrar la región con su nombre completo usando getRegionLabel
    const regionLabel = getRegionLabel(region);
    console.log("[CustomAvatar] Dirección formateada:", { city, region, regionLabel, country });
    
    // Verificar si tenemos datos suficientes para mostrar la dirección
    if (!city && !region) return "Sin dirección registrada";
    if (!city) return `${regionLabel}, ${country}`;
    if (!region) return `${city}, ${country}`;
    
    return `${city}, ${regionLabel}, ${country}`;
  };

  return (
    <div className="avatar-contain">
      <div className="info-user">
        <div className="rounded-circle bg-light p-3 d-inline-block mb-3">
          <FaUser size={25} className="text-primary" />
        </div>
        <div>
          <div className="d-flex align-items-center gap-3">
            <h3>{user?.user?.name || ""}</h3>
            <UserRating
              averageRating={user?.rating?.average || 0}
              totalRatings={user?.rating?.total || 0}
            />
          </div>
          <p>{getFormattedAddress()}</p>
        </div>
      </div>

      <div className="fono">
        <div className="d-flex gap-2 align-items-center">
          <PiPhone />
          <p>{user?.user?.phone_number || ""}</p>
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
        confirm={handleSubmit}
        textButtonConfirm={"Guardar cambios"}
        textHeader={"Editar perfil"}
      >
        {isFormReady && (
          <Form onSubmit={handleSubmit} className="contain-form">
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength={3}
                />
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <div className="input-with-icon">
                <PiPhone className="input-icon" />
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Región</Form.Label>
              {loadingRegions ? (
                <p>Cargando regiones...</p>
              ) : (
                <div>
                  <Form.Select 
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una región</option>
                    {regions.map((region) => (
                      <option 
                        key={region.value} 
                        value={region.value}
                      >
                        {region.label}
                      </option>
                    ))}
                  </Form.Select>
                  
                  <div className="mt-1 text-muted small">
                    Región seleccionada: {formData.region ? `"${formData.region}" (${getRegionLabel(formData.region)})` : "Ninguna"}
                  </div>
                </div>
              )}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>País</Form.Label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  disabled
                />
              </div>
            </Form.Group>
          </Form>
        )}
      </CustomModal>
    </div>
  );
}

CustomAvatar.propTypes = {
  regions: PropTypes.array.isRequired,
  loadingRegions: PropTypes.bool.isRequired,
};
