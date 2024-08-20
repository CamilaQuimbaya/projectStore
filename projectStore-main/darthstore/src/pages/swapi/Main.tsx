/* eslint-disable @typescript-eslint/no-explicit-any */
// MainComponent.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductsList";
import Loader from "../../components/Loader";
import "../../styles/pages/swapi/main.css";

const MainComponent: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get(`http://localhost:3005/api/products`);
        setProducts(products.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data from backend");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="swtittle">Star Wars Store</h1>
      <h2 className="text-center mb-5">Products</h2>
      <ProductList products={products} />
    </div>
  );
};

export default MainComponent;
