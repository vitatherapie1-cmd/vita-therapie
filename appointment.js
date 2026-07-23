import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwDdKPXXTEUNO1NrWj37UTmhbUnXPtfsQ",
  authDomain: "vita-therapie.firebaseapp.com",
  databaseURL: "https://vita-therapie-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vita-therapie",
  storageBucket: "vita-therapie.firebasestorage.app",
  messagingSenderId: "449100672399",
  appId: "1:449100672399:web:a41026a25580952a9f2ffa"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nom = document.querySelector('input[name="Nom"]').value;
    const telephone = document.querySelector('input[name="Téléphone"]').value;
    const email = document.querySelector('input[name="Email"]').value;
    const service = document.querySelector('select[name="Service"]').value;
    const date = document.querySelector('input[name="Date"]').value;
    const heure = document.querySelector('input[name="Heure"]').value;
    const message = document.querySelector('textarea[name="Message"]').value;

const dbRef = ref(db);

get(child(dbRef, "appointments"))
.then((snapshot) => {

    let reserve = false;

    if (snapshot.exists()) {

        snapshot.forEach((item) => {

            const rdv = item.val();

            if (rdv.date === date && rdv.heure === heure) {

                reserve = true;

            }

        });

    }

    if (reserve) {

        alert("❌ Cette heure est déjà réservée.");

        return;

    }

    push(ref(db, "appointments"), {

        nom,
        telephone,
        email,
        service,
        date,
        heure,
        message,
        createdAt: Date.now()

    })
    .then(() => {

        alert("✅ Rendez-vous enregistré avec succès.");

        form.reset();

    })
    .catch((error) => {

        alert(error.message);

    });

});