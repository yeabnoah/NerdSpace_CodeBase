const Post = require("../model/postModel");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = req.file.path;
  const content = req.body.text;
  console.log("File uploaded to:", filePath);

  // res.json({
  //   message: "File uploaded successfully",
  //   path: filePath,
  //   name: req.file.filename,
  // });

  const newPost = new Post({
    user_id: req.user._id,
    content: content,
    imageUrl: filePath,
  });

  newPost
    .save()
    .then(() => {
      console.log("working");
      res.json({
        message: "Posted successfully",
        Image: filePath,
        text: content,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error occurred while saving the post.",
        error: error.message,
      });
    });
};

const all = {
  createPost,
  upload,
};

module.exports = all;
