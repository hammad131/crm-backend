// config/firebase.js
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCONZIEB-c5WX0FQDXr8aE5fIcrVR8N2ho",
    authDomain: "tender-system-dd945.firebaseapp.com",
    projectId: "tender-system-dd945",
    storageBucket: "tender-system-dd945.firebasestorage.app",
    messagingSenderId: "219702829023",
    appId: "1:219702829023:web:eb5b58d2d45ebac9ea2e6a"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage, ref, uploadBytes, getDownloadURL };