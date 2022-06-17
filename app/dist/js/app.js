"use strict";
// sets error message for the Pokemon amount input
function setError(input, message) {
    const errorMsg = document.querySelector("#error-message");
    errorMsg.innerHTML = message;
    input.style.border = "2px solid red";
}
// validates the value in the input and fetchs Pokemon if everything is OK
function sendFetchAmount() {
    const input = document.querySelector("#pokemonAmount");
    const displayTitle = document.querySelector("#amountDisplay");
    let valid = true;
    let inputArray = input.value.split("");
    let regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    // empty input validation
    if (!input.value) {
        valid = false;
        setError(input, "Please input a valid number!");
        return;
    }
    // special characters validation
    if (regex.test(input.value)) {
        valid = false;
        setError(input, "Please input numbers only!");
        return;
    }
    // max and min values validation
    if (parseInt(input.value) > 898) {
        valid = false;
        setError(input, "The maximum amount of Pokemon is 898!");
    }
    else if (parseInt(input.value) <= 0) {
        valid = false;
        setError(input, "The minimum amount of Pokemon is 1!");
        return;
    }
    // for numbers bigger than 999, this removes every digit until only 3 are left,
    // not forcing the user to type everything again in case of a typo
    if (inputArray.length > 3) {
        do {
            inputArray.pop();
        } while (inputArray.length > 3);
        input.value = inputArray.join("");
    }
    // if everything is OK, errors are removed and the Pokemon are fetched
    if (valid) {
        fetchPokemon(parseInt(input.value));
        input.style.border = "none";
        document.querySelector("#error-message").innerHTML = "";
        displayTitle.innerHTML = `Displaying 1 - ${input.value}`;
    }
}
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
        image: data.sprites["front_default"],
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
