const Post = require("../model/postModel");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");

const createPost = async (req, res) => {
  let ImageUrl;
  let postText;

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../uploads");

  const [fields, files] = await form.parse(req);

  const imageFile = files.imageFile;
  if (imageFile) {
    const myFile = imageFile[0];
    ImageUrl = myFile.filepath;
    postText = fields.content[0];
  }

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
