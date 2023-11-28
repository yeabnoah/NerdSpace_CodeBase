const User = require("../model/userModel");

const updateProfile = (req, res) => {
  const { name, phone_number, username, email, avatar_image, bio } = req.body;
  const userId = req.user._id;

  const updateData = {};
  if (name) updateData.name = name;
  if (phone_number) updateData.phone_number = phone_number;
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (avatar_image) updateData.avatar_image = avatar_image;
  if (bio) updateData.bio = bio;

  User.updateOne({ _id: userId }, { $set: updateData })
    .then(() => {
      res.json({ message: "User updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = updateProfile;
