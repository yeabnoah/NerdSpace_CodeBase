const User = require("../model/userModel");
const Post = require("../model/postModel");

const getComment = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = post.comments;

    const commentData = await Promise.all(
      comments.map(async (singleComment) => {
        const user = await User.findById(singleComment.user_id);
        return {
          content: singleComment.content,
          user_id: singleComment.user_id,
          _id: singleComment._id,
          userImage: user ? user.avatar_image : null,
          username: user.username,
        };
      })
    );

    res.json(commentData);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getComment;
