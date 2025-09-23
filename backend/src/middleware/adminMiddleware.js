// ✅ Admin-only Access Middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ msg: "Access denied, admins only ❌" });
};

module.exports = adminMiddleware;
