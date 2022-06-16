function fetchPokemon() {
    const promises = [];
    for(let i = 1; i<= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }
    Promise.all(promises).then(results => {
        convertPokemonData(results);
    });
}

fetchPokemon();

function convertPokemonData(results: any[]) {
    const allPokemon = results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map((type: { type: { name: any; }; }) => type.type.name).join(", "),
    }));
    displayPokemon(allPokemon);
}

function displayPokemon(allPokemon: any[]) {
    const pokedexList = document.getElementById("pokedex")!;
    const pokemonHTMLString = allPokemon
        .map(
            pokemon =>
                ` 
                    <li class="card">
                        <img class="card-image" src="${pokemon.image}"/> 
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2> 
                        <p class="card-subtitle">Type: ${pokemon.type}</p> 
                    </li>
                `
        ).join("");

    pokedexList.innerHTML = pokemonHTMLString;
}