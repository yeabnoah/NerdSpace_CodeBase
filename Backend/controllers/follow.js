const User = require("../model/userModel");
const { ObjectId } = require("mongodb");

// Function to remove an item from an array
const removeItem = (item, array) => {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

const follow = (req, res) => {
  const userId = req.params.id;
  const { userIdToken } = req.body;

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
          if (currentUser.following.includes(userId)) {
            // If already following, unfollow
            removeItem(userId, currentUser.following);
            console.log("Unfollowed user successfully");
          } else {
            // If not following, follow
            currentUser.following.push(userId);
            console.log("Followed user successfully");
          }

          // Update the followers array of the target user
          if (targetUser.followers.includes(userIdToken)) {
            // If already a follower, unfollow
            removeItem(userIdToken, targetUser.followers);
            console.log("Unfollowed user successfully");
          } else {
            // If not a follower, follow
            targetUser.followers.push(userIdToken);
          }

          // Save both users
          Promise.all([currentUser.save(), targetUser.save()])
            .then(() => {
              res.json({ message: "Successfully followed/unfollowed" });
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
