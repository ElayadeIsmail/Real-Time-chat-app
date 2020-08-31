const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No Token, Not Authorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token Not Valid" });
  }
};
