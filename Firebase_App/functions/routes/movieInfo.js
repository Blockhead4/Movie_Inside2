const express = require("express");
const router = express.Router();

const firebase = require("firebase");

let database;
database = firebase.database();

router.get("/:searchInfo", (req, res) => {
  let searchRef = database.ref("movieData/movieInfo");
  let searchInfo = req.params.searchInfo;
  console.log(searchInfo);
  searchRef
    .orderByChild("movieNm")
    .startAt(searchInfo)
    .endAt(`${searchInfo}\uf8ff`)
    .on("value", snapshot => {
      res.json(Object.values(snapshot.val()));
    });
});

// router.get("/:searchInfo", (req, res) => {
//   database
//     .ref("movieData/movieInfo/" + req.params.searchInfo)
//     .on("value", snapshot => {
//       res.json([snapshot.val()]);
//     });
// });

module.exports = router;
