require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userID) => {
  const payload = { userId: userID }; // Create a plain object with the required payload

  const token = jwt.sign(payload, process.env.SECRETJWTKEY, {
    expiresIn: "100hr",
  });

  return token;
};

module.exports = generateToken;
