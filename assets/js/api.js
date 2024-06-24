const pokeapi = {}

function ConvertDetailToPokeClass(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types
    
    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

   return pokemon;
}

pokeapi.getDetail = (pokemon)=>{
   return fetch(pokemon.url).then((response) => response.json())
   .then(ConvertDetailToPokeClass);
}

pokeapi.getPokemons =  (offset, limit) =>{  
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;


    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeapi.getDetail))
    .then((detailRE)=> Promise.all(detailRE))
    .then((detailRE)=> (detailRE))
    .catch((error) =>console.error(error))
}