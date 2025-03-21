const mongoose = require("mongoose");

const RiceSchema = new mongoose.Schema({
  packaging: { type: String, required: true }, // e.g., "5kg bag"
  riceType: { type: String, required: true }, // e.g., "Basmati"
  quantity: { type: Number, required: true }, // Available stock
  location: { type: String, required: true }, // e.g., "Warehouse A"
  price: { type: Number, required: true }, // Price per unit
  inStock: { type: Boolean, default: true }, // Availability status
  expiryDate: { type: Date, default: Date.now }, // Optional expiry tracking
});

const Rice = mongoose.model("Rice", RiceSchema);
module.exports = Rice;
