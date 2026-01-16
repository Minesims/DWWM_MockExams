let charLoad = document.getElementById('loadCharacters');
let charList = document.getElementById('characters');

charLoad.addEventListener('click', () => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        data.forEach(char => {
            charList.innerHTML += char;
        });
    })
    .catch(error => {
        console.log(`Erreur ${error}`);
    })
})