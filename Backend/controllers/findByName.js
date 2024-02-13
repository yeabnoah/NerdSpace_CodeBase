const User = require("../model/userModel");

const findByName = (req, res) => {
  const { name } = req.body;

  User.find({ name: name })
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

module.exports = findByName;
