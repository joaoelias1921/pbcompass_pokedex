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
// gets search bar from the page
const searchBar = document.querySelector("#search-bar");
// filters pokemons according to the input
searchBar.addEventListener("input", function () {
    var pokemons = document.querySelectorAll(".card");
    if (searchBar.value.length > 0) {
        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];
            var tituloCard = pokemon.querySelector(".card-title");
            var nome = tituloCard.textContent;
            let expressao = new RegExp(this.value, "i");
            if (!expressao.test(nome)) {
                pokemon.classList.add("invisible");
            }
            else {
                pokemon.classList.remove("invisible");
            }
        }
    }
    else {
        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];
            pokemon.classList.remove("invisible");
        }
    }
});
