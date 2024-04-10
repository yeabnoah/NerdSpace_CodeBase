const Post = require("../model/postModel");

const createPoster = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;

    console.log(req.file);
    const post = new Post({
      content,
      imageUrl,
      user_id: req.user._id,
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createPoster;
