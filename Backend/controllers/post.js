// const Post = require("../model/postModel");

// exports.createPost = async (req, res) => {
//   // const fullPath = `http://localhost:5000/`;
//   try {
//     const { content } = req.body;
//     const imageUrl = req.file.path;

//     console.log(req.file);
//     const post = new Post({
//       content,
//       imageUrl,
//       user_id: req.user._id,
//     });
//     await post.save();
//     res.status(201).json({ message: "Post created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const Post = require("../model/postModel");

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

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
