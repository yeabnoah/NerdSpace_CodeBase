// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/post");

// Setting up the app
const app = express();
app.use(express.json());

// Setting up the database
mongoose.connect("mongodb://127.0.0.1:27017/myapp");

// Setting up the routes
app.use("/api/posts", postRouter);

// Starting the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
