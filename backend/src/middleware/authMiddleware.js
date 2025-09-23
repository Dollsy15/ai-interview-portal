const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/User"); 

// Authenticate user middleware
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, jwtSecret);

    // Fetch user (excluding password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;