import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in first");
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (error) {
        alert("Error fetching order details");
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order #{order._id}</h2>
      <p className="text-lg text-gray-600 mb-4">Status: <span className="font-semibold">{order.status}</span></p>
      <h3 className="text-xl font-semibold mb-2">Items:</h3>
      <ul className="space-y-3">
        {order.items.map((item) => (
          <li key={item._id} className="flex justify-between items-center">
            <span className="font-semibold">{item.name}</span>
            <span>{item.quantity} x ${item.price}</span>
          </li>
        ))}
      </ul>
      <h3 className="mt-4 font-bold text-xl">Total: ${order.totalPrice}</h3>
    </div>
  );
}

export default OrderDetails;
