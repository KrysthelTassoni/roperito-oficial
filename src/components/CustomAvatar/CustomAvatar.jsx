import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import "./CustomAvatar.css";
import { PiPhone } from "react-icons/pi";
import CustomButton from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { userProfile } from "../../config/data";
import UserRating from "../UserRating/UserRating";
import { addressService, ratingService, userService } from "../../services";
import PropTypes from "prop-types";
import { SelectAddress } from "../SelectAddress/SelectAddress";

export default function CustomAvatar({ regions, loadingRegions }) {
  const { user, setRefreshAuth, refreshAuth } = useAuth();
  const defaultUser = userProfile[0];
  // Estado local para formulario
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    city: "",
    province: "",
    region: "",
    country: "Chile",
  });

  const [showModal, setShowModal] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [ratingInfo, setRatingInfo] = useState();

  // Inicializar datos del formulario cuando el usuario está disponible
  useEffect(() => {
    const getCurrentAddress = async () => {
      try {
        if (user?.user) {
          // Determinar de dónde obtener los datos de dirección
          let city, region, province;

          if (user.address) {
            city =
              (await addressService.getCodeByName("city", user.address.city)) ||
              "";
            region =
              (await addressService.getCodeByName(
                "region",
                user.address.region
              )) || "";
            province =
              (await addressService.getCodeByName(
                "province",
                user.address.province
              )) || "";
          }

          const newFormData = {
            name: user.user.name || "",
            phone_number: user.user.phone_number || "",
            city: city && city.codigo,
            region: region && region.codigo,
            province: province && province.codigo,
            country: "Chile",
            regionLabel: user.address && user.address.region,
            provinceLabel: user.address && user.address.province,
            cityLabel: user.address && user.address.city,
          };

          setFormData(newFormData);
          getProvinces(region && region.codigo);
          getCities(province && province.codigo);
          setIsFormReady(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentAddress();
  }, [user, defaultUser]);

  useEffect(() => {
    const getRating = async () => {
      try {
        const response = await ratingService.getRatings(user.user.id);

        setRatingInfo(response);
      } catch (error) {
        console.error("Error al obtener el rating del vendedor", error);
      }
    };

    getRating();
  }, []);

  const getProvinces = async (value) => {
    try {
      const provinces = await addressService.getProvinces(value);
      setProvinces(provinces); //con esto llenamos las provincias acorde a la region seleccionada y aprovechamos de mostrar el select
    } catch (error) {
      console.error("error al cargar provincias", error);
    }
  };

  const getCities = async (value) => {
    try {
      const cities = await addressService.getCities(value);
      setCities(cities);
    } catch (error) {
      console.error("error al cargar comunas", error);
    }
  };

  const handleRegionChange = async (e) => {
    const { name, value } = e.target;
    const label = e.target.options[e.target.selectedIndex].text;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Label`]: label,
    }));

    setFormData((prev) => ({
      ...prev,
      province: "",
      provinceLabel: "",
    }));

    getProvinces(value);
  };

  const handleProvinceChange = async (e) => {
    const { name, value } = e.target;
    const label = e.target.options[e.target.selectedIndex].text;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Label`]: label,
    }));

    setFormData((prev) => ({
      ...prev,
      city: "",
      cityLabel: "",
    }));

    getCities(value);
  };

  const handleCityChange = (e) => {
    const { name, value } = e.target;
    const label = e.target.options[e.target.selectedIndex].text;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Label`]: label,
    }));
  };

  // Manejar cambios en campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!formData.name) {
      toast.error("El nombre es requerido");
      return;
    }

    if (!formData.phone_number) {
      toast.error("El teléfono es requerido");
      return;
    }
    if (!formData.region) {
      toast.error("Por favor selecciona una región");
      return;
    }

    if (!formData.province) {
      toast.error("La provincia es requerida");
      return;
    }

    if (!formData.city) {
      toast.error("La comuna es requerida");
      return;
    }

    try {
      // Obtener el perfil fusionado directamente del servicio
      await userService.updateProfile(formData);

      toast.success("Datos modificados correctamente");
      setShowModal(false);

      setRefreshAuth(!refreshAuth);
    } catch (error) {
      toast.error(error.response.data.details[0].msg);
      console.error("Error al modificar datos personales:", error);
    }
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
            {ratingInfo && (
              <UserRating
                averageRating={ratingInfo.averageRating || 0}
                totalRatings={ratingInfo.totalRatings || 0}
              />
            )}
          </div>
          <p>
            {user.address?.city}, {user.address?.region}
          </p>
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

            <SelectAddress
              title={"Región"}
              name={"region"}
              places={regions}
              loading={loadingRegions}
              value={formData.region}
              onChange={handleRegionChange}
            />

            <SelectAddress
              title={"Provincia"}
              name={"province"}
              places={provinces}
              value={formData.province}
              onChange={handleProvinceChange}
            />

            <SelectAddress
              title={"Comuna"}
              name={"city"}
              places={cities}
              value={formData.city}
              onChange={handleCityChange}
            />

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
