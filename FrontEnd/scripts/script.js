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

        
        deleteIcon.addEventListener('click', function() {
            supprimerProjet(article.id);
        });
    }

}
genererTravauxModal(travaux);


// Fonction pour supprimer le projet
async function supprimerProjet(projetId) {
    const token = localStorage.getItem('token');

    const url = `http://localhost:5678/api/works/${projetId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '*/*',
            },
        });

        if (response.status === 200) {
            // Le projet a été supprimé avec succès
            console.log('Projet supprimé avec succès.');
            // Actualiser la liste des travaux après la suppression
            const reponse = await fetch("http://localhost:5678/api/works");
            const travaux = await reponse.json();
            genererTravauxModal(travaux);
        } else if (response.status === 401) {
            // Erreur d'autorisation, le token peut être invalide
            console.error('Erreur d\'autorisation. Vérifiez votre token.');
        } else {
            console.error(`Une erreur s'est produite lors de la suppression du projet. Code d'erreur : ${response.status}`);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

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

const modalTitle = document.getElementById("modalTitle");
const btnModal = document.getElementById("btnModal");
const valideBtn = document.getElementById("valideBtn");
const btnReturn = document.querySelector(".modal-return");
const modalWorks = document.querySelector(".work-preview");
const modalSecondContent = document.querySelector(".modal2");

btnModal.addEventListener("click", function() {
    modalWorks.style.visibility = 'hidden';
    modalWorks.style.display = 'none';
    modalSecondContent.style.visibility = 'visible';
    modalSecondContent.style.display = 'block';
    btnReturn.style.visibility = 'visible';
    btnModal.style.visibility = 'hidden';
    valideBtn.style.visibility = 'visible';
    valideBtn.style.display = 'block';
    modalTitle.innerText = 'Ajout photo';
});

btnReturn.addEventListener("click", function(){
    modalTitle.innerText = 'Galerie photo';
    valideBtn.style.visibility = 'hidden';
    valideBtn.style.display = 'none';
    btnModal.style.visibility = 'visible';
    modalWorks.style.visibility = 'visible';
    modalWorks.style.display = 'grid';
    modalSecondContent.style.visibility = 'hidden';
    modalSecondContent.style.display = 'none';
    btnReturn.style.visibility = 'hidden';
});

function generCategories (){
    const categorySelect = document.getElementById('categories');

    fetch('http://localhost:5678/api/categories')
       .then(response => response.json())
       .then(categories => {
          categories.forEach(category => {
             let option = document.createElement('option');
             option.value = category.id;
             option.textContent = category.name;
             categorySelect.appendChild(option);
          });
       })
       .catch(error => {
          console.error('Erreur lors de la récupération des catégories :', error);
       });
}
generCategories();

function previewImage(input) {
    const preview = document.getElementById('previewImage');
    const file = input.files[0];
    console.log(file);

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}


document.getElementById('file').addEventListener('change', function () {
    previewImage(this);
    convertImageToBase64(this);
    document.getElementById('previewImage').classList.add('preview-img');
    document.getElementById('previewImage').classList.remove('file-container-img');
});


async function createProject(title, image, category) {
    const url = 'http://localhost:5678/api/works';

    try {
        const token = localStorage.getItem('token');
        

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('category', category);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 201) {
            // Projet créé avec succès
            console.log('Projet ajouté avec succès.');
            // Actualiser la liste des travaux ou effectuer toute autre action nécessaire
        } else if (response.status === 401) {
            // Erreur d'autorisation
            alert('Erreur d\'autorisation. Vérifiez votre token.');
            console.error('Erreur d\'autorisation. Vérifiez votre token.');
        } else {
            alert(`Une erreur s'est produite lors de l'ajout du projet. Code d'erreur : ${response.status}`);
            console.error(`Une erreur s'est produite lors de l'ajout du projet. Code d'erreur : ${response.status}`);
        }
    } catch (error) {
        alert('Une erreur s\'est produite :', error);
        console.error('Une erreur s\'est produite :', error);
    }
}

document.getElementById('valideBtn').addEventListener('click', async function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const image = document.getElementById("file").files[0];
    const categories = document.getElementById("categories").value;

    if (title && image && categories) {
        await createProject(title, image, categories);
    }
})

function updateButtonState() {
    const valideBtn = document.getElementById("valideBtn");
    const title = document.getElementById("title").value;
    const image = document.getElementById("file").files[0];
    const categories = document.getElementById("categories").value;
    const isAllFieldsFilled = title && image && categories;

    if (isAllFieldsFilled) {
        valideBtn.classList.remove('disabled');
        valideBtn.classList.add('enabled');
    } else {
        valideBtn.classList.remove('enabled');
        valideBtn.classList.add('disabled');
    }
}

// Mettez à jour l'état du bouton lors de tout changement dans les champs du formulaire
document.getElementById('title').addEventListener('input', updateButtonState);
document.getElementById('file').addEventListener('input', updateButtonState);
document.getElementById('categories').addEventListener('input', updateButtonState);