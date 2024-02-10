const Post = require("../model/postModel");

const GetAllMyPosts = (req, res) => {
  const userId = req.params.id;

  Post.find({ user_id: userId })
    .then((response) => {
      console.log(response);
      // Log the entire response to see the structure
      res.status(200).json({ message: "congrats", data: response });
    })
    .catch((error) => {
      console.error(error); // Log any errors that occurred
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = GetAllMyPosts;
