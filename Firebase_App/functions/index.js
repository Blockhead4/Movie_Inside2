const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const flash = require("connect-flash");
const firebase = require("firebase");
const config = require("./config/config");

const app = express();
firebase.initializeApp(config.firebaseConfig);

app.use(helmet());
app.use(express.static("../build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session(config.sessionConfig));
app.use(flash());

let database = firebase.database();

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
// GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user.username);
});

passport.deserializeUser((id, done) => {
  console.log("---------------------------");
  console.log("deserializeUser come in!", id);
  console.log("---------------------------");
  // database.ref(`users/${id}`).on("value", snapshot => {
  //   let userInfo = snapshot.val();
  //   console.log("deserializeUser", userInfo);
  //   done(null, userInfo.username);
  // });
  done(null, id);
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: true,
      passReqToCallback: false
    },
    (username, password, done) => {
      console.log("LocalStrategy", username, password);
      let user;
      database.ref(`users/${username}`).on(
        "value",
        snapshot => {
          console.log("user input: \n", username, "/", password);
          console.log("user output: \n", snapshot.val());
          user = snapshot.val();
          if (user && user.password === password) {
            console.log("Welcome!");
            return done(null, user, {
              message: "Welcome!"
            });
          } else {
            console.log("Incorrect information!");
            return done(null, false, {
              message: "Incorrect user information"
            });
          }
        },
        err => {
          console.log("The read failed: " + err.code);
        }
      );
    }
  )
);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth")(passport);
const userRouter = require("./routes/user");
const movieInfoRouter = require("./routes/movieInfo");
const movieScoreRouter = require("./routes/movieScore");

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movieInfo", movieInfoRouter);
app.use("/api/movieScore", movieScoreRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

exports.app = functions.https.onRequest(app);
