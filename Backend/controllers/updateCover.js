const User = require("../model/userModel");

const updateCover = (req, res) => {
  const userId = req.user._id;

  let imageUrl = null;
  if (req.file) {
    imageUrl = req.file.path;
  }

  const updateData = {};
  if (req.file) updateData.coverImage = imageUrl;

  User.updateOne({ _id: userId }, { $set: updateData })
    .then(() => {
      console.log(updateData);
      res.json({ message: "cover updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = updateCover;

// https://i.ibb.co/19tM45B/photo-2023-12-11-11-33-44.jpg
