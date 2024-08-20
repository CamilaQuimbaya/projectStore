/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "../styles/pages/productPage.css";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
import Modal from "./swapi/Modal";

type ProductFormErrors = {
  name?: string;
  description?: string;
  stock?: string;
  image?: string;
  price?: string;
};

const ProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: ProductFormErrors = {};

    if (!name) newErrors.name = "El nombre es obligatorio";
    if (name.length > 255) newErrors.name = "El nombre es demasiado largo";

    if (!description) newErrors.description = "La descripción es obligatoria";
    if (description.length > 1000)
      newErrors.description = "La descripción es demasiado larga";

    if (stock < 0) newErrors.stock = "El stock no puede ser negativo";

    if (!image) newErrors.image = "La URL de la imagen es obligatoria";
    const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    if (!urlPattern.test(image)) newErrors.image = "Debe ser una URL válida";

    if (price < 0) newErrors.price = "El precio no puede ser negativo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseModal = () => {
    setSuccessMessage("");
    navigate("/home"); // Redirige a la página de inicio
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate()) {
      const productData = {
        name,
        description,
        stock,
        image,
        price,
      };

      console.log("Datos del Producto:", productData);
      try {
        const response = await axios.post(
          "http://localhost:3005/api/products",
          productData
        );
        setSuccessMessage("Producto creado exitosamente");
        console.log("Respuesta del servidor:", response.data);

        setName("");
        setDescription("");
        setStock(0);
        setImage("");
        setPrice(0);
        setErrors({});
      } catch (error: any) {
        console.error(
          "Error al crear el producto:",
          error.response?.data || error.message
        );

        setErrorMessage(
          "Ocurrió un error al crear el producto. Por favor, intente de nuevo."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Crear Producto</h2>
      {successMessage && (
        <Modal message={successMessage} onClose={handleCloseModal} />
      )}

      {errorMessage && (
        <Modal
          message={errorMessage}
          onClose={() => {
            console.log(errorMessage);
            setSuccessMessage("");
          }}
        />
      )}

      <div className="form-group">
        <label htmlFor="name">Nombre del Producto</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        {errors.stock && <p className="error-message">{errors.stock}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="image">URL de la Imagen</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {errors.image && <p className="error-message">{errors.image}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>

      <button type="submit" className="submit-button">
        Crear Producto
      </button>
    </form>
  );
};

export default ProductPage;
