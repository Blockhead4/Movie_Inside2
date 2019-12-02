const express = require("express");
const router = express.Router();

const firebase = require("firebase");
let database = firebase.database();

router.get("/", (req, res) => {
  console.log("user: ", req.user);
  if (req.user) {
    database.ref("users/" + req.user).on("value", snapshot => {
      console.log("---------------------------");
      console.log(snapshot.val());
      console.log("---------------------------");
      res.json(snapshot.val());
    });
  } else {
    console.log("user none");
    res.send(undefined);
  }
});

router.get("/profile", (req, res) => {
  res.send("user profile");
});

module.exports = router;
