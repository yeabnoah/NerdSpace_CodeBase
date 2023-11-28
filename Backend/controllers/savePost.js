const User = require("../model/userModel");

const savePost = (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(401).json("Invalid Token");
      }

      user.savedPosts.push(postId);

      user
        .save()
        .then(() => {
          res.json({ message: "saved successfully" });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ error: "An error occurred while saving the post." });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while finding the user." });
    });
};

module.exports = savePost;
