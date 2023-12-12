const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;
const mongoPort = "mongodb://127.0.0.1:27017/NerdSpace";
const app = express();
const userRouter = require("./routes/users");
const postRouter = require("./routes/Posts");
const cors = require("cors");

app.use("/users", userRouter);
app.use(cors());
// app.use("/posts", postRouter);

mongoose.connect(mongoPort).then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(`Database connected successfully`);
  });
});
