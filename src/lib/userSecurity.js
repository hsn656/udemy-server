const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function isPasswordValid(password, user) {
  return await bcrypt.compare(password, user.password);
}

async function generateToken(user) {
  const payload = {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
    image: user.image,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
}

module.exports = {
  hashPassword,
  isPasswordValid,
  generateToken,
};
