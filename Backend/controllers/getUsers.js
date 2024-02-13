const User = require("../model/userModel");

const getUsers = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }

      const profileData = {
        userId: req.params.id,
        name: userData.name,
        username: userData.username,
        phoneNumber: userData.phone_number,
        avatarImage: userData.avatar_image,
        bio: userData.bio,
        joinedOn: userData.created_at,
        followers: userData.followers.length,
        following: userData.following.length,
        coverImage: userData.coverImage,
        email: userData.email,
        nerd: userData.nerd,
      };

      res.json({ message: "user Found", data: profileData });
    })
    .catch((error) => {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = getUsers;
