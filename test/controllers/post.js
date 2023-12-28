const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const imageUrl = req.file.path;
    const post = new Post({ content, imageUrl });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
