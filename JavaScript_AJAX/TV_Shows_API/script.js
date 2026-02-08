const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");
const detailsDiv = document.getElementById("details");

// TODO : écouter l’événement input
let encodeQuery = "";

searchInput.addEventListener('keyup', () => {
    let inputValue = searchInput.value;
    encodeQuery = encodeURIComponent(inputValue);
    apiQuery();
})
// TODO : faire la requête AJAX vers TVMaze

let data = []

async function apiQuery() {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeQuery}`);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        } else {
            data = await response.json();
            filterShows();
        }
    } catch(error) {
        console.log('Erreur : ', error);
    }

}

// TODO : afficher la liste des séries

let showPoster = "";

function filterShows() {
    resultsList.innerHTML = "";
    data.forEach(result => {
        if (result.show.image) {
            showPoster = result.show.image.medium;
        } else {
            showPoster = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        }

        resultsList.innerHTML += (`<li class="shows"><img width="200" src="${showPoster}" alt="${result.show.name} poster"><p class="showTitle">${result.show.name}</p> `)
    });
    showsList();
}
    
// TODO : gérer le clic sur une série

function showsList() {

    let showsArray = document.querySelectorAll('.shows');
    
    // TODO : gérer la classe CSS active
    
    showsArray.forEach(listedShow => {
        listedShow.addEventListener('click', () => {
            showsArray.forEach(show => show.classList.remove('active'));
            listedShow.classList.add('active');

            // TODO : afficher les détails
        
                let activeShowTitle = listedShow.querySelector('.showTitle').textContent;
                let activeShow = data.find(foundShow => foundShow.show.name === activeShowTitle);
        
                if (activeShow) {
                    if (activeShow.show.image) {
                        showPoster = activeShow.show.image.original;
                    } else {
                        showPoster = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                    }
    
                    let genreStr = activeShow.show.genres.join(' · ');
        
                    detailsDiv.innerHTML = (`<section id="details"><h2>${activeShow.show.name}</h2><img width="400" src="${showPoster}" alt="${activeShow.show.name} poster"><p><em>${genreStr}</em></p><p>${activeShow.show.summary}</p><p>Première diffusion : ${activeShow.show.premiered}</p></section>`);

                    detailsDiv.scrollIntoView({behavior: "smooth", block: "end"});
                }
        });
    })
}