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
        deselectionnerTousLesBoutons(); 
        button.classList.add('selected'); 

        if (button.id === 'btnTous') {
            genererTravaux(travaux); 
        } else if (button.id === 'btnObjets') {
            const categorieObjets = travaux.filter(travail => travail.categoryId === 1);
            genererTravaux(categorieObjets); 
        } else if (button.id === 'btnAppartements') {
            const categorieAppartements = travaux.filter(travail => travail.categoryId === 2);
            genererTravaux(categorieAppartements); 
        } else if (button.id === 'btnHotelRestaurants') {
            const categorieHotelRestaurants = travaux.filter(travail => travail.categoryId === 3);
            genererTravaux(categorieHotelRestaurants); 
        }
        
    });
});

