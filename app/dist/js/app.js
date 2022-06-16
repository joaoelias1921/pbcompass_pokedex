"use strict";
function sendFetchAmount() {
    const input = document.querySelector("#pokemonAmount");
    const errorMsg = document.querySelector("#error-message");
    const displayTitle = document.querySelector("#amountDisplay");
    let valid = true;
    let inputArray = input.value.split("");
    let regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    if (!input.value) {
        valid = false;
        errorMsg.innerHTML = "Please input a valid number!";
        input.style.border = "2px solid red";
        return;
    }
    if (regex.test(input.value)) {
        valid = false;
        errorMsg.innerHTML = "Please input numbers only!";
        input.style.border = "2px solid red";
        return;
    }
    if (parseInt(input.value) > 898) {
        valid = false;
        errorMsg.innerHTML = "The maximum amount of Pokemon is 898!";
        input.style.border = "2px solid red";
    }
    else if (parseInt(input.value) <= 0) {
        valid = false;
        errorMsg.innerHTML = "The minimum amount of Pokemon is 1!";
        input.style.border = "2px solid red";
        return;
    }
    if (inputArray.length > 3) {
        do {
            inputArray.pop();
        } while (inputArray.length > 3);
        input.value = inputArray.join("");
    }
    if (valid) {
        fetchPokemon(parseInt(input.value));
        input.style.border = "none";
        errorMsg.innerHTML = "";
        displayTitle.innerHTML = `Displaying 1 - ${input.value}`;
    }
}
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
fetchPokemon(150);
function convertPokemonData(results) {
    const allPokemon = results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(allPokemon);
}
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
