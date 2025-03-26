import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-lg font-semibold">₹{product.price}</p>
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover mt-4" />
    </div>
  );
};

export default ProductDetails;
