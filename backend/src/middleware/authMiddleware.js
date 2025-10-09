const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded || !decoded.id)
      return res.status(401).json({ msg: "Token is invalid or expired" });

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    // If JWT expired, send specific message
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ msg: "Token expired, please login again" });

    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
