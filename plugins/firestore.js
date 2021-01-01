import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyD8KnzsyO26S4HyYMFSQIwpZ-94lty8H3k",
    authDomain: "nuxt-news-feed-22aa0.firebaseapp.com",
    projectId: "nuxt-news-feed-22aa0",
    storageBucket: "nuxt-news-feed-22aa0.appspot.com",
    messagingSenderId: "160778452758",
    appId: "1:160778452758:web:ffd05c7fb47f13f54c1a37",
    measurementId: "G-9GW0V451H4"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}

const db = firebase.firestore();

export default db;
