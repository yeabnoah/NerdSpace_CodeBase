const User = require("../model/userModel");

const myFollowers = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .populate("followers")
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found / Token expired" });
      }

      const myFollowersList = user.followers.map((followerUser) => ({
        _id: followerUser._id,
        username: followerUser.username,
      }));

      res.json({ followersList: myFollowersList });
    })
    .catch((error) => {
      res.status(500).json({
        error: "An error occurred while retrieving the followers list.",
      });
    });
};

module.exports = myFollowers;
