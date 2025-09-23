// Admin-only middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ msg: "Access denied, admins only" });
  }
};

module.exports = adminMiddleware;
