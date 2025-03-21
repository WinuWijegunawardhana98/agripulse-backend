const express = require("express");
const Order = require("../models/Order");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Place a New Order (Authenticated Users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, transportDate } = req.body;
    const userId = req.user.id; // Get user ID from token

    let totalPrice = 0;
    for (const item of items) {
      const rice = await Rice.findById(item.riceId);
      if (!rice) return res.status(404).json({ message: `Rice item not found: ${item.riceId}` });

      totalPrice += rice.price * item.quantity;
    }

    const newOrder = new Order({ user: userId, items, totalPrice, transportDate, status: "Pending" });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get All Orders (Admins Only)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email").populate("items.riceId", "riceType price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get User's Orders (Customers Only)
router.get("/:userId", authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.userId && req.user.role !== "order_manager") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.riceId", "riceType price");
    if (!orders.length) return res.status(404).json({ message: "No orders found" });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
