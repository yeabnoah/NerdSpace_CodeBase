const Post = require("../model/postModel");

const like = (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(401).json("Post not found");
      }

      const likes = post.likes;
      likes.push(userId);

      post.likes = likes;

      return post.save();
    })
    .then(() => {
      return res.json({
        Liked_successfully: userId,
        message: "data successfully sent to the user",
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json("Internal server error");
    });
};

module.exports = like;
