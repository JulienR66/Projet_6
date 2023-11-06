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


// const boutonTous = document.getElementById("btnTous");
// boutonTous.addEventListener("click", function () {
//     genererTravaux(travaux);
//     deselectionnerTousLesBoutons(); // Désélectionner tous les boutons
//     button.classList.add('selected'); // Appliquer la classe 'selected' au bouton cliqué
// });

// const boutonObjets = document.getElementById("btnObjets");
// boutonObjets.addEventListener("click", function () {
//     const categorieObjets = travaux.filter(travail => travail.categoryId === 1);
//     genererTravaux(categorieObjets);
//     deselectionnerTousLesBoutons(); // Désélectionner tous les boutons
//     button.classList.add('selected'); // Appliquer la classe 'selected' au bouton cliqué
// });

// const boutonAppartements = document.getElementById("btnAppartements");
// boutonAppartements.addEventListener("click", function () {
//     const categorieAppartements = travaux.filter(travail => travail.categoryId === 2);
//     genererTravaux(categorieAppartements);
//     deselectionnerTousLesBoutons(); // Désélectionner tous les boutons
//     button.classList.add('selected'); // Appliquer la classe 'selected' au bouton cliqué
// })

// const boutonHotelRestaurants = document.getElementById("btnHotelRestaurants");
// boutonHotelRestaurants.addEventListener("click", function () {
//     const categorieHotelRestaurants = travaux.filter(travail => travail.categoryId === 3);
//     genererTravaux(categorieHotelRestaurants);
//     deselectionnerTousLesBoutons(); // Désélectionner tous les boutons
//     button.classList.add('selected'); // Appliquer la classe 'selected' au bouton cliqué
// })