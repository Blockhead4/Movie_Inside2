const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const firebase = require("firebase");

const authRouter = passport => {
  let database = firebase.database();

  router.get("/", (req, res) => {
    // console.log("--------------------------");
    // console.log(req.session);
    // console.log(req.user);
    // console.log("--------------------------");
    res.send("Express Auth Management Page");
  });

  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );

  router.post("/register_process", (req, res) => {
    let post = req.body;
    let username = post.username;
    let password = post.password;
    let userRef = database.ref("users/" + username);
    let userInfo;
    const check = () =>
      userRef.once("value").then(
        snapshot => {
          if (snapshot.val()) {
            console.log("This username already exist!");
            req.flash("error", "This username already exist!");
            res.end();
          } else {
            let userInfo = {
              id: shortid.generate(),
              username: username,
              password: password
            };
            userRef.set(userInfo);
            console.log("\n maked!");
            req.login(userInfo, err => {
              if (err) throw err;
              return res.redirect("/");
            });
          }
          return;
        },
        err => {
          console.log(err);
        }
      );

    check();

    // req.login(userInfo, err => {
    //   if (err) throw err;
    //   console.log("login!~!!!\n\n", userInfo);
    //   return res.redirect("/main");
    // });
  });

  router.get("/logout_process", (req, res) => {
    req.logout();
    req.session.save(() => {
      res.redirect("/");
    });
  });

  return router;
};

module.exports = authRouter;
