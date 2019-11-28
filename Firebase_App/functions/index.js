const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const flash = require("connect-flash");

// ---------------connect firebase---------------------
// import * as firebase from "firebase";
// import firebaseConfig from "./config";

// let database;

// export const fire = () => {
//   // Initialize Firebase
//   if (!firebase.app.length) {
//     firebase.initializeApp(firebaseConfig);
//     database = firebase.database();
//   }
// };

// export const getFireDB = () => {
//   const memoRef = database.ref("/").once("value");
//   return memoRef;
// };
// ----------------------------------------------------

const app = express();

// const passport = require("./lib/passport")(app);
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth")();

app.use(helmet());
// app.use(express.static("../build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(
  session({
    // HttpOnly: true,
    // secure: false, // true로 설정하면 SereializeUser로 세션에 passport.user 객체가 생성되지 않음
    secret: "asdfasef21212@#@!#",
    resave: false,
    saveUninitialized: true
    // store: new FileStore()
  })
);
app.use(flash());

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);

exports.app = functions.https.onRequest(app);
