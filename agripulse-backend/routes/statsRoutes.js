const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const Order = require("../models/Order");
const Rice = require("../models/Rice");

const router = express.Router(); // ✅ Make sure this is included!

// ✅ Profit/Loss Calculation
router.get("/profit-loss", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.riceId", "riceType price quantity");

    let totalRevenue = 0;
    let totalCost = 0;

    orders.forEach(order => {
      order.items.forEach(item => {
        const rice = item.riceId;
        const revenue = rice.price * item.quantity;
        const cost = (rice.price * 0.8) * item.quantity; // Assuming 80% of price as cost

        totalRevenue += revenue;
        totalCost += cost;
      });
    });

    const profit = totalRevenue - totalCost;
    
    res.json({ totalRevenue, totalCost, profit });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Generate PDF Report for Rice Listings
router.get("/download-pdf", async (req, res) => {
  try {
    const riceList = await Rice.find();

    // Create a PDF document
    const doc = new PDFDocument();
    const fileName = "rice_list.pdf";
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Rice Listings Report", { align: "center" });
    doc.moveDown();

    riceList.forEach((rice, index) => {
      doc.fontSize(12).text(
        `${index + 1}. Type: ${rice.riceType} | Packaging: ${rice.packaging} | Price: $${rice.price} | Stock: ${rice.quantity} | Location: ${rice.location}`
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router; // ✅ Make sure to export the router!
