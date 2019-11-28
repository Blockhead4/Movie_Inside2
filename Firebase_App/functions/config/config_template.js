exports.firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

exports.sessionConfig = {
  HttpOnly: "",
  secure: "", // true로 설정하면 SereializeUser로 세션에 passport.user 객체가 생성되지 않음
  secret: "",
  resave: "",
  saveUninitialized: "",
  store: ""
};
