const pokemonsList= document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
const maxPoke = 151;
const limit = 5;
let offset = 0;



function loadPokemonItens(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemons =[]) => { 
        const newHtml  = pokemons.map((pokemon) =>  ` 
            <li class="pokemon ${pokemon.type}">
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
    })
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
   