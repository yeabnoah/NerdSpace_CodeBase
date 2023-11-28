const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  time_stamp: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user_id: mongoose.Schema.Types.ObjectId,
      post_id: mongoose.Schema.Types.ObjectId,
    },
  ],
  comments: [
    {
      user_id: mongoose.Schema.Types.ObjectId,
      post_id: mongoose.Schema.Types.ObjectId,
      content: String,
      time_stamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
