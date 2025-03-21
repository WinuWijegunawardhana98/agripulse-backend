const express = require("express");
const Rice = require("../models/Rice");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Add a New Rice Listing (Admin Only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { packaging, riceType, quantity, location, price } = req.body;

    const newRice = new Rice({ packaging, riceType, quantity, location, price });
    await newRice.save();

    res.status(201).json(newRice);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Update a Rice Listing (Admin Only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { packaging, riceType, quantity, location, price } = req.body;
    const updatedRice = await Rice.findByIdAndUpdate(
      req.params.id,
      { packaging, riceType, quantity, location, price },
      { new: true }
    );

    if (!updatedRice) return res.status(404).json({ message: "Rice not found" });

    res.json(updatedRice);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete a Rice Listing (Admin Only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedRice = await Rice.findByIdAndDelete(req.params.id);
    if (!deletedRice) return res.status(404).json({ message: "Rice not found" });

    res.json({ message: "Rice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
