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

const passport = require("./lib/passport")(app);
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth")(passport);

app.use(helmet());
// app.use(express.static("../build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session(config.sessionConfig));
app.use(flash());

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);

exports.app = functions.https.onRequest(app);
