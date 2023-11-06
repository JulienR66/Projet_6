const reponse = await fetch("http://localhost:5678/api/works");
const travaux = await reponse.json();

function genererTravaux () {
    for (let i = 0; i < travaux.length; i++) {

        const article = travaux[i];
        const sectionTravaux = document.querySelector(".gallery");

        const travauxContenant = document.createElement("figure");

        const imageTravaux = document.createElement("img");
        imageTravaux.src = article.imageUrl;

        const titreTravaux = document.createElement("figcaption");
        titreTravaux.innerText = article.title

        sectionTravaux.appendChild(travauxContenant);

        travauxContenant.appendChild(imageTravaux);
        travauxContenant.appendChild(titreTravaux);

    }
}
genererTravaux()

console.log(travaux)