const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer who placed the order
  items: [
    {
      riceId: { type: mongoose.Schema.Types.ObjectId, ref: "Rice", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered"], default: "Pending" },
  orderDate: { type: Date, default: Date.now },
  transportDate: { type: Date },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
