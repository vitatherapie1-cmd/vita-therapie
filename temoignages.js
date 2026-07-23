import { ref, push } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const form = document.getElementById("reviewForm");

emailjs.init("Aa2u8ZQI1-ZvpfQ6e");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const commentaire = document.getElementById("commentaire").value.trim();

    const rating = document.querySelector('input[name="rating"]:checked');

    if (!nom || !email || !commentaire || !rating) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    try {

        // Enregistrer dans Firebase
        await push(ref(window.db, "temoignages"), {
            nom,
            email,
            commentaire,
            note: rating.value,
            date: new Date().toLocaleString()
        });

        // Envoyer l'email
        await emailjs.send(
            "vita_therapie",
            "template_36w5oke",
            {
                nom: nom,
                email: email,
                commentaire: commentaire,
                note: rating.value
            }
        );

        alert("Merci ! Votre témoignage a été envoyé.");

        form.reset();

    } catch (error) {
        console.error(error);
        alert(error.text || error.message || "Erreur lors de l'envoi.");
    }

});