let charLoad = document.getElementById('loadCharacters');
let charList = document.getElementById('characters');
let charData = '';

fetch('https://rickandmortyapi.com/api/character')
.then(response => response.json())
.then(data => {
    charData = data.results;
    return charData;
})
.catch(error => {
    return error;
})

charLoad.addEventListener('click', () => {
    charData.forEach(char => {      
            charList.innerHTML += (`<div class="card" id="${char.id}"><h3>${char.name}</h3><img src=${char.image}>`);
        });

    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(card => card.classList.remove('active'));
                card.classList.add('active');
                
                let focusChar = document.getElementById('selectedCharacter');
                let charDetails = document.getElementById('details');
                
                charData.forEach(char => {
                    if (char.id == card.id) {
                        focusChar.innerHTML = (`<div class="details"><img src=${char.image}><h4>${char.name}</h4></div>`);

                        charDetails.innerHTML = (`<div><p>Espèce : ${char.species}</p><p>Sexe : ${char.gender}</p><p>Statut : ${char.status}</p></div>`)
                    }
                })
            });
    });
});

