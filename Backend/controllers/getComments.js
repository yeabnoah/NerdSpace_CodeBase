const User = require("../model/userModel");
const Post = require("../model/postModel");

const getComment = (req, res) => {
  const postId = req.params.id;

  Post.findById(postId).then((post) => {
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = post.comments;
    const commentData = [];

    comments.forEach((singleComment) => {
      const comment = {
        content: singleComment.content,
        user_id: singleComment.user_id,
      };

      commentData.push(comment);
    });

    res.json(commentData);
  });
};

module.exports = getComment;
