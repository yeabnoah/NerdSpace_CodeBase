const express = require("express");
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/post");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

router.post("/", upload, postController.createPost);

module.exports = router;
