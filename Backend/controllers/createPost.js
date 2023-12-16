const Post = require("../model/postModel");

const createPost = (req, res) => {
  const { postText, ImageUrl } = req.body;

  if (!postText || postText === "") {
    return res.status(400).json({
      message: "Post content is required.",
    });
  }

  const newPost = new Post({
    user_id: req.user._id,
    content: postText,
    imageUrl: ImageUrl,
  });

  newPost
    .save()
    .then(() => {
      res.json({
        message: "Posted successfully",
        Image: ImageUrl,
        text: postText,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error occurred while saving the post.",
        error: error.message,
      });
    });
};

module.exports = createPost;
