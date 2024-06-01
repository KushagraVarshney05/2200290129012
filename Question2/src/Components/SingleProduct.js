import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {product && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">{product.name_pro}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img src={`https://via.placeholder.com/400x300?text=${product.name_pro}`} alt={product.name_pro} className="w-full h-auto mb-4" />
                <p className="text-lg font-medium mb-2">Price: ${product.price.toFixed(2)}</p>
                <p className="text-lg font-medium mb-2">Discount: {product.discount}%</p>
                <p className="text-lg font-medium mb-2">Rating: {"★".repeat(product.rating)}</p>
              </div>
              <div>
                <p className="text-lg font-medium mb-2">Product ID: {product.id_products}</p>
                <p className="text-lg font-medium mb-2">Category: {product.category_name}</p>
                <p className="text-lg font-medium mb-2">Company: {product.company_name}</p>
                <p className="text-lg font-medium mb-2">Availability: {product.availability === "yes" ? "Available" : "Out of stock"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
