import * as firebase from "firebase";
import firebaseConfig from "./config";

let database;

export const fire = () => {
  // Initialize Firebase
  if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
  }
};

export const getFireDB = () => {
  const memoRef = database.ref("/").once("value");
  return memoRef;
};
