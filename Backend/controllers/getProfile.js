const User = require("../model/userModel");
const Post = require("../model/postModel");

const getProfile = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }

      const profileData = {
        userId: req.user._id,
        name: userData.name,
        username: userData.username,
        phoneNumber: userData.phone_number,
        avatarImage: userData.avatar_image,
        bio: userData.bio,
        joinedOn: userData.created_at,
        followers: userData.followers.length,
        following: userData.following.length,
      };

      res.json(profileData);
    })
    .catch((error) => {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = getProfile;
