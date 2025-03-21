import React, { useState, useEffect } from "react";
import axios from "axios";

function RiceListings() {
  const [riceProducts, setRiceProducts] = useState([]);

  useEffect(() => {
    const fetchRiceProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rice");
        setRiceProducts(response.data);
      } catch (error) {
        alert("Error fetching rice products");
      }
    };
    fetchRiceProducts();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item._id === product._id);

    if (productIndex === -1) {
      cart.push({ ...product, quantity: 1 });
    } else {
      cart[productIndex].quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Rice Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riceProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiceListings;
