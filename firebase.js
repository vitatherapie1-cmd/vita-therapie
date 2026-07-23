 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBi9gkaORKVeuOglWP39wzmDVU5WcfCkP0",
    authDomain: "vita-therapie-f39b8.firebaseapp.com",
    databaseURL: "https://vita-therapie-f39b8-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "vita-therapie-f39b8",
    storageBucket: "vita-therapie-f39b8.firebasestorage.app",
    messagingSenderId: "677960319401",
    appId: "1:677960319401:web:c3fe32dd33f23c393944b8"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

window.db = db;
window.ref = ref;
window.push = push;
window.set = set;
window.get = get;
window.child = child;