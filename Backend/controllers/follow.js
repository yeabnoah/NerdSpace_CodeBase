const User = require("../model/userModel");
const { ObjectId } = require("mongodb");

const follow = (req, res) => {
  const { userId } = req.body;
  const userIdToken = req.user._id;
  console.log(userIdToken);

  User.findById(userIdToken)
    .then((currentUser) => {
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      User.findById(userId)
        .then((targetUser) => {
          if (!targetUser) {
            return res.status(404).json({ error: "Target user not found" });
          }

          // Update the following array of the current user
          currentUser.following.push(userId);

          // Update the followers array of the target user
          targetUser.followers.push(userIdToken);

          // Save both user documents
          Promise.all([currentUser.save(), targetUser.save()])
            .then(() => {
              res.json({ message: "Successfully followed user" });
            })
            .catch((error) => {
              console.error("Error saving user documents:", error);
              res.status(500).json({ error: "Internal Server Error" });
            });
        })
        .catch((error) => {
          console.error("Error finding target user:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error finding current user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = follow;
