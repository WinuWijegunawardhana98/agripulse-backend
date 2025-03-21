const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified; // Attach user details to request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ✅ Middleware to Restrict Access to Order Managers (Admins)
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "order_manager") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
