const express = require("express");
const Cart = require("../models/Cart");
const Rice = require("../models/Rice");

const router = express.Router();

// ✅ Add Rice to Cart
router.post("/", async (req, res) => {
  try {
    const { riceId, quantity } = req.body;

    // Fetch rice details from the Rice model
    const rice = await Rice.findById(riceId);
    if (!rice) return res.status(404).json({ message: "Rice not found" });

    const totalPrice = rice.price * quantity;
    
    // Create a new cart item
    const newCartItem = new Cart({ riceId, quantity, totalPrice });
    await newCartItem.save();

    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get All Cart Items
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("riceId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Update Cart Item
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    // Fetch cart item
    const cartItem = await Cart.findById(req.params.id).populate("riceId");
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    // Update the quantity and recalculate total price
    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.riceId.price * quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete Cart Item
router.delete("/:id", async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) return res.status(404).json({ message: "Cart item not found" });

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
