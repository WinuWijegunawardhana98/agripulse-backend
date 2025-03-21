import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-3">
                <div className="flex items-center">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-500 mx-2">x{item.quantity}</span>
                </div>
                <span className="text-gray-700">${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <h3 className="font-bold text-xl">Total: ${calculateTotal()}</h3>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
