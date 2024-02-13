const User = require("../model/userModel");

const findByUserName = (req, res) => {
  const { username } = req.body;

  User.find({ username: username })
    .then((response) => {
      res.json({
        message: "user Found",
        userData: response,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = findByUserName;
