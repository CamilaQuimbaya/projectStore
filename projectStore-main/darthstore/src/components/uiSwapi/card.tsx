/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "../../styles/components/card.css";
import img from "../../assets/grogu.gif";
import { useProductStore } from "../../store/products";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string | number;
  name: string;
  description: string;
  image: string;
  stock: number;
  price: number;
  edit: boolean;
  handleDelete: (productId: string) => any;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  image,
  stock,
  price,
  edit,
  handleDelete,
}) => {
  console.log(name, description, image);

  const { setProduct } = useProductStore();
  const navigate = useNavigate();

  const updateProduct = () => {
    setProduct({ id, name, description, image, stock, price });
    navigate("/edit");
  };
  return (
    <div>
      <div className="myCardContainer">
        <div className="myCard">
          <h3>{name}</h3>
          <p>{description}</p>
          {image === undefined || image === "" ? (
            <img src={img} alt="img" className="img-fluid otherImg" />
          ) : (
            <img src={image} alt={name} className="img-fluid" />
          )}
          <p>Stock: {stock}</p>
          <p>Price: ${price}</p>
          {edit && <button onClick={() => updateProduct()} className="buttonOptionCard">Edit</button>}
          {edit && (
            <button onClick={() => handleDelete(id + "")} className="buttonOptionCard">Eliminar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
