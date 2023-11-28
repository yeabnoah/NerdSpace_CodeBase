const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");

const userLogin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((result) => {
      if (!result) {
        res.send("You are not registered");
      } else {
        bcrypt.compare(password, result.password).then((isMatch) => {
          if (isMatch) {
            const token = generateToken(result._id);

            res.json({ token, message: "You are successfully logged in" });
          } else {
            res.send("Incorrect password");
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
};

module.exports = userLogin;
