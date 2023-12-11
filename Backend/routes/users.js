const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");
const authenticator = require("../middleware/authenticator");
const createPost = require("../controllers/createPost");
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
router.use(express.json());

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/auth/feed", authenticator, Feed);

router.get("/mock", MockFetch);

router.post("/auth/create", authenticator, createPost);

router.post("/auth/post/comment/:id", authenticator, comment);

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
