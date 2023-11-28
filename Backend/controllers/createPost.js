const Post = require("../model/postModel");

const createPost = (req, res) => {
  const { postText, ImageUrl } = req.body;
  const newPost = new Post({
    user_id: req.user._id,
    content: postText,
    imageUrl: ImageUrl,
  });

  newPost.save().then(() => {
    res.json({
      message: "posted successfully",
      Image: ImageUrl,
      text: postText,
    });
  });
};

module.exports = createPost;
