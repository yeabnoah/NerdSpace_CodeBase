const Post = require("../model/postModel");

const like = (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  Post.findById(postId).then((post) => {
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likes = post.likes;

    // Check if the user's _id already exists in the likes array
    const existingLikeIndex = likes.findIndex((user) =>
      user._id.equals(userId)
    );

    if (existingLikeIndex !== -1) {
      // If the user has already liked, remove the like
      console.log("u already liked the post ; removed it ...");
      likes.splice(existingLikeIndex, 1);

      // You might want to update your data model and save the post after modifying likes
      post
        .save()
        .then(() => {
          res.json({ message: "user removed the like successfully" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error saving like removal", error });
        });
    } else {
      // If the user hasn't liked the post, add the like
      likes.push({ _id: userId });

      // You might want to update your data model and save the post after modifying likes
      post
        .save()
        .then(() => {
          res.json({ message: "user liked the post successfully" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error saving like", error });
        });
    }
  });
};

module.exports = like;
