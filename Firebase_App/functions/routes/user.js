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
  console.log("user profile IN!!", req.user);
  database.ref(`users/${req.user}/profile`).on("value", snapshot => {
    console.log("---------------------------");
    console.log(snapshot.val());
    console.log("---------------------------");
    res.json(snapshot.val());
  });
});

router.post("/profile/:clickType", (req, res) => {
  console.log("Add user profile: ", req.user);
  console.log("path: ", req.path);
  let data = req.body;
  let profileRef = database.ref(`users/${req.user}` + req.path);
  profileRef.on("value", snapshot => {
    console.log("---------------------------");
    console.log(snapshot.val());
    console.log("---------------------------");
    if (snapshot.val()) {
      console.log("update: ", data);
      profileRef.update(data);
    } else {
      profileRef.set(data);
    }
  });
});

module.exports = router;
