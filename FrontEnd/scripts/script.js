const reponse = await fetch("http://localhost:5678/api/works");
const travaux = await reponse.json();
genererTravaux(travaux);

const buttons = document.querySelectorAll('.btn-filter');

function genererTravaux(data) {
    const sectionTravaux = document.querySelector(".gallery");
    sectionTravaux.innerHTML = ""; 

    for (let i = 0; i < data.length; i++) {
        const article = data[i];

        const travauxContenant = document.createElement("figure");

        const imageTravaux = document.createElement("img");
        imageTravaux.src = article.imageUrl;

        const titreTravaux = document.createElement("figcaption");
        titreTravaux.innerText = article.title;

        travauxContenant.appendChild(imageTravaux);
        travauxContenant.appendChild(titreTravaux);

        sectionTravaux.appendChild(travauxContenant);
    }
}

function deselectionnerTousLesBoutons() {
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
}

buttons.forEach(button => {
    button.addEventListener("click", function () {
        deselectionnerTousLesBoutons(); // Désélectionner tous les boutons
        button.classList.add('selected'); // Appliquer la classe 'selected' au bouton cliqué

        if (button.id === 'btnTous') {
            genererTravaux(travaux); // Afficher tous les projets
        } else if (button.id === 'btnObjets') {
            const categorieObjets = travaux.filter(travail => travail.categoryId === 1);
            genererTravaux(categorieObjets); // Filtrer et afficher les projets de la catégorie 1
        } else if (button.id === 'btnAppartements') {
            const categorieAppartements = travaux.filter(travail => travail.categoryId === 2);
            genererTravaux(categorieAppartements); // Filtrer et afficher les projets de la catégorie 2
        } else if (button.id === 'btnHotelRestaurants') {
            const categorieHotelRestaurants = travaux.filter(travail => travail.categoryId === 3);
            genererTravaux(categorieHotelRestaurants); // Filtrer et afficher les projets de la catégorie 3
        }
        // Ajoutez des conditions pour les autres boutons si nécessaire
    });
});

// function validerFormulaire(event) {
//     event.preventDefault(); // Empêche l'envoi du formulaire par défaut

//     const email = document.getElementById("email").value;
//     const motDePasse = document.getElementById("password").value;

//     if (email === "" || motDePasse === "") {
//         alert("Veuillez remplir tous les champs.");
//     } else if (email === "sophie.bluel@test.tld" && motDePasse === "S0phie") {
//         alert("Connexion réussie !");
//         window.location.href = "index.html";
//     } else {
//         alert("Identifiant ou mot de passe incorrect.");
//     }
// }

// const formLogin = document.getElementById("loginForm");

// formLogin.addEventListener("submit", validerFormulaire);

// Function to handle form submission

async function validerFormulaire(event) {
    event.preventDefault(); // Prevents the default form submission

    const email = document.getElementById("email").value;
    const motDePasse = document.getElementById("password").value;

    if (email === "" || motDePasse === "") {
        alert("Veuillez remplir tous les champs.");
    } else {
        // Make a POST request to the login endpoint
        try {
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: motDePasse })
            });

            if (response.ok) {
                alert("Connexion réussie !");
                window.location.href = "index.html";
            } else {
                alert("Identifiant ou mot de passe incorrect.");
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            alert("Erreur lors de la tentative de connexion.");
        }
    }
}

// Event listener for form submission
const formLogin = document.getElementById("loginForm");
formLogin.addEventListener("submit", validerFormulaire);