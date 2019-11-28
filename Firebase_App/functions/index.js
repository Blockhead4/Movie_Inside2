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
// app.use(express.static("../build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session(config.sessionConfig));
app.use(flash());

const passport = require("./lib/passport")(app);
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
