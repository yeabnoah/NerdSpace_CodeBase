const express = require("express");
const router = express.Router();
const User = require("./model/userModel");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const authenticator = require("../middleware/authenticator");
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
const all = require("../controllers/createPost");

const app = express();

app.use(express.json());

const upload = all.upload;
const createPost = all.createPost;

app.post("/register", userRegister);

app.post("/login", userLogin);

app.get("/auth/feed", authenticator, Feed);

app.get("/auth/user/:id", authenticator, GetUser);

app.post("/auth/create", authenticator, upload.single("image"), createPost);

app.post("/auth/post/comment/:id", authenticator, comment);

app.post("/auth/post/like/:id", authenticator, like);

app.get("/auth/post/like/:id", authenticator, getLike);

app.get("/auth/profile", authenticator, getProfile);

app.post("/auth/post/save/:id", authenticator, savePost);

app.get("/auth/post/comment/:id", authenticator, getComment);

app.post("/auth/profile", authenticator, updateProfile);

app.post("/auth/follow", authenticator, follow);

app.get("/auth/followers/:id", authenticator, myFollowers);

app.get("/auth/following/:id", authenticator, following);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
