const User = require("../model/userModel");

const following = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .populate("following")
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found / Token expired" });
      }

      const followingList = user.following.map((followedUser) => ({
        _id: followedUser._id,
        username: followedUser.username,
      }));

      res.json({ myFollowingList: followingList });
    })
    .catch((error) => {
      res.status(500).json({
        error: "An error occurred while retrieving the following list.",
      });
    });
};

module.exports = following;
