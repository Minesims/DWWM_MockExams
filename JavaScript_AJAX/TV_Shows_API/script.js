const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");
const detailsDiv = document.getElementById("details");

// TODO : écouter l’événement input

let encodeQuery = "";

searchInput.addEventListener('keyup', () => {
    let inputValue = searchInput.value;
    encodeQuery = encodeURIComponent(inputValue); // J'encode la valeur à chaque saisie pour éviter tout problème de lecture 
    apiQuery(); // J'appelle ma fonction AJAX
})

// TODO : faire la requête AJAX vers TVMaze

let data = [] // Je créé un array vide qui récupérera les données du fichier JSON

async function apiQuery() {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeQuery}`);
        if (!response.ok) { // Je vérifie que le fetch renvoie correctement ce qui est demandé
            throw new Error(`${response.status} ${response.statusText}`);
        } else {
            data = await response.json();
            filterShows(); // J'appelle ma fonction de filtrage du fichier JSON
        }
    } catch(error) {
        console.log('Erreur : ', error);
    }

}

// TODO : afficher la liste des séries

let showPoster = ""; // Je définie une variable qui contiendra l'image à afficher

function filterShows() {
    resultsList.innerHTML = "";
    data.forEach(result => {
        if (result.show.image) { // J'initie une boucle pour vérifier si une image réduite est disponible pour la série actuelle
            showPoster = result.show.image.medium;
        } else { // Je définie une image générique (récupéré sur le même site que l'API) en cas de valeur null
            showPoster = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        }

        resultsList.innerHTML += (`<li class="shows"><img width="200" src="${showPoster}" alt="${result.show.name} poster"><p class="showTitle">${result.show.name}</p> `) // Je modifie le DOM pour créer une liste des séries correspondantes
    });
    showsList(); // J'appelle ma fonction de sélection de série
}
    
// TODO : gérer le clic sur une série

function showsList() {

    let showsArray = document.querySelectorAll('.shows');
    
    // TODO : gérer la classe CSS active
    
    showsArray.forEach(listedShow => {
        listedShow.addEventListener('click', () => {
            showsArray.forEach(show => show.classList.remove('active')); // Je reset la classe active à toutes les puces de la liste
            listedShow.classList.add('active'); // J'active la classe active à seulement la puce de la liste qui enregistre le clic

            // TODO : afficher les détails
        
                let activeShowTitle = listedShow.querySelector('.showTitle').textContent; // Je recherche le titre de ma puce actuellement sélectionnée
                let activeShow = data.find(foundShow => foundShow.show.name === activeShowTitle); // Je définie une variable qui récupère la data recherchée selon le titre de ma puce selectionnée
        
                if (activeShow) { 
                    if (activeShow.show.image) { // J'initie une nouvelle boucle pour vérifier si une image entière est disponible pour la série actuelle
                        showPoster = activeShow.show.image.original;
                    } else { // Je redéfinie une image générique (récupéré sur le même site que l'API) en cas de valeur null
                        showPoster = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                    }
    
                    let genreStr = activeShow.show.genres.join(' · '); // Je transforme mon array en string
        
                    detailsDiv.innerHTML = (`<section id="details"><h2>${activeShow.show.name}</h2><img width="400" src="${showPoster}" alt="${activeShow.show.name} poster"><p><em>${genreStr}</em></p><p>${activeShow.show.summary}</p><p>Première diffusion : ${activeShow.show.premiered}</p></section>`);

                    detailsDiv.scrollIntoView({behavior: "smooth", block: "end"}); // Je demande à ma page de défiler de manière lisse jusqu'à la section modifiée
                }
        });
    })
}