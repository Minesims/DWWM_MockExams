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

    let focusChar = document.querySelectorAll('.card');
    
    focusChar.forEach(card => {
            card.addEventListener('click', () => {
                for (let i = 0; i < focusChar.length; i++) {
                    if (focusChar.card[i] == charData[i].id) {
                        let position = charData[i].id;
                        console.log("click" + position);
                    }
                }
            })
    });
});

