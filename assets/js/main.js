const pokemonsList= document.getElementById('pokemonsList')
const statusPokemon = document.getElementById('statusPokemon')
const loadMoreButton = document.getElementById('loadMore')
const maxPoke = 151;
const limit = 5;
let offset = 0;
const init = 1;



function loadPokemonItens(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemons =[]) => { 
        const newHtml  = pokemons.map((pokemon) =>  ` 

              <li class="pokemon ${pokemon.type}">
                <div class="stats">
                    <img src="./download.png" alt="Lupa">
                    <button type="button" class="getStatusButton" data-number="${pokemon.number}"></button>
                </div>
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

   pokemonsList.innerHTML += newHtml
   
   document.querySelectorAll('.getStatusButton').forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        getStatusFromPokemon(number);
    });
});
});
}
loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click',() => {
    offset += limit;

    const qtdPoke = offset + limit

    if( qtdPoke >= maxPoke){
        const newLimit = maxPoke - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else{
    loadPokemonItens(offset,limit);
    }
}) 

const getStatusButton = document.getElementById('getStatus')


function getStatusFromPokemon(number) {
    pokeapi.getStatus(number).then((pokemon= []) => {
        const newHtml = `
            <div class ="pokemon poke ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class = "data" >
                <p class="height">Height ${pokemon.height}</p>
                <p class="weight">Weight ${pokemon.weight}</p>
                <p class="hp">HP ${pokemon.hp}</p>
                <p class="attack">Attack ${pokemon.attack}</p>
                <p class="defense">Defense ${pokemon.defense}</p>
                <ol class="abilities">
                Abilities: ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                </ol>
            </div>
        `

        statusPokemon.innerHTML = newHtml
    })
}
getStatusFromPokemon(init)


   