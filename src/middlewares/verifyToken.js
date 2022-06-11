const jwt = require("jsonwebtoken");
const ApiError = require("../error/api-error");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) throw ApiError.unAuthorized("No token provided");

  const [_, bearerToken] = bearerHeader.split(" ");
  req.user = jwt.verify(bearerToken, process.env.JWT_SECRET);
  next();
}
module.exports = verifyToken;
