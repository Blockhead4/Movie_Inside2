const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user");
});

router.get("/profile", (req, res) => {
  res.send("user profile");
});

module.exports = router;