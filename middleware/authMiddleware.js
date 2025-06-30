const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request
    console.log(decoded)
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admin privileges required." });
  }
};

module.exports = { authenticate, isAdmin };