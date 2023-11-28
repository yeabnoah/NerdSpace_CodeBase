const Post = require("../model/postModel");

const comment = (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const userId = req.user._id;

  Post.findById(postId).then((postData) => {
    if (!postData) {
      return res.status(401).json("Post not found");
    }

    const newComment = {
      user_id: userId,
      post_id: postId,
      content: content,
    };

    postData.comments.push(newComment);

    postData.save().then(() => res.json("Commented successfully"));
  });
};

module.exports = comment;
