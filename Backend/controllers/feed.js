const Post = require("../model/postModel");
const User = require("../model/userModel");

const Feed = (req, res) => {
  Post.find()
    .then((result) => {
      const posts = result;

      const promises = posts.map((post) => {
        return User.findById(post.user_id);
      });

      Promise.all(promises)
        .then((users) => {
          const postsWithUsers = posts.map((post, index) => {
            return {
              ...post._doc,
              user: users[index],
            };
          });

          res.json(postsWithUsers);
        })
        .catch((error) => {
          console.error("Error retrieving users:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = Feed;
