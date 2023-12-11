const express = require("express");
const router = express.Router();

router.post("/createpost", (req, res) => {});

router.get("/posts", (req, res) => {});

router.get("/", (req, res) => {
  res.json({ message: "this is a posts api" });
});

// router.post('')

module.exports = router;
