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
    results.length > 1 ? displayAllPokemon(allPokemon) : saveDetailsPokemon(allPokemon);
}
// effectively displays data on the page, inserting it into the ordenated list
function displayAllPokemon(allPokemon) {
    const pokedexList = document.getElementById("pokedex");
    const pokemonHTMLString = allPokemon
        .map(pokemon => ` 
                    <li class="card" onclick="fetchSinglePokemon(this)">
                        <img class="card-image" src="${pokemon.image}"/> 
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2> 
                        <p class="card-subtitle">Type: ${pokemon.type}</p> 
                    </li>
                `).join("");
    pokedexList.innerHTML = pokemonHTMLString;
}
// fetch single pokemon data for exhibition in the details screen
function fetchSinglePokemon(card) {
    let cardTitle = card.querySelector(".card-title");
    let id = cardTitle.textContent.toString().split(".")[0];
    const promise = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`;
    promise.push(fetch(url).then(res => res.json()));
    Promise.all(promise).then(result => {
        convertPokemonData(result);
    });
}
// saves all pokemon info to local storage, enabling it to be shown in the Pokemon Details page
function saveDetailsPokemon(allPokemon) {
    allPokemon.map(pokemon => {
        localStorage.setItem("pokeImage", pokemon.image);
        localStorage.setItem("pokeId", pokemon.id);
        localStorage.setItem("pokeName", pokemon.name);
        localStorage.setItem("pokeType", pokemon.type);
    });
    window.location.href = "pokemonDetails.html";
}
