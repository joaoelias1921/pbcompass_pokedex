"use strict";
// fetch the data from PokeAPI
function fetchPokemon(pokemonAmount) {
    const promises = [];
    for (let i = 1; i <= pokemonAmount; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }
    Promise.all(promises).then(results => {
        convertPokemonData(results);
    });
}
// default amount of Pokemon displayed whenever the window is reloaded
fetchPokemon(150);
// maps the data and converts it into objects that can be shown by JS
function convertPokemonData(results) {
    const allPokemon = results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites.other.home["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(allPokemon);
}
// effectively displays data on the page, inserting it into the ordenated list
function displayPokemon(allPokemon) {
    const pokedexList = document.getElementById("pokedex");
    const pokemonHTMLString = allPokemon
        .map(pokemon => ` 
                    <li class="card">
                        <img class="card-image" src="${pokemon.image}"/> 
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2> 
                        <p class="card-subtitle">Type: ${pokemon.type}</p> 
                    </li>
                `).join("");
    pokedexList.innerHTML = pokemonHTMLString;
}
