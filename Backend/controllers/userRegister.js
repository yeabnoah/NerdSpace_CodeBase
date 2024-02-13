const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");

const userRegister = (req, res) => {
  const { name, username, password, phoneNo, nerd } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      User.findOne({
        $or: [{ phone_number: phoneNo }, { username: username }],
      })
        .then((result) => {
          if (!result) {
            const newUser = new User({
              name: name,
              phone_number: phoneNo,
              username: username,
              password: hashedPassword,
              nerd: nerd,
              coverImage: `uploads\\assets\\cover-placeholder.jpg`,
              avatar_image: `uploads\\assets\\avatar.png`,
            });
            newUser.save().then(() => {
              const token = generateToken(newUser._id);
              res.status(201).json(token);

              console.log("User added successfully");
            });
          } else {
            console.log("User already exists");
            res.status(409).send("User already exists");
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("An error occurred");
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
};

module.exports = userRegister;
