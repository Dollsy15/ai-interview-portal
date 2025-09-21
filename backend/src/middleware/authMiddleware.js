const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/User"); // 👈 DB se user fetch karne ke liye model import

const authMiddleware = async (req, res, next) => {
  try {
    // Token get from headers
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, jwtSecret);

    // Fetch user from DB and exclude password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Attach user object to request
    req.user = user;

    // Continue to next middleware/controller
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
