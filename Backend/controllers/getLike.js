const Post = require("../model/postModel");

const getLike = (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(401).json({ message: "Invalid post ID" });
      }

      const likes = post.likes.map((like) => like._id);

      res.json({ likes });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the likes." });
    });
};

module.exports = getLike;
