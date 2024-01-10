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
const GetUser = require("../controllers/GetUser");
const all = require("../controllers/createPost");
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/post");
const GetAllMyPosts = require("../controllers/GetAllMyPosts");
// const imagePath = require("../uploads/data");

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

router.post("/register", userRegister);

// test api route for the uploading the image file

router.use("/uploads", express.static("uploads"));

router.post("/login", userLogin);

router.get("/auth/feed", authenticator, Feed);

router.get("/auth/user/:id", authenticator, GetUser);

router.post("/auth/create", authenticator, upload, postController.createPost);

router.post("/auth/post/comment/:id", authenticator, comment);

router.get("/auth/post/comment/:id", authenticator, GetAllMyPosts);

router.post("/auth/post/like/:id", authenticator, like);

router.get("/auth/post/like/:id", authenticator, getLike);

router.get("/auth/profile", authenticator, getProfile);

router.post("/auth/post/save/:id", authenticator, savePost);

router.get("/auth/post/comment/:id", authenticator, getComment);

router.post("/auth/profile", authenticator, updateProfile);

router.post("/auth/follow", authenticator, follow);

router.get("/auth/followers", authenticator, myFollowers);

router.get("/auth/following", authenticator, following);
module.exports = router;
