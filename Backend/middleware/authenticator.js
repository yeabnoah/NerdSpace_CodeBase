require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ "user not logged in": "No token provided" });
  }

  jwt.verify(token, process.env.SECRETJWTKEY, (err, verified) => {
    if (err) {
      return res.status(401).json({ mssg: "invalid token" });
    }
897
    const userId = verified.userId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "User not found" });
        }

        req.user = user;

        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });
  });
};

module.exports = authenticator;
