import { Container, Form, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomButton from "../../components/CustomButton/CustomButton";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import "./CreateProduct.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { CATEGORY_OPTIONS, SIZE_OPTIONS } from "../../constants/selectOptions";
import { productService } from "../../services/productService";
import { metadataService } from "../../services";

const CreateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.product || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: productToEdit || {},
  });

  const [selectedImages, setSelectedImages] = useState(
    productToEdit?.images?.map((url) => ({ url })) || []
  );
  const [categories, setCategories] = useState([]);
  const [size, setsize] = useState([]);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const { categories } = await metadataService.getCategories();
        const { size } = await metadataService.getSizes();
        setCategories(categories);
        setsize(size);
      } catch (error) {}
    };

    getMetadata();
  }, []);

  const handleSelectChange = (field, value) => {
    setValue(field, value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const onSubmit = async (data) => {
    try {
      // Transformar imágenes a array de strings si es necesario
      const images = selectedImages.map((img) => img.url);
      const productData = { ...data, images };
      if (productToEdit) {
        await productService.update(productToEdit.id, productData);
        toast.success("¡Producto editado exitosamente!");
      } else {
        await productService.create(productData);
        toast.success("¡Producto creado exitosamente!");
      }
      navigate("/gallery");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Ocurrió un error. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="create-product">
      <Container className="py-5">
        <Card
          className="mx-auto position-relative"
          style={{ maxWidth: "600px" }}
        >
          <button
            className="close-button"
            onClick={() => navigate(-1)}
            aria-label="Cerrar"
          >
            <IoClose size={24} />
          </button>
          <Card.Body className="p-4">
            <h2 className="text-center mb-4 section-title">
              {productToEdit ? "Editar publicación" : "Crear publicación"}
            </h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  {...register("title", {
                    required: "El título es requerido",
                    minLength: {
                      value: 5,
                      message: "El título debe tener al menos 5 caracteres",
                    },
                  })}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("description", {
                    required: "La descripción es requerida",
                  })}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Talla</Form.Label>
                    <FilterSelect
                      value={watch("size") || ""}
                      onChange={handleSelectChange}
                      options={size}
                      placeholder="Selecciona una talla"
                      name="size"
                    />
                    {errors.size && (
                      <Form.Text className="text-danger">
                        {errors.size.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Categoría</Form.Label>
                    <FilterSelect
                      value={watch("category") || ""}
                      onChange={handleSelectChange}
                      options={categories}
                      placeholder="Selecciona una categoría"
                      name="category"
                    />
                    {errors.category && (
                      <Form.Text className="text-danger">
                        {errors.category.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Precio (USD)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price", {
                    required: "El precio es requerido",
                    min: {
                      value: 0,
                      message: "El precio debe ser mayor a 0",
                    },
                  })}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                {selectedImages.length < 3 && (
                  <>
                    <Form.Label>Imágenes</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      {...register(
                        "images",
                        !productToEdit && {
                          required: "Debes subir al menos una imagen",
                        }
                      )}
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                      isInvalid={!!errors.images}
                      lang="es"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.images?.message}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Puedes subir hasta 3 imágenes. La primera será la imagen
                      principal.
                    </Form.Text>
                  </>
                )}

                {selectedImages.length > 0 && (
                  <div className="d-flex gap-3 flex-wrap mt-3">
                    {selectedImages.map((img, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid #ccc",
                        }}
                      >
                        <img
                          src={img.url}
                          alt={`preview-${index}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          onClick={() => handleRemoveImage(index)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "rgba(0, 0, 0, 0.6)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(0, 0, 0, 0.8)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(0, 0, 0, 0.6)";
                          }}
                        >
                          <CgClose />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>
              <div className="d-grid">
                <CustomButton
                  title="Publicar"
                  type="submit"
                  variant="primary"
                  style="py-2 fw-semibold"
                />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CreateProduct;
