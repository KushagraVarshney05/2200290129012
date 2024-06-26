import React, { useState, useEffect } from "react";
import axios from "axios";

const TopProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyId: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    limit: "",
    page: "1",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/getProductsTop", {
        params: {
          companyId: formData.companyId,
          categoryId: formData.categoryId,
          minPrice: formData.minPrice,
          maxPrice: formData.maxPrice,
          limit: formData.limit,
          page: formData.page,
        },
      });
      setProducts(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Explore Top Products</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="companyId" className="block mb-1 text-gray-700">Enter Company ID:</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            placeholder="Company ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="categoryId" className="block mb-1 text-gray-700">Enter Category ID:</label>
          <input
            type="text"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="Category ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="minPrice" className="block mb-1 text-gray-700">Minimum Price:</label>
          <input
            type="text"
            id="minPrice"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            placeholder="Minimum Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block mb-1 text-gray-700">Maximum Price:</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            placeholder="Maximum Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="limit" className="block mb-1 text-gray-700">Limit:</label>
          <input
            type="text"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            placeholder="Limit"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Fetch Products
          </button>
        </div>
      </form>
      {loading && <div className="mt-8 text-center text-gray-800">Loading...</div>}
      {!loading && (
        <div className="mt-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <li key={product.id} className="border rounded-lg p-4 bg-gray-100">
                <p className="text-lg font-semibold text-gray-800">Title: {product.title}</p>
                <p className="text-gray-700">Rating: {product.rating}</p>
                <p className="text-gray-700">Price: {product.price}</p>
                <p className="text-gray-700">Categories: {product.categories}</p>
              </li>
            ))}
          </ul>
          {pagination && (
            <div className="mt-8 flex justify-between">
              <p className="text-gray-700">Total Records: {pagination.total_records}</p>
              <div className="space-x-4">
                {pagination.prev_page && (
                  <button
                    onClick={() =>
                      setFormData({ ...formData, page: pagination.prev_page })
                    }
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  >
                    Previous Page
                  </button>
                )}
                {pagination.next_page && (
                  <button
                    onClick={() =>
                      setFormData({ ...formData, page: pagination.next_page })
                    }
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  >
                    Next Page
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopProductsComponent;
