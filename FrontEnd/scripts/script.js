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

const btnLogIn = document.getElementById("btnLogin");

btnLogIn.addEventListener('click', function() {
    window.location.href = 'login.html';
    localStorage.clear();
})

const modalBtn = document.querySelector('.btn-open-modal');
modalBtn.style.display = 'none';

const userId = parseInt (localStorage.getItem('userId'));
const token = localStorage.getItem('token');
const connexion = parseInt (localStorage.getItem('response'));


if (connexion === 200) {
    btnLogIn.innerText = 'logout';
}

if (userId === 1) {
    const boutons = document.querySelectorAll('.btn-filter');
    modalBtn.style.display = '';
    boutons.forEach(bouton => {
        bouton.style.display = 'none';
    });
}

function genererTravauxModal(data) {
    const sectionTravaux = document.querySelector(".work-preview");
    sectionTravaux.innerHTML = ""; 

    for (let i = 0; i < data.length; i++) {
        const article = data[i];

        const travauxContainer = document.createElement("div");

        const imageTravaux = document.createElement("img");
        imageTravaux.src = article.imageUrl;

        const deleteIcon = document.createElement("img");
        deleteIcon.src = 'assets/icons/trash-can-solid.png';

        const deleteIconBackground = document.createElement("span");

        sectionTravaux.appendChild(travauxContainer);

        travauxContainer.appendChild(imageTravaux);
        travauxContainer.appendChild(deleteIconBackground);
        deleteIconBackground.appendChild(deleteIcon);

        
    }

}
genererTravauxModal(travaux);

const modalBackground = document.getElementById("modal");
modalBackground.addEventListener('click', function(event) {
    if(event.target === modal) {
        modal.style.visibility = 'hidden';
        modal.style.opacity = 0;
        window.location.hash = '';
    }
});

document.querySelectorAll('.btn-open-modal').forEach(function(link) {
    link.addEventListener('click', function(event) {
        const modalId = this.getAttribute('href').substring(1); // Récupère l'ID de la modale
        const modal = document.getElementById(modalId);
        modal.style.visibility = 'visible';
        modal.style.opacity = 1;
    });
});

document.querySelectorAll('.modal-close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.visibility = 'hidden';
        modal.style.opacity = 0;
        window.location.hash = ''; // Efface également le fragment d'URL
    });
});