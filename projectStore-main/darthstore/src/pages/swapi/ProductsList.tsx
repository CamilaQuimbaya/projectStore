// ProductList.tsx
import React, { useState } from "react";
import Card from "../../components/uiSwapi/card";
import { useAuthStore } from "../../store/auth";
import "../../styles/components/productList.css";
import { useNavigate } from "react-router-dom";
import axios from "../../libs/axios";
import Modal from "./Modal";
import '../../styles/pages/swapi/productList.css';

interface Product {
  name: string;
  id: string | number;
  description: string;
  image: string;
  stock: number;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [succesMessage, setSuccesMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const createProduct = () => {
    navigate("/create", { replace: true });
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/products/${productId}`
      );
      console.log("Producto eliminado exitosamente:", response.data);
      setSuccesMessage("Producto eliminado exitosamente");
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al eliminar el producto:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      alert("No se pudo eliminar el producto. Por favor, intente de nuevo.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (products.length === 0) {
    return (
      <div className="menu-row">
        <div>No products available</div>
        {isAuth && (
          <div>
            <button onClick={createProduct} className="buttonOption btn-primary">New Product</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      {succesMessage && (
        <Modal
          message={succesMessage}
          onClose={() => {
            window.location.reload();
          }}
        />
      )}
      {isAuth && (
        <div className="menu-row">
          <div>Products Menu</div>
          <div>
            <button onClick={createProduct} className="buttonOption">New Product</button>
            <button onClick={toggleEditMode} className="buttonOption">
              {editMode ? "Normal Mode" : "Edit Mode"}
            </button>
          </div>
        </div>
      )}
     <div className="row w-50">
     <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input buttonOptionInput"
            />  
     </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-3 mb-4">
            <Card
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              stock={product.stock}
              price={product.price}
              edit={editMode}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
