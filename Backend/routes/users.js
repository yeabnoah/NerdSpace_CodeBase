const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");
const authenticator = require("../middleware/authenticator");
// const createPost = require("../controllers/createPost");
const getProfile = require("../controllers/getProfile");
const Feed = require("../controllers/feed");
const updateProfile = require("../controllers/updateProfile");
const follow = require("../controllers/follow");
const comment = require("../controllers/comment");
const getComment = require("../controllers/getComments");
const like = require("../controllers/like");
const savePost = require("../controllers/savePost");
const getLike = require("../controllers/getLike");
const myFollowers = require("../controllers/myFollowers");
const following = require("../controllers/following");
const MockFetch = require("../controllers/MockFetch");
const all = require("../controllers/createPost");
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/post");
const GetAllMyPosts = require("../controllers/GetAllMyPosts");
const updateCover = require("../controllers/updateCover");
const getUsers = require("../controllers/getUsers");

router.use(express.json());

const storage = multer.diskStorage({
  destination: "uploads/",
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

// const multipleFilesUpload = (fields) => {
//   return upload.fields(fields);
// };

// const singleFileUpload = (fieldName) => {
//   return upload.single(fieldName);
// };

// const mid = () => {
//   if (avatar_image && coverImage) {
//     multipleFilesUpload([
//       { avatar_image: "avatar_image" },
//       { coverImage: "coverImage" },
//     ]);
//   } else if (avatar_image) {
//     singleFileUpload("avatar_image");
//   } else if (coverImage) {
//     singleFileUpload("coverImage");
//   }
// };

// this handles only single file

const upload2 = multer({
  storage: storage,
}).single("coverImage");

const upload4 = multer({
  storage: storage,
}).single("avatar_image");

router.post("/register", userRegister);

// test api route for the uploading the image file

router.use("/uploads", express.static("uploads"));

router.post("/login", userLogin);

router.get("/auth/feed", authenticator, Feed);

router.get("/auth/profile/user/:id", authenticator, getUsers);

router.get("/auth/profile/", authenticator, getProfile);

router.post("/auth/create", authenticator, upload, postController.createPost);

router.post("/auth/post/comment/:id", authenticator, comment);

router.get("/auth/post/:id", authenticator, GetAllMyPosts);

router.post("/auth/post/like/:id", authenticator, like);

router.get("/auth/post/like/:id", authenticator, getLike);



router.post("/auth/post/save/:id", authenticator, savePost);

router.get("/auth/post/comment/:id", authenticator, getComment);

router.post("/auth/profile/", authenticator, upload4, updateProfile);

router.post("/auth/profile/cover", authenticator, upload2, updateCover);

router.post("/auth/follow/:id", authenticator, follow);

router.get("/auth/followers", authenticator, myFollowers);

router.get("/auth/following", authenticator, following);
module.exports = router;
