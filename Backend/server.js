const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;
<<<<<<< HEAD
=======
// const mongoPort = `${process.env.MONGO_URL}`;
>>>>>>> cf067979da976c096c7256df0f3a8248794b390b
const app = express();
const userRouter = require("./routes/users");
// const postRouter = require("./routes/Posts");
const cors = require("cors");

// app.use(express.static("public"));
app.use("/users", userRouter);
app.use(cors());
// app.use("/posts", postRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    console.log(`Database connected successfully`);
  });
});
