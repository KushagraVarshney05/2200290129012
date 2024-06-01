import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products?page=${currentPage}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <img
                src={`https://via.placeholder.com/300x200?text=Product+${index + 1}`}
                alt={`Product ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name_pro}</h3>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-yellow-500 mb-2">{product.rating} stars</p>
                <p className="text-green-600 mb-2">{product.discount}% off</p>
                <p className={product.availability === "yes" ? "text-green-600" : "text-red-600"}>
                  {product.availability === "yes" ? "Available" : "Out of stock"}
                </p>
                <Link
                  to={`/product/${product.id_products}`}
                  className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        <Link
          to="/top-products"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-600"
        >
          Filter Products
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
