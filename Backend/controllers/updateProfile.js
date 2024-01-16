const User = require("../model/userModel");

const updateProfile = (req, res) => {
  const { name, phone_number, username, email, avatar_image, bio } = req.body;
  const userId = req.user._id;

  let imageUrl = null;
  if (req.file) {
    imageUrl = req.file.path;
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (phone_number) updateData.phone_number = phone_number;
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  // if (avatar_image) updateData.avatar_image = avatar_image;
  if (bio) updateData.bio = bio;
  if (req.file) updateData.avatar_image = req.file.path;

  User.updateOne({ _id: userId }, { $set: updateData })
    .then(() => {
      console.log(updateData);
      res.json({ message: "User updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = updateProfile;

// https://i.ibb.co/19tM45B/photo-2023-12-11-11-33-44.jpg
