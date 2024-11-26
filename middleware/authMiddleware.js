const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json("Access Denied");

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified; // Attach user data to the request
    next();
  } catch (err) {
    res.status(400).json("Invalid Token");
  }
};

module.exports = verifyToken;
