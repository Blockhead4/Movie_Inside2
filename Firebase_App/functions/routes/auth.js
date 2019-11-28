const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const firebase = require("firebase");
const firebaseConfig = require("../config/config");

const authRouter = () => {
  let database;
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  router.get("/", (req, res) => {
    res.json("Express Auth Management Page");
  });

  router.post(
    "/login_process",
    // passport.authenticate("local", {
    //   successRedirect: "/main",
    //   failureRedirect: "/login"
    // })
    (req, res) => {
      res.send("logined!");
    }
  );

  router.post("/register_process", (req, res) => {
    // console.log(req);
    let post = req.body;
    let username = post.username;
    let password = post.password;
    let users = database.ref("users/" + username);
    let isExist;
    const check = database
      .ref("users/" + username)
      .once("value")
      .then(data => {
        let isExist;
        if (data.val()) {
          isExist = true;
        } else {
          isExist = false;
        }
        return data.val();
      });

    console.log("test \n\n", check);
    if (users.once("value").val) {
      console.log("This username already exist!");
      req.flash("error", "This username already exist!");
    } else {
      let userInfo = {
        id: shortid.generate(),
        username: username,
        password: password
      };
      users.set(userInfo);
      console.log("\n maked!");
    }

    // req.login(users, err => {
    //   if (err) throw err;
    //   return res.redirect("/main");
    // });
  });

  router.get("/logout_process", (req, res) => {
    res.send("logout!");
    res.redirect("/");
  });

  return router;
};

module.exports = authRouter;
