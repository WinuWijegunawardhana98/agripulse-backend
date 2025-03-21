const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  riceId: { type: mongoose.Schema.Types.ObjectId, ref: "Rice", required: true },
  quantity: { type: Number, required: true }, // Number of items in the cart
  totalPrice: { type: Number, required: true }, // Total price for the quantity
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
