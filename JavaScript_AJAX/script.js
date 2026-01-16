let charLoad = document.getElementById('loadCharacters');
let charList = document.getElementById('characters');

charLoad.addEventListener('click', () => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        charData = data.results;
        charData.forEach(char => {      
            charList.innerHTML += ('<div class="card">' + '<h3>' + char.name +'</h3>' + '<img src=' + char.image +'>');
        });
    })
    .catch(error => {
        console.log(`Erreur ${error}`);
     })
});

let focusChar = document.getElementById('card');

