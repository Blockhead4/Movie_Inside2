const express = require("express");
const router = express.Router();

const firebase = require("firebase");
let database = firebase.database();

router.get("/:searchInfo", (req, res) => {
  let searchInfo = req.params.searchInfo;
  let searchRef = database.ref("movieData/movieScore/" + searchInfo);
  console.log(searchInfo);
  searchRef.on("value", snapshot => {
    res.json([snapshot.val()]);
  });
});

module.exports = router;
